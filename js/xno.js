const state = {
    currPlayer: 'x',
    game: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    win: ['012', '345', '678', '036', '147', '258', '048', '246'],
    gameOver: true,
    ai: false,
    humanTurn: true,
    humanFirst: true,
    aiMove: [],
    humanMove: [],
    winPattern: ''

}

// tic function  recieves the id of the game cell checks if the id is valid gamecell  id 
//and also if its an unused cell. It then assign the current player letter to the inner html
const tic = x => {
    var target = document.getElementById(x)
    if (target.classList.contains('gameCell') && state.game[x] == 0) {
        target.classList.add(state.currPlayer)
        target.innerHTML = state.currPlayer
        state.game[x] = state.currPlayer


        return true
    } else {
        return false
    }

}

const endGame = (msg) => {
    state.gameOver = true
    logger(msg)
}


// turn on AI player

const AIswitch = () => {
    if (state.gameOver) {

        state.ai = !state.ai
        logger(`AI Player has been turned ${state.ai ? 'On' : 'off'}`)
        document.getElementById('ai').checked = state.ai
    } else {
        logger(`You can not turn ${state.ai ? 'off': 'on'} AI during an active game `)
        document.getElementById('ai').checked = state.ai
    }
}


// make human play first  while AI is active
const humanFirst = () => {
        if (state.gameOver) {

            state.humanFirst = !state.humanFirst
                // logger(`AI Player has been turned ${state.ai ? 'On' : 'off'}`)
            document.getElementById('humanFirst').checked = state.humanFirst
        } else {
            logger(`You can not turn ${state.humanFirst ? 'off': 'on'} this feature during an active game `)
            document.getElementById('humanFirst').checked = state.humanFirst
        }
    }
    // TODO : REWRITE THIS PART WITH MINMAX FUNCTION
const determineAIMove = () => {
    let winPattern = ['082', '087', '053']

    // if AI plays first  try to create the two way win scenario
    if (!state.humanFirst) {

        // choose one of the win pattern
        let x = Math.floor(Math.random() * (winPattern.length - 1))
        state.winPattern = winPattern[x]
        console.log('chosen' + state.winPattern)
    }

}

const checkMate = () => {

}


const AImove = () => {
    var b = Math.floor(Math.random() * 8)
    if (state.winPattern) {
        console.log('jjjj' + state.winPattern[state.aiMove.length])
        tic(state.winPattern[state.aiMove.length])
        if (state.aiMove.length == 3) {
            state.winPattern += checkMate()
        }

    } else {

        let y = tic(b)

        while (!y) {

            b = Math.floor(Math.random() * 8)

            y = tic(x)
        }
    }

    switchPlayer(state.currPlayer, b.toString())

}

// toggles current player in the game state
const switchPlayer = (currPlayer, x) => {
    console.log(`it is ${state.humanTurn?'human turn ': 'ai turn'}`)
    if (state.humanTurn) {
        state.aiMove.push(x)
    } else {
        state.humanMove.push(x)
    }

    // check if the last move won the game
    if (state.win.indexOf(winCheck(currPlayer)) >= 0) {
        // Game has been won

        endGame(`${currPlayer} has won the game`)

    } else {
        // check there is more room to play
        if (state.game.indexOf(0) >= 0) {

            state.currPlayer = state.currPlayer == 'x' ? 'o' : 'x'

            if (state.ai) {
                if (!state.humanTurn) {
                    state.humanTurn = true
                    AImove()


                } else {
                    state.humanTurn = false
                }
            }

            // if (state.currPlayer == 'x') {
            //     state.currPlayer = 'o'
            // } else {
            //     state.currPlayer = 'x'
            // }
        } else {

            // if no room to play declare a tie
            endGame('Game over, Its a Tie')
        }


    }





}

const winDisplay = x => {
    console.log('hgghgh' + x)
    let y = x.split('')
    y.forEach(Y => {
        if (state.currPlayer == 'x') {
            document.getElementById(Y).classList.add('winX')

        } else {
            document.getElementById(Y).classList.add('winO')

        }
    })
}

//checks if any winning combo is fulfilled
const winCheck = player => {

    let win = player + player + player
    state.win.forEach(combo => {
        // console.log(combo)

        if (state.game[combo[0]] + state.game[combo[1]] + state.game[combo[2]] == win) {
            //   console.log(combo)
            win = combo
            winDisplay(win)
        }

    })

    return win
}

const render = () => {

    state.game.forEach((g, i) => {
        let target = document.getElementById(i)
        if (g != 0) {
            target.innerHTML = g

        } else {
            target.innerHTML = ''

        }
    })


}

const logger = msg => {
        document.getElementById('msg').innerHTML = msg
    }
    // Game Play
    // end Game 

const nd = document.getElementById('end')
nd.addEventListener('click', e => {
    if (!state.gameOver) {
        state.gameOver = true

        logger('Game Ended')
    }
})

// start Game 
const st = document.getElementById('start')

st.addEventListener('click', e => {
    if (state.gameOver) {
        for (i = 0; i < 9; i++) {
            document.getElementById(i).classList.remove(state.game[i])
            document.getElementById(i).classList.remove('winO')
            document.getElementById(i).classList.remove('winX')
        }
        state.game = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        state.currPlayer = 'x'
        state.aiMove = []
        state.humanMove = []

        logger(` Game Started,  Current Player is ${state.currPlayer} - ${state.humanFirst ? ' - You Play first' : ' - AI will make the first move'}`)
        state.gameOver = false

        render()
        if (state.ai) {
            determineAIMove()
            state.humanFirst ? '' : AImove()
        }
    }
})

const gameboard = document.getElementById('gameboard')

gameboard.addEventListener('click', e => {
        // console.log(e.target.classList)
        let currPlayer = state.currPlayer

        if (e.target.classList.contains('gameCell')) {
            let currCell = e.target.id
                // let currCellEl= document.getElementById(currCell)

            if (state.game[currCell] == 0 && !state.gameOver) {
                tic(currCell)
                render()
                state.humanTurn = state.ai ? false : true
                switchPlayer(currPlayer, e.target.id)
            } else if (state.gameOver) {
                logger('Game is not active, click the start button to start a new game')
            } else {
                logger('Choose an empty Cell')
            }

        }

    })
    // console.log(winCheck('x'))