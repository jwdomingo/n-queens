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
  var board = new Board({n: n});
  var blank = _.range(n).map(function(){return 0;});

  var findSolution = function(template, row) {
    row = row || 0;
    template = template || board;
    
    if(row === n) {
      solution++;
    } else {
      for(var col = 0; col < n; col++) {
        var arr = blank.slice();
        arr[col] = 1;
        template.set(row, arr);

        if(!template.hasAnyRooksConflicts()) {
          var nextTemplate = new Board(template.rows());
          findSolution(nextTemplate, row + 1);
        } else {
          template.set(row, blank);
        }
      }
    }
  };
  /*
    Base Case:
    from zero, reached n

    Recursive Case:
    findNRooksSolution

    for loop
    start counter resets at 0
    blank template except for template[0][n]

  */

  findSolution();
  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
