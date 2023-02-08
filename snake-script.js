const gameCanvas = document.getElementById("GameCanvas")
const contextGame = gameCanvas.getContext("2d")
//snakeParts locations
let snake = [
    { x : 200 , y : 200},
    { x : 190 , y : 200},
    { x : 180 , y : 200},
    { x : 170 , y : 200},
    { x : 160 , y :200 }
]
 // foods locations
let foodX;
let foodY; 

let zx = 10 ;
let zy = 0 ;

let score = 0
let changeDirection = false ;


document.addEventListener("keydown" , makeWaySnake)
console.log(changeDirection);

function makeWaySnake(event) {
    const leftKey = 37 ;
    const downKey = 40 ;
    const rightKey = 39 ;
    const upKey = 38 ;

    if(changeDirection) return
    console.log(changeDirection);
    changeDirection = true ;
    const keyPress = event.keyCode ;
    if( keyPress == leftKey && zx !== 10 ){
        zx = -10 ;
        zy = 0;
    }

    if( keyPress == downKey && zy !== -10 ){
        zx = 0 ;
        zy = 10;
    }

    if( keyPress == rightKey && zx !== -10){
        zx = 10 ; 
        zy = 0 ;
    }

    if( keyPress == upKey && zy !== 10){
        zx = 0 ;
        zy = -10 ;
    }
}   



mainSnake()
function mainSnake() {
    if(didGameOver()) return
    setTimeout(() => {
        changeDirection = false ;
        console.log(changeDirection);
        clearCanvas()
        drawFood()
        movementSnake()
        drawSnake()

        mainSnake();
    },150 ) ;
} 

function didGameOver(){
    for (let i = 1; i < snake.length ; i++){
        console.log(snake[i])
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y ) return true;      
    }

    const hitTopWall = snake[0].y < 0 ;
    const hitRightWall = snake[0].x > gameCanvas.width -10
    const hitBottomWall = snake[0].y > gameCanvas.height - 10
    const hitLeftWall = snake[0].x < 0 ;

    return hitTopWall || hitRightWall || hitBottomWall || hitLeftWall ;

}

let clearCanvas = () => {
    contextGame.fillStyle = "white"
    contextGame.strokeStyle = "black"
    contextGame.fillRect( 0 , 0 , gameCanvas.width , gameCanvas.height)
    contextGame.strokeRect( 0 , 0 , gameCanvas.width , gameCanvas.height)
} 


let randomNum = (max , min) => Math.round((Math.random() * (max - min) + min) / 10) * 10 

let createFood = () => {
    foodX = randomNum( 0  , gameCanvas.width - 10) ;
    foodY = randomNum( 0 , gameCanvas.height - 10) ;
    snake.forEach(snakePart => {
        if( snakePart.x == foodX && snakePart.y == foodY) {
            createFood()
     } 
  })
}

let movementSnake = () => {
    const headPart = { x : snake[0].x + zx , y : snake[0].y + zy}
    snake.unshift(headPart)
    if(headPart.x == foodX && headPart.y == foodY){
        score += 10
        document.querySelector(".score-text").textContent = score 
        createFood()
    }else{
    snake.pop()
    }
}

let drawSnake = () => snake.forEach(drawSnakePart)
let drawSnakePart = snakePart => {
    contextGame.fillStyle = "red"
    contextGame.strokeStyle = "black" 
    contextGame.fillRect( snakePart.x , snakePart.y , 11 , 11);
    contextGame.strokeRect(snakePart.x , snakePart.y , 11 ,11);
    console.log(snakePart)
}


let drawFood = () => {
    contextGame.fillStyle =  "lightgreen";
    contextGame.strokeStyle = "black";
    contextGame.fillRect( foodX , foodY , 11 ,11)
    contextGame.strokeRect(foodX , foodY , 11 ,11 )
}

createFood()
mainSnake()
