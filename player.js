class Player{
    static types = ['HUMAN', 'AI', 'ML']
    constructor(typeNum){
        this.type = Player.types[typeNum]
    }

    decide(board, active){
        console.log(board)
        return 0
    }

    hasImmediateWin(board)
}
