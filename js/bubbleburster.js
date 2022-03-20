// canvas setup
const canvas = document.getElementById('bubbleburster')
const ctx = canvas.getContext('2d')
canvas.width = 400
canvas.height = 400

let score = 0
let gameFrame = 0
ctx.font = '15px Georgia'

//mouse interactivity
let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

canvas.addEventListener('mousedown', function(e) {
    mouse.click = true
    mouse.x = e.x - canvasPosition.left
    mouse.y = e.y - canvasPosition.top
})
canvas.addEventListener('mouseup', function(e) {
    mouse.click = false
})

class Player {
    constructor() {
        this.x = canvas.width
        this.y = canvas.height / 2
        this.radius = 30;
        this.angle = 0
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
        this.spriteWidth = 498
        this.spriteHeight = 327
    }
    update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        if (mouse.x != this.x) {
            this.x -= dx / 10
        }
        if (mouse.y != this.y) {
            this.y -= dy / 10

        }
    }

    draw() {
        if (mouse.click) {
            ctx.lineWidth = 0.3
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
        }
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.fillRect(this.x, this.y, this.radius, 10)
    }
}

const player = new Player()

const bubblesArray = []
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 100
        this.radius = 30
        this.speed = Math.random() * 5 + 1
        this.distance
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
    }
    update() {
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx * dx + dy * dy)

    }
    draw() {
        ctx.fillStyle = 'blue'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
    }

}

function handleBubbles() {
    if (gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble())
    }

    bubblesArray.forEach((bubble, i) => {
        bubble.update()
        bubble.draw()
        if (bubble.y < 0 - this.radius * 2) {
            bubblesArray.splice(i, 1)
        }
        if (bubble.distance < bubble.radius + player.radius) {
            if (!bubble.counted) {
                score++
                bubble.counted = true

                bubblesArray.splice(i, 1)
            }
        }

    })
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleBubbles()
    player.update()
    player.draw()
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, 10, 50)
    gameFrame++
    requestAnimationFrame(animate)

}
animate()