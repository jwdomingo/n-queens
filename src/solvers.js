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



window.findSolution = function(board, n, row, callback) {
  if (row === n) {
    return callback();
  }

  for (var col = 0; col < n; col++) {
    board.togglePiece(row, col);

    if (!board.hasAnyRooksConflicts()) {
      findSolution(board, n, row + 1, callback);
    }
    board.togglePiece(row, col);
  }
};

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
    var blank = _.range(n).map(function(){return 0;});

    solution.set(0,[1,0,0,0]);

    for (var j = 1; j < solution.rows().length; j++) {
      
      var row = solution.get(j);

      for (var i = 0; i < row.length; i++) {
        var arr = blank.slice();

        arr[i] = 1;

        solution.set(j, arr);

        if (!solution.hasAnyRooksConflicts()) {
          break;
        }

        solution.set(j, blank);
      }
    }

    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
    return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = 0;
  var board = new Board({n:n});
  var filledCols = _.range(n).map(function(){return 0;});

  findSolution(board, n, 0, function() {
    solution++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  var blank = _.range(n).map(function(){return 0;});

  var findSolution = function(template, row, filledCols, illegalCols) {
    row = row || 0;
    template = template || board;
    filledCols = filledCols || blank.slice();
    illegalCols = illegalCols || blank.slice();

    if(row === n) {
      solution = template.rows();
      return solution;
    } else {
      for(var col = 0; col < n; col++) {
        if (!filledCols[col] && !illegalCols[col]) {
          var arr = blank.slice();
          arr[col] = 1;
          template.set(row, arr);

          if(!template.hasAnyQueensConflicts()) {
            var nextTemplate = new Board(template.rows());

            var newFilledCol = filledCols.slice();
            newFilledCol[col] = 1;

            var newIllegalCol = blank.slice();
            newIllegalCol[col < 0 ? 0 : col - 1] = 1;
            newIllegalCol[col > n - 1 ? n - 1 : col + 1] = 1;


            findSolution(nextTemplate, row + 1, newFilledCol, newIllegalCol);
          } else {
            template.set(row, blank);
          }
        } // if !filledCols[col]
      } // for 
    }

    return solution;
  };

  solution = findSolution();
  console.log('Single solution for for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n: n});
  var blank = _.range(n).map(function(){return 0;});

  var findSolution = function(template, row, filledCols, illegalCols) {
    row = row || 0;
    template = template || board;
    filledCols = filledCols || blank.slice();
    illegalCols = illegalCols || blank.slice();

    if(row === n) {

      solutionCount++;
    } else {
      for(var col = 0; col < n; col++) {
        if (!filledCols[col] && !illegalCols[col]) {
          var arr = blank.slice();
          arr[col] = 1;
          template.set(row, arr);

          if(!template.hasAnyQueensConflicts()) {
            var nextTemplate = new Board(template.rows());

            var newFilledCol = filledCols.slice();
            newFilledCol[col] = 1;

            var newIllegalCol = blank.slice();
            newIllegalCol[col < 0 ? 0 : col - 1] = 1;
            newIllegalCol[col > n - 1 ? n - 1 : col + 1] = 1;

            findSolution(nextTemplate, row + 1, newFilledCol, newIllegalCol);
          } else {
            template.set(row, blank);
          }
        } // if !filledCols[col]
      } // for 
    }
  };
  findSolution();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
