const cnv = document.getElementById('snk')
let wiw = window.innerWidth
cnv.width = 340
cnv.height = 450
const gameSpeed = 500

function reset(){
   snake= []
 snake[0]= {x:0, y:0}
 snake[1]= {x:1, y:0}
 snake[2]= {x:2, y:0}
 


 scr = 0

 scrs= []
}

let snake= []
 snake[0]= {x:0, y:0}
 snake[1]= {x:1, y:0}
 snake[2]= {x:2, y:0}
 
var pxl = 20

let scr = 0
let highScore = 0
let scrs= [0, 1,2]
let highScoreInfo = ''
function putScore(){
    scr += 10

   
    document.querySelector('.score').innerHTML = scr
}

function highScores(){
   let x = scrs.reduce(function(a, b){
        return Math.max(a, b)
   }, 0)
if(scr > x){
    highScore = scr
highScoreInfo = 'Hurray!!! You have pushed your Limit you have a new High Score'
    
}
document.querySelector('.highScore').innerHTML= highScore

}

const xPixels = cnv.width/ pxl
const yPixels = cnv.height/pxl
const randomNumber= function(x){
    
    return Math.floor(Math.random() * x)
}
const trgt = function(){
   
    return{
    x: randomNumber(xPixels-2),
    y: randomNumber(yPixels-2)
}}
let trgtLoc = {}

let game
let axis = 'x'
let a =0  // horizontal strt point
let b=0
let d = 1  // horizontal direction
let f = 1

const strt =  document.getElementById('gameStart')

let stop =  document.getElementById('gameStop')
c= cnv.getContext('2d')

function drawTarget(){
    let apple = new Image();
    apple.src = './img/apple.png';
    c.drawImage(apple, pxl*trgtLoc.x, pxl*trgtLoc.y, pxl, pxl)
 
  
}

function drawLine(strtX, strtY, toX, toY,){
c.beginPath()
c.moveTo(strtX, strtY)
c.lineTo(toX, toY)
c.strokeStyle = 'rgba(0,0,0,0)'
c.stroke()

c.closePath()
}

function setUpStage(){
    let x = pxl 
    let y = pxl
    for(let i = 0; i<= yPixels; i++){

    
        drawLine(x, 0, x, cnv.height )
x += pxl
    }

    for(let i = 0; i<= xPixels; i++){

      
        drawLine(0, y, cnv.width, y )
y += pxl
    }

}
let body = new Image();
body.src = './img/snakeBody.png';
let head =  new Image()
head.src = './img/snakeHeadrt.png'

function drawBox(color){

//   base_image.onload = function(){
//     context.drawImage(base_image, 0, 0);
//   }

let cc= snake.length

c.strokeStyle = '#ccc'
for(let i =0; i< cc; i++){
c.fillStyle = color
let img
if (i==cc-1){
    c.fillStyle = 'green';
 
    c.drawImage(head, pxl*snake[i].x, pxl*snake[i].y, pxl, pxl);

}else{

c.drawImage(body, pxl*snake[i].x, pxl*snake[i].y, pxl, pxl);

}
// c.fillRect(pxl*snake[i].x, pxl*snake[i].y, pxl, pxl)
// c.stroke()
}





}
setUpStage()

function moveBoxX(x, y){
   
    c.clearRect(0, 0, cnv.width, cnv.height)
setUpStage()
if(axis == 'x'){


    drawBox(a, b, 'green')
a = a + 1*x
if(a<0){
    a = xPixels + 1
}else if(a> xPixels + 1 ){
    a=0
}
}else if(axis == 'y'){
     drawBox(a, b, 'green')
b = b + 1*y
if(b<0){
    b = yPixels -2
}else if(b> yPixels -2){
    b=0
}
}
    
}



function moveSnake(){
       c.clearRect(0, 0, cnv.width, cnv.height)
      
       snake.shift()
       let x= snake.length -1
    let oldHead = snake[x]
 
  if(axis == 'x'){
 X = oldHead.x + 1 * d 
  Y = oldHead.y 
  }else{
        X = oldHead.x 
 Y = oldHead.y + 1 * f
  }

  if(X > xPixels -1){
      X = 0
  }else if(X < 0){
      X = xPixels  -1
  }
      if(Y > yPixels -1){
      Y = 0
  }else if(Y < 0){
      Y = yPixels  -1
  }
 
    let newHead = {
        x: X ,
        y: Y
    }
   
    snake.push(newHead)
   
setUpStage()
drawBox('red')
}

function checkFood(){
      let x= snake.length -1
    for(let i = 0; i<x; i++){

        if (trgtLoc.x == snake[i].x && trgtLoc.y == snake[i].y ){
 putScore()
    trgtLoc = trgt()
    let newTail = {
        x: snake[x].x-1,
        y: snake[x].y
    }
    snake.unshift(newTail)
    console.log(snake)
}



    }

}


function endChecker(){
      let x= snake.length -1
    for(let i = 0; i<=x; i++){



let zz = snake.filter(function(z){
    return( z.x == snake[0].x && z.y == snake[0].y)
})
if(zz.length >1){
    clearInterval(game)
    highScores()
    document.querySelector('.info').style.display= 'block'
    document.querySelector('.info').innerHTML = `<h3>Game Over</h3> <p> Your Score is ${scr}</p> <p>${highScoreInfo}</p>`
     
    stop.style.display = 'none'
    strt.style.display = 'inline-block'
     scrs.push(scr)
  
   reset()
}


    }

}


// monitor user input
function left(){
    
     axis = 'x'
              d = -1
              head.src = './img/snakeHead.png'

              
}
function right(){
 axis = 'x'
                d = 1
                console.log('hdggdg',c)
                head.src = './img/snakeHeadrt.png'

}
function up(){
      axis = 'y'
              f = -1
              head.src = './img/snakeHeadup.png'

}
function down(){
     axis = 'y'
              f = 1
              head.src = './img/snakeHeaddw.png'

}
            function test(d){
let o = `${d}()`
        if(d=='left' && axis == 'y' || d=='right'&& axis == 'y' || d == 'up' && axis == 'x' || d == 'down' && axis == 'x'){
   eval(o)
        }
     
            }
            let directions= ['left', 'right', 'up', 'down']
            var getButton = function(x){
x.map(dd =>{

    document.getElementById(dd).addEventListener('click', function(e){
        
test(dd)
    })
})
            }


  document.addEventListener('keydown', function(e){
      
     
          if(e.keyCode == 37 && axis=='y'){
              e.preventDefault()                                            
             left()
             
          }else if(e.keyCode == 39 && axis=='y'){
              e.preventDefault()                                            
              right()
          }else if(e.keyCode == 38 && axis=='x'){
              e.preventDefault()                                            
            
up()
          }else if(e.keyCode == 40 && axis=='x'){
              e.preventDefault()                                            
             down()
          }
           
    })
      
        document.addEventListener('keydown', function(e){
          if(e.keyCode == 97 ||e.keyCode ==100 || e.keyCode == 119 || e.keyCode == 120 ){
              gameSpeed = 200
          }
        })

// strt Game
 
strt.addEventListener('click', function(e){
    console.log(strt)
    console.log(e)
       reset()
       trgtLoc = trgt()
       document.querySelector('.info').style.display= 'none'
       getButton(directions)
 game = setInterval(function(){
  
     drawBox('red')
moveSnake()
endChecker()
drawTarget()
checkFood()

}, gameSpeed)
strt.style.display = 'none'
stop.style.display = 'inline-block'

})


// strt.addEventListener('click', function(e){
//     console.log(e)
//        reset()
//        trgtLoc = trgt()
//        document.querySelector('.info').style.display= 'none'
//        getButton(directions)
//  game = setInterval(function(){
  
//      drawBox('red')
// moveSnake()
// endChecker()
// drawTarget()
// checkFood()

// }, gameSpeed)
// strt.style.display = 'none'
// stop.style.display = 'inline-block'
// })

// stop Game
stop.addEventListener('click', function(){

    clearInterval(game)
    c.clearRect(0, 0, cnv.width, cnv.height)
    setUpStage()
    highScores()
    document.querySelector('.info').style.display= 'block'
    document.querySelector('.info').innerHTML = `<h3>Game Over</h3> <p> Your Score is ${scr}</p> <p>${highScoreInfo}</p>`
    
   reset()
    stop.style.display = 'none'
    strt.style.display = 'inline-block'
 })

