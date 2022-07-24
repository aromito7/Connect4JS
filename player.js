class Player{
    static types = ['HUMAN', 'AI', 'ML']
    constructor(typeNum, playerNumber){
        this.type = Player.types[typeNum]
        this.num = playerNumber
    }

    decide(board, active){
        let move = this.hasImmediateWin(board, active, this.num)
        if(move >= 0) return move
        move = this.hasImmediateWin(board, active, 3 - this.num)
        if(move >= 0) return move
        return 0
    }

    hasImmediateWin(board, active, player = 2){
        let y
        const directions = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]
        for(let x = 0; x < active.length; x++){
            y = active[x]
            for(let [dx, dy] of directions){
                let chain = [1, 2, 3].map(num => [x + num * dx, y + num * dy])
                if(chain[2][0] >= 0 &&
                    chain[2][0] <= 6 &&
                    chain[2][1] >= 0 &&
                    chain[2][1] <= 5){

                        if(chain.map(([x,y]) => board[y][x]).filter(n => n === player).length === 3){
                            return x
                        }
                        //console.log([x, y], [dx, dy], chain)
                }
                //console.log(chain)
            }
        }
        return -1
    }
}

module.exports = Player
