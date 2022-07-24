var assert = require('assert');
var Player = require('../player')
describe('decide', function () {
  describe('hasImmediateWin', function () {
    const AI = new Player(1, 2)
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
    it('should detect a horizontal win to the right', function () {
      assert.equal(AI.hasImmediateWin(board1, active1, AI.num), 3);
      assert.equal(AI.hasImmediateWin(board1, active1, 3 - AI.num), 3);
    });
    it('should detect a vertical win', function () {
      assert.equal(AI.hasImmediateWin(board2, active2, AI.num), 0);
      assert.equal(AI.hasImmediateWin(board2, active2, 3 - AI.num), 6);
    });
  });
});
