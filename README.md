# SW Devel Challenge - Robot Agent

This server software developed in node.js using websocket library main purpose is 
control a cleaning Robot doing basically these functions:
- Read map file containing a plant floor map in format defined below.
- Process the inputted map file and create a cleanable spaces matrix
- Run the cleaning process moving the Robot on the cleanable path.
- Communicate with Central Panel Server sending current status in near real time.

### DEPLOY INSTRUCTIONS

- OS requirements: Linux Ubuntu 14.X (or equivalent)
- Machine requirements: 10 Gb Disk Space, 1GB RAM
- SW requirements: npm 6.4.1 and node.js 10.12.0
- Extract avidRobot.tar.gz on /usr/local
- Create a user robotsw on OS
- chown -R robotsw.robotsw /usr/local/avidRobot

### RUN INSTRUCTIONS  

- Login as robotsw user
```
cd /usr/local/avidRobot
export SERVER_URL=ws://localhost:8080
export ROBOT_SERIAL_NUMBER=ROBOT001
node robot.js map1.txt
```

OBS.1: The initial cleaning start point is choosed by the algorithm as the first
cleanable space when walking on map from the leftest corner (0,0) and moving
RIGHT until find a cleanable space, if not found on that line go to next line, 
repeating this process until found a cleanable space to begin.

OBS.2: If cleaning process is called again by web START command then the start 
point will be the last cleanable space that Robot visited.

OBS.3: When process is started by the command line the Robot will read the map, 
build the grid matrix and start cleaning procedure. After finished the Robot 
remains on READY state, and cleaning process may be started again by web START 
command.

OBS.4: map1.txt is the floor plant map formatted as follows:
As an example, here is map of a grocery store (map1.txt)

```
####################
#             ## # #
# # ## #####   # # #
# # ## #####  ## # #
# #            #   #
# # ########  #### #
# #              # #
# # ########  ## # #
#                # #
# # ########  ## # #
# #              # #
# # ########  ## # #
#                  #
####################
```

    “ “ - empty spaces where robot can drive through
    “#” - walls
    “\n” - a new line of the map

SERVER_URL - Inform the Central Panel Server URL. If running on same machine for testing purposes
you can use the default setup of ws://localhost:8080

ROBOT_SERIAL_NUMBER - This is the unique serial number identification of the Robot. The system 
use it to send Robot data to Central Server

The program send output to stdout

### Typical debug program output example (Central Server offline)

```
Wagner-MacBook-Pro:avidRobot wagnerra$ node robot.js map1.txt
Processing ####################
Processing #             ## # #
Processing # # ## #####   # # #
Processing # # ## #####  ## # #
Processing # #            #   #
Processing # # ########  #### #
Processing # #              # #
Processing # # ########  ## # #
Processing #                # #
Processing # # ########  ## # #
Processing # #              # #
Processing # # ########  ## # #
Processing #                  #
Processing ####################
Total spaces to clean: 136
Grid Map lines: 14
Grid Map cols: 20
Starting clean process
Starting path calc. Total spaces to clean: 136
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=1 - space=1,1 - stack size: 2
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=2 - space=2,1 - stack size: 3
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=3 - space=3,1 - stack size: 4
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=4 - space=4,1 - stack size: 5
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=5 - space=5,1 - stack size: 6
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=6 - space=6,1 - stack size: 7
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=7 - space=7,1 - stack size: 8
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=8 - space=8,1 - stack size: 10
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=9 - space=9,1 - stack size: 11
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=10 - space=10,1 - stack size: 12
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=11 - space=11,1 - stack size: 13
UP move is to a cleanable space
RIGHT move is to a cleanable space
calc debug. spaces visited=12 - space=12,1 - stack size: 14
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=13 - space=12,2 - stack size: 15
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=14 - space=12,3 - stack size: 17
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=15 - space=12,4 - stack size: 18
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=16 - space=12,5 - stack size: 19
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=17 - space=12,6 - stack size: 20
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=18 - space=12,7 - stack size: 21
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=19 - space=12,8 - stack size: 22
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=20 - space=12,9 - stack size: 23
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=21 - space=12,10 - stack size: 24
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=22 - space=12,11 - stack size: 25
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=23 - space=12,12 - stack size: 27
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=24 - space=12,13 - stack size: 29
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=25 - space=12,14 - stack size: 30
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=26 - space=12,15 - stack size: 31
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=27 - space=12,16 - stack size: 33
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=28 - space=12,17 - stack size: 34
UP move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=29 - space=12,18 - stack size: 35
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=30 - space=11,18 - stack size: 36
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=31 - space=10,18 - stack size: 37
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=32 - space=9,18 - stack size: 38
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=33 - space=8,18 - stack size: 39
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=34 - space=7,18 - stack size: 40
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=35 - space=6,18 - stack size: 41
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=36 - space=5,18 - stack size: 42
UP move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=37 - space=4,18 - stack size: 44
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=38 - space=4,17 - stack size: 45
UP move is to a cleanable space
RIGHT move is to a cleanable space
calc debug. spaces visited=39 - space=4,16 - stack size: 46
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=40 - space=3,16 - stack size: 47
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=41 - space=2,16 - stack size: 48
DOWN move is to a cleanable space
calc debug. spaces visited=42 - space=1,16 - stack size: 48
calc debug. spaces visited=42 - space=2,16 - stack size: 47
calc debug. spaces visited=42 - space=3,16 - stack size: 46
calc debug. spaces visited=42 - space=4,16 - stack size: 45
calc debug. spaces visited=42 - space=4,17 - stack size: 44
calc debug. spaces visited=42 - space=4,18 - stack size: 43
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=43 - space=3,18 - stack size: 44
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=44 - space=2,18 - stack size: 45
DOWN move is to a cleanable space
calc debug. spaces visited=45 - space=1,18 - stack size: 45
calc debug. spaces visited=45 - space=2,18 - stack size: 44
calc debug. spaces visited=45 - space=3,18 - stack size: 43
calc debug. spaces visited=45 - space=4,18 - stack size: 42
calc debug. spaces visited=45 - space=5,18 - stack size: 41
calc debug. spaces visited=45 - space=6,18 - stack size: 40
calc debug. spaces visited=45 - space=7,18 - stack size: 39
calc debug. spaces visited=45 - space=8,18 - stack size: 38
calc debug. spaces visited=45 - space=9,18 - stack size: 37
calc debug. spaces visited=45 - space=10,18 - stack size: 36
calc debug. spaces visited=45 - space=11,18 - stack size: 35
calc debug. spaces visited=45 - space=12,18 - stack size: 34
calc debug. spaces visited=45 - space=12,17 - stack size: 33
calc debug. spaces visited=45 - space=12,16 - stack size: 32
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=46 - space=11,16 - stack size: 33
UP move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=47 - space=10,16 - stack size: 35
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=48 - space=10,15 - stack size: 36
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=49 - space=10,14 - stack size: 37
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=50 - space=10,13 - stack size: 40
UP move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=51 - space=11,13 - stack size: 42
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=52 - space=11,12 - stack size: 44
calc debug. spaces visited=52 - space=11,13 - stack size: 43
calc debug. spaces visited=52 - space=12,12 - stack size: 42
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=53 - space=10,12 - stack size: 45
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=54 - space=10,11 - stack size: 46
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=55 - space=10,10 - stack size: 47
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=56 - space=10,9 - stack size: 48
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=57 - space=10,8 - stack size: 49
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=58 - space=10,7 - stack size: 50
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=59 - space=10,6 - stack size: 51
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=60 - space=10,5 - stack size: 52
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=61 - space=10,4 - stack size: 53
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=62 - space=10,3 - stack size: 55
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=63 - space=11,3 - stack size: 56
calc debug. spaces visited=63 - space=10,3 - stack size: 55
calc debug. spaces visited=63 - space=10,4 - stack size: 54
calc debug. spaces visited=63 - space=12,3 - stack size: 53
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=64 - space=9,3 - stack size: 54
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=65 - space=8,3 - stack size: 57
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=66 - space=8,2 - stack size: 58
calc debug. spaces visited=66 - space=8,3 - stack size: 57
calc debug. spaces visited=66 - space=9,3 - stack size: 56
calc debug. spaces visited=66 - space=8,1 - stack size: 55
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=67 - space=8,4 - stack size: 56
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=68 - space=8,5 - stack size: 57
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=69 - space=8,6 - stack size: 58
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=70 - space=8,7 - stack size: 59
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=71 - space=8,8 - stack size: 60
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=72 - space=8,9 - stack size: 61
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=73 - space=8,10 - stack size: 62
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=74 - space=8,11 - stack size: 63
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=75 - space=8,12 - stack size: 66
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=76 - space=9,12 - stack size: 68
UP move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=77 - space=9,13 - stack size: 70
calc debug. spaces visited=77 - space=9,12 - stack size: 69
calc debug. spaces visited=77 - space=10,13 - stack size: 68
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=78 - space=8,13 - stack size: 71
calc debug. spaces visited=78 - space=8,12 - stack size: 70
calc debug. spaces visited=78 - space=9,13 - stack size: 69
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=79 - space=8,14 - stack size: 70
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=80 - space=8,15 - stack size: 71
UP move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=81 - space=8,16 - stack size: 73
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=82 - space=9,16 - stack size: 74
calc debug. spaces visited=82 - space=8,16 - stack size: 73
calc debug. spaces visited=82 - space=8,15 - stack size: 72
calc debug. spaces visited=82 - space=10,16 - stack size: 71
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=83 - space=7,16 - stack size: 72
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=84 - space=6,16 - stack size: 73
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=85 - space=6,15 - stack size: 74
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=86 - space=6,14 - stack size: 75
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=87 - space=6,13 - stack size: 78
UP move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=88 - space=7,13 - stack size: 80
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=89 - space=7,12 - stack size: 82
calc debug. spaces visited=89 - space=7,13 - stack size: 81
calc debug. spaces visited=89 - space=8,12 - stack size: 80
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=90 - space=6,12 - stack size: 83
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=91 - space=6,11 - stack size: 84
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=92 - space=6,10 - stack size: 85
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=93 - space=6,9 - stack size: 86
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=94 - space=6,8 - stack size: 87
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=95 - space=6,7 - stack size: 88
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=96 - space=6,6 - stack size: 89
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=97 - space=6,5 - stack size: 90
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=98 - space=6,4 - stack size: 91
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=99 - space=6,3 - stack size: 93
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=100 - space=7,3 - stack size: 94
calc debug. spaces visited=100 - space=6,3 - stack size: 93
calc debug. spaces visited=100 - space=6,4 - stack size: 92
calc debug. spaces visited=100 - space=8,3 - stack size: 91
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=101 - space=5,3 - stack size: 92
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=102 - space=4,3 - stack size: 94
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=103 - space=4,4 - stack size: 95
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=104 - space=4,5 - stack size: 96
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=105 - space=4,6 - stack size: 98
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=106 - space=4,7 - stack size: 99
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=107 - space=4,8 - stack size: 100
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=108 - space=4,9 - stack size: 101
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=109 - space=4,10 - stack size: 102
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=110 - space=4,11 - stack size: 103
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=111 - space=4,12 - stack size: 106
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=112 - space=5,12 - stack size: 108
UP move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=113 - space=5,13 - stack size: 110
calc debug. spaces visited=113 - space=5,12 - stack size: 109
calc debug. spaces visited=113 - space=6,13 - stack size: 108
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=114 - space=4,13 - stack size: 111
calc debug. spaces visited=114 - space=4,12 - stack size: 110
calc debug. spaces visited=114 - space=5,13 - stack size: 109
LEFT move is to a cleanable space
calc debug. spaces visited=115 - space=4,14 - stack size: 109
calc debug. spaces visited=115 - space=4,13 - stack size: 108
UP move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=116 - space=3,13 - stack size: 110
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=117 - space=3,12 - stack size: 112
calc debug. spaces visited=117 - space=3,13 - stack size: 111
calc debug. spaces visited=117 - space=4,12 - stack size: 110
UP move is to a cleanable space
RIGHT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=118 - space=2,12 - stack size: 112
UP move is to a cleanable space
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=119 - space=2,13 - stack size: 115
calc debug. spaces visited=119 - space=2,12 - stack size: 114
calc debug. spaces visited=119 - space=3,13 - stack size: 113
LEFT move is to a cleanable space
calc debug. spaces visited=120 - space=2,14 - stack size: 113
calc debug. spaces visited=120 - space=2,13 - stack size: 112
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=121 - space=1,13 - stack size: 113
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=122 - space=1,12 - stack size: 115
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=123 - space=1,11 - stack size: 116
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=124 - space=1,10 - stack size: 117
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=125 - space=1,9 - stack size: 118
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=126 - space=1,8 - stack size: 119
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=127 - space=1,7 - stack size: 120
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=128 - space=1,6 - stack size: 122
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=129 - space=2,6 - stack size: 123
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=130 - space=3,6 - stack size: 124
calc debug. spaces visited=130 - space=2,6 - stack size: 123
calc debug. spaces visited=130 - space=1,6 - stack size: 122
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=131 - space=1,5 - stack size: 123
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=132 - space=1,4 - stack size: 124
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=133 - space=1,3 - stack size: 126
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=134 - space=2,3 - stack size: 127
UP move is to a cleanable space
DOWN move is to a cleanable space
calc debug. spaces visited=135 - space=3,3 - stack size: 128
calc debug. spaces visited=135 - space=2,3 - stack size: 127
calc debug. spaces visited=135 - space=1,3 - stack size: 126
RIGHT move is to a cleanable space
LEFT move is to a cleanable space
calc debug. spaces visited=136 - space=1,2 - stack size: 127
Finished path calc. Total path steps: 188
Cleaned space 1,1
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Cleaned space 2,1
Cleaned space 3,1
Cleaned space 4,1
Cleaned space 5,1
Cleaned space 6,1
Cleaned space 7,1
Cleaned space 8,1
Cleaned space 9,1
Cleaned space 10,1
Cleaned space 11,1
Cleaned space 12,1
Cleaned space 12,2
Cleaned space 12,3
Cleaned space 12,4
Cleaned space 12,5
Cleaned space 12,6
Cleaned space 12,7
Cleaned space 12,8
Cleaned space 12,9
Cleaned space 12,10
Cleaned space 12,11
Cleaned space 12,12
Cleaned space 12,13
Cleaned space 12,14
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Cleaned space 12,15
Cleaned space 12,16
Cleaned space 12,17
Cleaned space 12,18
Cleaned space 11,18
Cleaned space 10,18
Cleaned space 9,18
Cleaned space 8,18
Cleaned space 7,18
Cleaned space 6,18
Cleaned space 5,18
Cleaned space 4,18
Cleaned space 4,17
Cleaned space 4,16
Cleaned space 3,16
Cleaned space 2,16
Cleaned space 1,16
Cleaned space 2,16
Cleaned space 3,16
Cleaned space 4,16
Cleaned space 4,17
Cleaned space 4,18
Cleaned space 3,18
Cleaned space 2,18
Cleaned space 1,18
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Cleaned space 2,18
Cleaned space 3,18
Cleaned space 4,18
Cleaned space 5,18
Cleaned space 6,18
Cleaned space 7,18
Cleaned space 8,18
Cleaned space 9,18
Cleaned space 10,18
Cleaned space 11,18
Cleaned space 12,18
Cleaned space 12,17
Cleaned space 12,16
Cleaned space 11,16
Cleaned space 10,16
Cleaned space 10,15
Cleaned space 10,14
Cleaned space 10,13
Cleaned space 11,13
Cleaned space 11,12
Cleaned space 11,13
Cleaned space 12,12
Cleaned space 10,12
Cleaned space 10,11
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Cleaned space 10,10
Cleaned space 10,9
Cleaned space 10,8
Cleaned space 10,7
Cleaned space 10,6
Cleaned space 10,5
Cleaned space 10,4
Cleaned space 10,3
Cleaned space 11,3
Cleaned space 10,3
Cleaned space 10,4
Cleaned space 12,3
Cleaned space 9,3
Cleaned space 8,3
Cleaned space 8,2
Cleaned space 8,3
Cleaned space 9,3
Cleaned space 8,1
Cleaned space 8,4
Cleaned space 8,5
Cleaned space 8,6
Cleaned space 8,7
Cleaned space 8,8
Cleaned space 8,9
Cleaned space 8,10
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Cleaned space 8,11
Cleaned space 8,12
Cleaned space 9,12
Cleaned space 9,13
Cleaned space 9,12
Cleaned space 10,13
Cleaned space 8,13
Cleaned space 8,12
Cleaned space 9,13
Cleaned space 8,14
Cleaned space 8,15
Cleaned space 8,16
Cleaned space 9,16
Cleaned space 8,16
Cleaned space 8,15
Cleaned space 10,16
Cleaned space 7,16
Cleaned space 6,16
Cleaned space 6,15
Cleaned space 6,14
Cleaned space 6,13
Cleaned space 7,13
Cleaned space 7,12
Cleaned space 7,13
Cleaned space 8,12
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Cleaned space 6,12
Cleaned space 6,11
Cleaned space 6,10
Cleaned space 6,9
Cleaned space 6,8
Cleaned space 6,7
Cleaned space 6,6
Cleaned space 6,5
Cleaned space 6,4
Cleaned space 6,3
Cleaned space 7,3
Cleaned space 6,3
Cleaned space 6,4
Cleaned space 8,3
Cleaned space 5,3
Cleaned space 4,3
Cleaned space 4,4
Cleaned space 4,5
Cleaned space 4,6
Cleaned space 4,7
Cleaned space 4,8
Cleaned space 4,9
Cleaned space 4,10
Cleaned space 4,11
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Cleaned space 4,12
Cleaned space 5,12
Cleaned space 5,13
Cleaned space 5,12
Cleaned space 6,13
Cleaned space 4,13
Cleaned space 4,12
Cleaned space 5,13
Cleaned space 4,14
Cleaned space 4,13
Cleaned space 3,13
Cleaned space 3,12
Cleaned space 3,13
Cleaned space 4,12
Cleaned space 2,12
Cleaned space 2,13
Cleaned space 2,12
Cleaned space 3,13
Cleaned space 2,14
Cleaned space 2,13
Cleaned space 1,13
Cleaned space 1,12
Cleaned space 1,11
Cleaned space 1,10
Cleaned space 1,9
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Cleaned space 1,8
Cleaned space 1,7
Cleaned space 1,6
Cleaned space 2,6
Cleaned space 3,6
Cleaned space 2,6
Cleaned space 1,6
Cleaned space 1,5
Cleaned space 1,4
Cleaned space 1,3
Cleaned space 2,3
Cleaned space 3,3
Cleaned space 2,3
Cleaned space 1,3
Cleaned space 1,2
Finished cleaning
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
Connect Error: Error: connect ECONNREFUSED 127.0.0.1:8080
```
