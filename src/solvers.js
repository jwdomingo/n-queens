/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findSolution = function(board, n, row, callback, validator) {
  if (row === n) {
    return callback();
  }

  for (var col = 0; col < n; col++) {
    board.togglePiece(row, col);

    if (!board[validator]()) {
      var result = findSolution(board, n, row + 1, callback, validator);
      if(result) {
        return result;
      }
    }
    board.togglePiece(row, col);
  }
};

window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});

  solution = findSolution(board, n, 0, function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  }, 'hasAnyRooksConflicts') || board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = 0;
  var board = new Board({n:n});
  var filledCols = _.range(n).map(function(){return 0;});

  findSolution(board, n, 0, function() {
    solution++;
  }, 'hasAnyRooksConflicts');

  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = undefined;

  solution = findSolution(board, n, 0, function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  }, 'hasAnyQueensConflicts') || board.rows();

  console.log('Single solution for for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = 0;
  var board = new Board({n:n});

  findSolution(board, n, 0, function() {
    solution++;
  }, 'hasAnyQueensConflicts');

  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};
