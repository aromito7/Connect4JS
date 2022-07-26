var assert = require('assert');
var Player = require('../player')
//const {checkForWin} = require('../index')
describe('decide', function () {
  const AI = new Player(1, 2)

  const active1 = [4, 4, 4, 5, 4, 4, 4]
  const board1 = [[0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [2, 2, 2, 0, 1, 1, 1]];
  describe('largestChainAtLocation', function(){
    it('should detect three in a row for both players', function () {
      assert.equal(Player.longestChainAtLocation([3, 5], board1, 2), 3);
      assert.equal(Player.longestChainAtLocation([3, 5], board1, 1), 3);
    });
  });


  describe('hasImmediateWin', function () {
    const AI = new Player(1, 2)

    const activeBottom = [5, 5, 5, 5, 5, 5, 5]
    const activeTop = [0, 0, 0, 0, 0, 0, 0]

    const active1 = [4, 4, 4, 5, 4, 4, 4]
    const board1 = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [2, 2, 2, 0, 1, 1, 1]];

    const active2 = [2, 5, 5, 5, 5, 5, 2]
    const board2 = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [2, 0, 0, 0, 0, 0, 1],
                    [2, 0, 0, 0, 0, 0, 1],
                    [2, 0, 0, 0, 0, 0, 1]]

    const board3 = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 2, 1, 0],
                    [0, 0, 0, 2, 1, 0, 0],
                    [0, 0, 2, 1, 0, 0, 0],
                    [0, 2, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]]


    const active4 = [4, 5, 4, 3, 3, 4, 3]
    const board4 = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 2, 2, 0, 2],
                    [1, 0, 1, 1, 2, 2, 1]];

    const active5 = [2, 2, 2, 2, 2, 2, 2]
    const board5 = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 2, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 2, 1, 0, 0, 0],
                    [0, 2, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]]

    const board6 = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 2, 0, 0, 0, 0],
                    [0, 0, 1, 2, 0, 0, 0],
                    [0, 0, 0, 1, 2, 0, 0],
                    [0, 0, 0, 0, 1, 2, 0],
                    [0, 0, 0, 0, 0, 0, 0]]

    const active7 = [2, 2, 2, 2, 2, 2, 2]
    const board7 = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 2, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 2, 0, 0],
                    [0, 0, 0, 0, 1, 2, 0],
                    [0, 0, 0, 0, 0, 0, 0]]

    it('should detect a horizontal win on the end', function () {
      assert.equal(AI.hasImmediateWin(board1, active1, 2), 3);
      assert.equal(AI.hasImmediateWin(board1, active1, 1), 3);
    });
    it('should detect a horizontal win in the middle', function () {
      assert.equal(AI.hasImmediateWin(board4, active4, 2), 5);
      assert.equal(AI.hasImmediateWin(board4, active4, 1), 1);
    });

    it('should detect a vertical win on the end', function () {
      assert.equal(AI.hasImmediateWin(board2, active2, 2), 0);
      assert.equal(AI.hasImmediateWin(board2, active2, 1), 6);
    });

    it('should detect a diagonal up win on the end', function () {
      assert.equal(AI.hasImmediateWin(board3, activeTop, 2), 5);
      assert.equal(AI.hasImmediateWin(board3, activeTop, 1), 6);
    });
    it('should detect a diagonal up win on either end', function () {
      assert.equal(AI.hasImmediateWin(board3, activeBottom, 2), 0);
      assert.equal(AI.hasImmediateWin(board3, activeBottom, 1), 1);
    });
    it('should detect a diagonal up win in the middle', function () {
      assert.equal(AI.hasImmediateWin(board5, active5, 2), 3);
      assert.equal(AI.hasImmediateWin(board5, active5, 1), 4);
    });

    it('should detect a diagonal down win on the end', function () {
      assert.equal(AI.hasImmediateWin(board6, activeTop, 2), 1);
      assert.equal(AI.hasImmediateWin(board6, activeTop, 1), 0);
    });
    it('should detect a diagonal down win on either end', function () {
      assert.equal(AI.hasImmediateWin(board6, activeBottom, 2), 6);
      assert.equal(AI.hasImmediateWin(board6, activeBottom, 1), 5);
    });
    it('should detect a diagonal down win in the middle', function () {
      assert.equal(AI.hasImmediateWin(board7, active7, 2), 3);
      assert.equal(AI.hasImmediateWin(board7, active7, 1), 2);
    });
  });

  describe('wontCauseImmediateWin', function () {
    const AI = new Player(1, 2)

    const active1 = [5, 1, 0, 0, 1, 2, 4]
    const board1 = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 2, 0, 0, 0],
                    [0, 2, 2, 1, 1, 0, 0],
                    [0, 2, 2, 1, 1, 1, 0],
                    [0, 1, 1, 1, 2, 2, 0],
                    [0, 2, 1, 2, 1, 2, 2]];

    const active2 = [0, 1, 4, 2, 5, 2, 1]
    const board2 = [[0, 0, 0, 0, 0, 0, 0],
                    [2, 0, 0, 0, 0, 0, 0],
                    [1, 2, 0, 0, 0, 0, 1],
                    [1, 1, 0, 1, 0, 1, 2],
                    [2, 2, 0, 2, 0, 2, 2],
                    [2, 2, 1, 1, 0, 1, 1]];



    it('should avoid moves that give opponent immediate win on the end', function () {
      assert.equal(AI.wontCauseImmediateWin(board1, active1, 1).toString(), [2, 3, 4].toString());
      assert.equal(AI.wontCauseImmediateWin(board1, active1, 2).toString(), [1, 2, 3, 5, 6]);
    });

    it('should avoid moves that give opponent immediate win in the middle', function () {
      assert.equal(AI.wontCauseImmediateWin(board2, active2, 1).toString(), [0, 1, 3, 5, 6].toString());
      assert.equal(AI.wontCauseImmediateWin(board2, active2, 2).toString(), [0, 1, 3, 5, 6].toString());
    });

  });
});
