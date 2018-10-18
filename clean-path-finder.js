'use strict'
// Robot Agent Clean Path-Finder Algorithm
//
// SW Development Challenge
// Author: Wagner Correa Ramos

let Stack = require('stackjs')
let stack = new Stack()
var visitedSpace = []         // Robot visited grid for path calcularion. 0=not cleaned, 1=cleaned
let spacesVisited = 0         // Spaces visited counter
var finalSolution = []        // Robot path for the cleaning job

// Simple path-finder algorithm:
// From the actual position will look for cleanable space UP, RIGHT, LEFT and DOWN.
// If next step is a non visited space then go ahead, push the others possible movments
// and call recursively the walk function for the new cleanable space. 
// I think that the perfect algorith must be some combination of a backtracking / maze algorithms.

function walk(totalSpacesToClean, grid, gridLines, gridCols, actualPositionLine, actualPositionCol) {
    // Include space on path
    finalSolution.push({li:actualPositionLine, co:actualPositionCol})      
    if (visitedSpace[actualPositionLine][actualPositionCol] === 0) {
        visitedSpace[actualPositionLine][actualPositionCol] = 1
        spacesVisited++
        // push to stack all possible paths from actual robot position
        // Possible movements: 
        // 1-check move UP
        if (actualPositionLine - 1 > 0) {
          if (grid[actualPositionLine - 1][actualPositionCol] > 0) {
            // possible move
            stack.push({li: actualPositionLine-1, co:actualPositionCol})
            console.log('UP move is to a cleanable space')
          }
        } 
        // 2-check move RIGHT
        if (actualPositionCol + 1 < gridCols) {
          if (grid[actualPositionLine][actualPositionCol + 1] > 0) {
             // possible move
            stack.push({li: actualPositionLine, co:actualPositionCol + 1})
            console.log('RIGHT move is to a cleanable space')
          }
        } 
        // 3-check move LEFT
        if (actualPositionCol - 1 > 0) {
          if (grid[actualPositionLine][actualPositionCol - 1] > 0) {
            // possible move
            stack.push({li: actualPositionLine, co:actualPositionCol - 1})
            console.log('LEFT move is to a cleanable space')
          }
        } 
        // 4-check move DOWN
        if (actualPositionLine + 1 < gridLines) {
          // console.log('DOWN move is inside grid')
          if (grid[actualPositionLine + 1][actualPositionCol] > 0) {
            // possible move
            stack.push({li: actualPositionLine+1, co:actualPositionCol})
            console.log('DOWN move is to a cleanable space')
          }
        } 
    } 
    console.log('calc debug. spaces visited=' + spacesVisited + ' - space=' + actualPositionLine + ',' + actualPositionCol + ' - stack size: ' + stack.size())
    if (spacesVisited < totalSpacesToClean) {
      if (! stack.isEmpty()) {
        let space = stack.pop()
        // Try to walk to a non visited space
        if (visitedSpace[space.li][space.co] > 0) {
            // visited space
            if (! stack.isEmpty()) {
               let space2 = stack.pop()
               if ((Math.abs(space2.li - actualPositionLine) + Math.abs(space2.co - actualPositionCol)) < 2) {
                  // Ensure that is not moving on diagonal direction and that the space is linked on previous space
                  // Back space to the stack and use space2 to do the movement
                  stack.push(space)
                  space = space2
               }
               else {
                 // return space2 to the stack
                 stack.push(space2)
               }
            }
            // TODO: Maybe we can apply this approach on the last 4 elements on stack checking all possible robot directions
        }
        walk(totalSpacesToClean, grid, gridLines, gridCols, space.li, space.co) 
      }
    }
}

// Important consideration: All cleanable spaces are linked / reached. 
function calculate(totalSpacesToClean, grid, gridLines, gridCols, actualPositionLine, actualPositionCol) {
    finalSolution = []

    // preparing visitedSpace grid to store the already visited cleanable spaces
    for (let i = 0; i < gridLines; i++) {
        if (visitedSpace[i] === undefined) {
          visitedSpace[i] = []
        }
        for (let j=0; j < gridCols; j++) {
            visitedSpace[i][j] = 0
        }
    }

    console.log('Starting path calc. Total spaces to clean: ' + totalSpacesToClean)
    spacesVisited = 0
    while (! stack.isEmpty()) {      // Empty Stack
      stack.pop();
    }
    walk(totalSpacesToClean, grid, gridLines, gridCols, actualPositionLine, actualPositionCol) 
    console.log('Finished path calc. Total path steps: ' + finalSolution.length)

    // finalSolution.push({li:1, co:2})
    // finalSolution.push({li:1, co:3})
    // finalSolution.push({li:1, co:4})
    return finalSolution
}

module.exports = {
  calculate: calculate
}