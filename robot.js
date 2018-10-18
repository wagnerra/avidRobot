#!/usr/bin/env node
// Robot Agent Main Process
//
// SW Development Challenge
// Author: Wagner Correa Ramos

// Robot state machine diagram:
// READY->STARTED->CLEANING->FINISHED->READY

// TODO: Implement STOPPED state

let WebSocketClient = require('websocket').client;
 
let client = new WebSocketClient();

// Server URL to connect. Example: ws://localhost:8080/
const SERVER_URL = process.env.SERVER_URL;

// Status update frequency
let statusUpdateFreq = 5000;     // 5 seconds when on READY state and 200 ms when cleaning

// Identify the Robot in field. Example: ROBOT001
const ROBOT_SERIAL_NUMBER = process.env.ROBOT_SERIAL_NUMBER;

const fs = require('fs')
const CleanPathFinder = require('./clean-path-finder')
const argv = require('yargs')
  .usage('Usage $0 <input_file>')
  .demand(1)
  .argv

let grid = []           // (X, Y) matrix where 1 means space to clean and 0 means wall.
let cleanPath = []      // Path to be followed by Robot in format {li:1, co:2}
let gridStatus = []     // (X, Y) matrix where 1 means space not cleaned, 2 space already cleaned, 0 for walls
let totalSpacesToClean = 0  // Total number of spaces to be cleaned
let actualPositionLine = -1   // actual robot line
let actualPositionCol = -1    // actual robot col
let status = 'READY'    // Can be READY, CLEANING, REPAIR, CHARGE
let cleaningStep = 0;   // Actual robot step inside clean path
let spacesCleaned = 0   // Count already cleaned spaces
let gridLines = 0       // Number of lines of grid
let gridCols = 0        // Number of cols of grid

// Read clean map with line breaks or \n char sequence to mean line break
function readFile() {
    let filePath = argv._[0]
    let cleanMap = fs.readFileSync(filePath, { encoding: 'utf8' })
    return cleanMap.split('\n');     // Line break or \n text
}  

// Mount a (X,Y) grid where 1 means space to clean and 0 means walls.
function mountGrid(mapLines) {
    let grid = []
    let line = 0

    mapLines.forEach(element => {
    if (element.trim().length > 0) {
        console.log('Processing ' + element);
        if (grid[line] === undefined) grid[line] = [];
        for (let col = 0; col < element.length; col++) {
            if (element.charAt(col) === '#') {
                grid[line][col] = 0     // wall
            }
            else {
                grid[line][col] = 1     // cleanable space
                totalSpacesToClean++
                if (actualPositionCol === -1) {     // Consider Robot initial position the first cleanable space on the map
                    actualPositionLine = line
                    actualPositionCol = col
                    gridCols = element.length
                }
            }
        }
        line++
    }
    });
    gridLines = line;
    console.log('Total spaces to clean: ' + totalSpacesToClean)
    return grid
}

// Try to connect to the central server
function connectServer() {
    client.connect(SERVER_URL, 'echo-protocol', ROBOT_SERIAL_NUMBER)
}

// On connection failure wait 5 seconds and try connect again
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
    setTimeout(connectServer, 5000)     // Wait 5 seconds and try again
});
 
// When connected to central server
client.on('connect', function(connection) {
    console.log('Robot Connected to WebServer');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        setTimeout(connectServer, 5000)     // Wait 5 seconds and try again
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
            if (message.utf8Data === 'START') {
                if (status === 'READY') {    // need to check otherwise can begin new clean procedure while busy
                    startClean();
                }
            }
            else 
            if (message.utf8Data === 'SELECT') {
                sendRobotState()
            }
            else {
                console.log('Unknow received command: ' + message.utf8Data);
            }
        }
    });
    
    // Send actual robot full state to central server
    function sendRobotState() {
        if (connection.connected) {
            let mapData = {
                type: 'robot-state',
                robotSN: ROBOT_SERIAL_NUMBER,
                status: status,
                currentLine: actualPositionLine,
                currentCol: actualPositionCol,
                spacesToClean: totalSpacesToClean,
                lines: gridLines,
                cols: gridCols,
                cleaned: spacesCleaned,
                timestamp: Date.now(),
                gridStatus: gridStatus
            }
            connection.sendUTF(JSON.stringify(mapData))
        }
    }

    // Send actual robot status to central server
    function sendStatus() {
        if (connection.connected) {
            // Send status message to web panel 
            // Message format example:
            // ROBOT001 READY 1,2 0
            if (status === 'STARTED') {
                let mapData = {
                    type: 'robot-data',
                    robotSN: ROBOT_SERIAL_NUMBER,
                    status: status,
                    startLine: actualPositionLine,
                    startCol: actualPositionCol,
                    spacesToClean: totalSpacesToClean,
                    lines: gridLines,
                    cols: gridCols,
                    timestamp: Date.now(),
                    grid: grid
                }
                connection.sendUTF(JSON.stringify(mapData))
                status = 'CLEANING'
                statusUpdateFreq = 200      // Fast updates to show robot path
            }
            else {
                let mapData = {
                    type: 'robot-clean',
                    robotSN: ROBOT_SERIAL_NUMBER,
                    status: status,
                    currentLine: actualPositionLine,
                    currentCol: actualPositionCol,
                    spacesToClean: totalSpacesToClean,
                    lines: gridLines,
                    cols: gridCols,
                    cleaned: spacesCleaned,
                    timestamp: Date.now()
                }
                connection.sendUTF(JSON.stringify(mapData))
                if (status === 'FINISHED') {
                    status = 'READY'
                    statusUpdateFreq = 5000    // 5 seconds
                }
            }
            setTimeout(sendStatus, statusUpdateFreq)
        }
    }
    sendStatus();
});

// Main function, read plant map, start cleaning and start comm to central server
function run() {
    let content = readFile()
    grid = mountGrid(content)

    console.log('Grid Map lines: ' + gridLines)
    console.log('Grid Map cols: ' + gridCols)

    startClean()
    connectServer()
}

// Do a unit space clean and after cleaned go to next space until finished
function unitSpaceClean() {
    if (cleaningStep < cleanPath.length) {
        actualPositionLine = cleanPath[cleaningStep].li;
        actualPositionCol = cleanPath[cleaningStep].co;
        cleaningStep++
        if (gridStatus[actualPositionLine][actualPositionCol] === 1) {
            gridStatus[actualPositionLine][actualPositionCol] = 2
            spacesCleaned++    // Increment spaces cleaned
        }
        console.log('Cleaned space ' + actualPositionLine + ',' + actualPositionCol);
        setTimeout(unitSpaceClean, 200);     // Machine velocity
    }
    else {
        status = 'FINISHED'
        console.log('Finished cleaning');
    }
}

// Start the clean process
function startClean() {
    console.log('Starting clean process');
    status = 'STARTED'
    cleanPath = CleanPathFinder.calculate(totalSpacesToClean, grid, gridLines, gridCols, actualPositionLine, actualPositionCol)
    cleaningStep = 0
    spacesCleaned = 0
    gridStatus = []
    for (let entry of grid) {
        gridStatus.push(entry)
    }
    unitSpaceClean();
}

if (SERVER_URL === undefined) {
    console.error("Undefined SERVER_URL env - You must define SERVER_URL")
    process.exit(1)
}

run()
