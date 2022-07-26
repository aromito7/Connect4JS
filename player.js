class Player{
    static types = ['HUMAN', 'AI', 'ML']
    constructor(typeNum, playerNumber){
        this.type = Player.types[typeNum]
        this.num = playerNumber
    }

    decide(board, active){
        const winImmediately = this.hasImmediateWin(board, active, this.num)
        if(winImmediately >= 0) return winImmediately

        const blockOpponentWin = this.hasImmediateWin(board, active, 3 - this.num)
        if(blockOpponentWin >= 0) return blockOpponentWin

        let validMoves = this.wontCauseImmediateWin(board, active, 3 - this.num)

        return validMoves[Math.floor(Math.random() * validMoves.length)]
    }

    static largestChainInDirection([x, y], [dx, dy], board, player){
        let chain = 0

        for(let i = 1; i <= 3; i++){
            const [tempX, tempY] = [x + i * dx, y + i * dy]
            if(tempX < 0 || tempX > 6 || tempY < 0 || tempY > 5 || board[tempY][tempX] !== player) break
            chain++
        }

        for(let i = -1; i >= -3; i--){
            const [tempX, tempY] = [x + i * dx, y + i * dy]
            if(tempX < 0 || tempX > 6 || tempY < 0 || tempY > 5 || board[tempY][tempX] !== player) break
            chain++
        }

        return chain
    }

    largestChainAtLocation([x, y], board, player){
    if(y < 0) return -1
    for(let [dx, dy] of directions){
        const chain = Player.largestChainInDirection([x, y], [dx, dy], board, player)

        if(chain >= 3) {
            //console.log([x, y], [dx, dy], chain)
            return x
        }
    }
            //console.log(chain)
    }

    hasImmediateWin(board, active, player){
        let y
        const directions = [[0, 1], [1, 1], [1, 0], [1, -1]]
        for(let x = 0; x < active.length; x++){
            y = active[x]
            if(y < 0) continue
            for(let [dx, dy] of directions){
                const chain = Player.largestChainInDirection([x, y], [dx, dy], board, player)

                if(chain >= 3) {
                    //console.log([x, y], [dx, dy], chain)
                    return x
                }
            }
                //console.log(chain)
        }
        return -1
    }

    wontCauseImmediateWin(board, active, player){
        let y
        let output = [0, 1, 2, 3, 4, 5, 6]
        const directions = [[0, 1], [1, 1], [1, 0], [1, -1]]
        for(let x = 0; x < active.length; x++){
            y = active[x] - 1
            if(y >= 0){
                for(let [dx, dy] of directions){
                    let chain = 0
                    for(let i = 1; i <= 3; i++){
                        const [tempX, tempY] = [x + i * dx, y + i * dy]
                        if(tempX < 0 || tempX > 6 || tempY < 0 || tempY > 5 || board[tempY][tempX] !== player) break
                        chain++
                    }

                    for(let i = -1; i >= -3; i--){
                        const [tempX, tempY] = [x + i * dx, y + i * dy]
                        if(tempX < 0 || tempX > 6 || tempY < 0 || tempY > 5 || board[tempY][tempX] !== player) break
                        chain++
                    }

                    if(chain >= 3) {
                        //console.log([x, y], [dx, dy], chain)
                        output[x] = -1
                    }
                }
            }
        }

        return output.filter(num => num !== -1)
    }

}

module.exports = Player
