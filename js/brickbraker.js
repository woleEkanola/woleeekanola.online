// canvas setup
const pixel = 12
const canvas = document.getElementById('cv')
const ctx = canvas.getContext('2d')
canvas.width = 380
canvas.height = 400
var lives = 3
const level = 1
var start = false

let score = 0
let gameFrame = 0
var gameOver = false
ctx.font = '14px Georgia'

let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

// canvas.addEventListener('mousedown', function(e) {
//     mouse.click = true
//     mouse.x = e.x - canvasPosition.left
//     mouse.y = e.y - canvasPosition.top
// })
// canvas.addEventListener('mouseup', function(e) {
//     mouse.click = false
// })

document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowRight' && player.x < canvas.width - 100) {
        player.x += 10
    } else if (e.key == 'ArrowLeft' && player.x > 0) {
        player.x -= 10
    }else if(e.key == 'Enter'){
        start = true
        gameOver=false
    }

})

class Box {
    constructor(x, y, strength) {
        this.x = x
        this.y = y
        this.strength = strength
        this.id
    }

    draw() {
        if (this.strength == 3) {
            ctx.fillStyle = 'orange'

        } else if (this.strength == 2) {
            ctx.fillStyle = 'green'

        } else {

            ctx.fillStyle = 'red'
        }
        ctx.beginPath()
        ctx.rect(this.x, this.y, pixel, pixel)
        ctx.fill()
        ctx.closePath()
        ctx.fillRect(this.x, this.y, pixel, pixel)
    }

    colision(bll) {
        if (bll.x >= this.x && bll.x <= this.x + pixel) {
            if (bll.y >= this.y && bll.y <= this.y + pixel) {

                bll.directionY = bll.directionY * -1
                score += 10

                return true
            }

        }
    }
}

var target = [0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, ]
var boxes = []

function generateBoxes() {

    target.forEach((t, i) => {
        if (t == 1) {
            let bx = new Box(70 + i * pixel, 180, 3)
            bx.id = i
            boxes.push(bx)
        } else {
            boxes.push({})
        }
    })
}

function handleBox(x) {
    boxes.forEach((box, i) => {
        if (box.colision) {

            let c = box.colision(x)
            if (c) {
                box.strength -= 1

            }
        }
        if (box.strength == 0) {
            boxes.splice(i, 1)
            console.log(box)
        }
    })

}

class Player {
    constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height - 30
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
    }
    update() {
        // const dx = this.x - mouse.x
        // if (mouse.x != this.x) {
        //     this.x -= dx / 10
        // }

    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.beginPath()
        ctx.rect(this.x, this.y, 100, 20)
        ctx.fill()
        ctx.closePath()
        ctx.fillRect(this.x, this.y, 100, 20)
    }
}

const player = new Player()

const balls = []

class Ball {
    constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height - 30
        this.radius = 3
        this.speed = 3
        this.distance
        this.angle
        this.directionX = -1
        this.directionY = -1

    }
    update() {
        this.y += (this.speed * this.directionY)
        this.x += (this.speed * this.directionX)

        // const dx = this.x - player.x
        // const dy = this.y - player.y
        // this.distance = Math.sqrt(dx * dx + dy * dy)

        if (this.x <= 0) {
            this.directionX = 1
        }

        if (this.x >= canvas.width) {
            this.directionX = -1

        }
        if (this.y <= 0) {
            this.directionY = 1
        }

    }


    draw() {
        ctx.fillStyle = 'brown'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
    }
}



function handleball() {
    balls.forEach((ball, i) => {

        if (ball.x >= player.x && ball.x <= player.x + 100) {
            if (ball.y >= canvas.height - 30) {

                ball.directionY = -1
            }

        }

        if (ball.y > canvas.height) {
            balls.splice(i, 1)
            lives -= 1
        }
    })

}

function showLives() {

    for (i = 1; i <= lives; i++) {
        ctx.fillStyle = 'brown'
        ctx.beginPath()
        ctx.arc(10, (70 + i * 5), 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()

    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (start){

        if (lives > 0) {

            showLives()
            if (boxes.length <= 0) {
                generateBoxes()
            }
            boxes.forEach(box => {
                if (box.draw && box.strength >= 0) {
                    box.draw()
                }
    
    
            })
            if (balls.length <= 0) {
    
                balls.push(new Ball())
            }
            balls.forEach(ball => {
                ball.update()
                ball.draw()
                handleBox(ball)
            })
            handleball()
    
            player.update()
            player.draw()
            ctx.fillStyle = 'black'
            ctx.fillText('Score: ' + score, 10, 20)
            gameFrame++
        } else {
    
            ctx.fillStyle = 'black'
            
            start = false
            gameOver = true
            lives = 3
           target = [0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, ]
            boxes = []
            score = 0
            
        }
    }else{
        
        ctx.fillStyle = 'black'
       msgr()
    }
    requestAnimationFrame(animate)

}

function msgr (){
    ctx.fillText(`${gameOver? 'Game Over':''} Press Enter to ${gameOver?'Re':''}start`, 20, 40)
}
animate()