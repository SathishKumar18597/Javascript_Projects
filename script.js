// define HTML Element
const board=document.getElementById("game-board");
const instructionText=document.getElementById('instruction-Text');
const logo=document.getElementById('logo');
const score=document.getElementById('score');
const highScoreText=document.getElementById('highScore');

//console.log(board);

// game variables
let snake=[{ X:10,Y:10}];
let boardsize=20;
let direction='right';
let highScore=0;
let gameInterval;
let gameSpeedDelay=200;
let gameStarted=false;
let food=generateFood();


// draw game Map, Sanke, Food
function draw(){
    board.innerHTML='';
    drawSnake();
    drawFood();
    updateScore();
}

// Snakes growth progress through the game
function drawSnake(){
    snake.forEach((segment)=>{
    const snakeElement=createGameElement('div','snake');
    setposition(snakeElement,segment);
    board.appendChild(snakeElement);
    });

}

// to create HTML element for sanke and Food
function createGameElement(tag,className){
    const element = document.createElement(tag);
    element.className=className;
    return element;
}

// define the position of the food / sanke based on the segment

function setposition(element,position){
    element.style.gridColumn=position.X;
    element.style.gridRow=position.Y;

}

// Trail 1

//draw();

// defines to what position the food as to be displayed
function drawFood(){
    if(gameStarted){
    const foodElement=createGameElement('div','food');
    setposition(foodElement,food);
    board.appendChild(foodElement);
}
}

// randomly generates value for the food with Game bord

function generateFood(){
    const X= Math.floor(Math.random()*boardsize)+1;
    const Y=Math.floor(Math.random()*boardsize)+1;

    // console.log(X);
    // console.log(Y);

    return {X,Y};
}

// providing motion to the snake 
function move(){
    const snakeHead={...snake[0]};
    switch (direction) {
        case 'right':
          snakeHead.X++;
            break;
            case 'left':
                snakeHead.X--;
                  break;
                  case 'up':
          snakeHead.Y--;
            break;
            case 'down':
          snakeHead.Y++;
            break;
        
    }
    snake.unshift(snakeHead); 


  if(snakeHead.X===food.X && snakeHead.Y===food.Y ){
    food=generateFood();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval=setInterval(()=>{
   move();
   checkCollision();
   draw();

    },gameSpeedDelay);
  }
  else{
    snake.pop();
  }
}

//Trial 2
// setInterval(()=>{
// move();
// draw();
// },200);

// Start Game Function

function startGame(){
    gameStarted=true;
    instructionText.style.display='none';
    logo.style.display='none';
    gameInterval=setInterval(()=>{
move();
checkCollision();
draw();
    },gameSpeedDelay);

}

// function for Key press Lisitiner
function keyPress(event){
    if((!gameStarted && event.code==='space')||event.key===' '){
        startGame();
    }
    else{
    switch (event.key) {
        case 'ArrowUp':
            direction='up'
            break;
            case 'ArrowDown':
                direction='down'
                break;
                case 'ArrowLeft':
            direction='left'
            break;
            case 'ArrowRight':
            direction='right'
            break;
        
    }

}
} 

document.addEventListener('keydown',keyPress );

function increaseSpeed(){
    console.log(gameSpeedDelay);
    if(gameSpeedDelay>150){
        gameSpeedDelay-=5;
    } else if(gameSpeedDelay>100){
        gameSpeedDelay-=3;
    } else if(gameSpeedDelay>50){
        gameSpeedDelay-=2;
    }else {
        gameSpeedDelay-=1;
    }
}

function checkCollision(){
    const head=snake[0];
    if(head.X<1 || head.X>boardsize ||head.Y<1||head.Y>boardsize){
        resetGame();
    }
    for(let i=1;i<snake.length;i++){
        if(head.X===snake[i].X && head.Y===snake[i].Y){
            resetGame();   
        }
    }

}

function resetGame(){
updateHighsore();
stopGame();
snake=[{X:10,Y:10}];
direction='right';
gameSpeedDelay=200;
updateScore();
}

function updateScore(){
    const currentScore=snake.length-1;
    score.textContent=currentScore.toString().padStart(3,'0');
}

function updateHighsore(){
    const currentScore=snake.length-1;
      if(currentScore>highScore){
        highScore=currentScore;
       highScoreText.textContent=highScore.toString().padStart(3,'0');
    }
    highScoreText.style.display='block'; 
}

function stopGame(){
   clearInterval(gameInterval);
   gameStarted=false;
   instructionText.style.display='block';
   logo.style.display='block';
  // foodElement.style.display='none';

}


