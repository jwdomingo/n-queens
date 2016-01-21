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



window.findNRooksSolution = function(n, template, start) {
  template = template || new Board({n: n});
  start = start || 0;

  var blank = _.range(n).map(function(){return 0;});
  
  //var topLevel = blank.slice();

  window.rookSolutions = [];
  
  //topLevel[start] = 1;
  //template.set(0, topLevel);

  for (var row = start; row < template.rows().length; row++) {
    var currentRow = template.get(row);

    for (var col = 0; col < currentRow.length; col++) {
      var arr = blank.slice();

      arr[col] = 1;

      template.set(row, arr);

      if (!template.hasAnyRooksConflicts()) {
        debugger;
        if (start < n - 1) {
          window.findNRooksSolution(n, template, start + 1);
        } else {
          window.rookSolutions.push(template);
        }
      }

      template.set(row, blank);
    }
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(window.rookSolutions[0].rows()));
  return window.rookSolutions[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  /*

    Base Case:
    from zero, reached n

    Recursive Case:
    findNRooksSolution

    for loop
    start counter resets at 0
    blank template except for template[0][n]

  */


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
