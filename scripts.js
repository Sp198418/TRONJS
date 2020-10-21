let canvas = document.getElementById("Retro");
let ctx = canvas.getContext("2d");
// setting our x & y direction
let dx = 1;
let dy = 1;
// setting our starting x & y coordinates 
let x = canvas.width + 10;
let y = canvas.height/2;
let rideWidth = 40;
let rideHeight = 40;
// define a char/bikerider
let player = { 
    orientation: 'up',
    height: 40,
    width: 40, 
    x: canvas.height/2 - 15, 
    y: canvas.width/2 - 15,
    midX: function(){
        return this.x + 17.5;
    },
    bttmY: function(){
        return this.y + 38;
    }
}

let trailState = {
    x: null,
    y: null
}

player.img = new Image();
player.img.src = './assets/tronredbikeup.png'; //Bike image that will move 

// Checking for collision with walls
function has_game_ended()

{  
  for (let i = 4; i < player.length; i++)
  {    
    let has_collided = player[i] === player[0] && player[i] === player[0]
    if (has_collided) 
      return alert('Gameover')
}
  let hitLeftWall = player.x < 0;  
  let hitRightWall = player.x >= canvas.width - 35;
  let hitToptWall = player.y <= 0;
  let hitBottomWall = player.y >= canvas.height - 35;
    let onGameOver = () => {
        alert('Game Over');
        player.x = canvas.height/2 - 15
        player.y = canvas.width/2 - 15
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
    }
  return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall ? onGameOver() : ""
}


// letting page know the buttons ARENT being pressed yet
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;


document.onkeydown = keyDownHandler

//if player x and y moves draw trail

function trail() {
    /* Check x & y of player - if dif than trailState -> create a new rect using trailState.x & y
      then update trailState */
    if(trailState.x !== player.midX() || trailState.y !== player.bttmY()){
        ctx.fillStyle = 'limegreen';
        ctx.fillRect(trailState.x, trailState.y, 5, 5);

        // SAVING UNIQUE COORDINATE OF PLAYER
        trailState[`${player.midX()} ${player.bttmY()}`] = [player.midX(), player.bttmY()];

        // SAVING LAST PLAYER STATE
        trailState.x = player.midX();
        trailState.y = player.bttmY();
    }
    // DRAW EACH COORDINATE
    for(coordinate in trailState){
        if(trailState[coordinate] != "x" && trailState[coordinate] != "y"){
            ctx.fillRect(trailState[coordinate][0], trailState[coordinate][1], 5, 5);
        }
    }
}

function checkTrailCollision(){
 //Creating the variables for simplicity
 let headX = player.midX();
 let headY = player.y;

 // If the current player coordinate matches a key (it looks like "x y") on trailState - end the game (because the player ran into the trail)
 
 // Turned our current players coordinates into a string that might match a key on trailState
 let strCoord = `${headX} ${headY}`;

 // Then we can check to see if that exists within trailState
 if(trailState[strCoord]){
     return alert('Game Over');
 }

 /*if (headX == trailState[coordinate].x || headY == trailState[coordinate].y){
     return alert ('Game Over');
 } */

 //The for loop starts from 1 because the head is index 0
 //and you don't want to check if the head collides with itself
 /* for (let i = 1; i < this.trailState.length; ++i) {
     //Another variables for simplicity
     let currentX = this.trailState[i].x;
     let currentY = this.trailState[i].y;

     if (headX === currentX && headY === currentY) {
           
         //The head collides with the current body part
         return alert('Game Over');
     }
 } */
 //If the function reaches here then 
 //the head does not collide with any of the other parts
 return false;
    

}

// defining functions to handle key up & down
function keyDownHandler(t){
     rightPressed = false;
     leftPressed = false;
     upPressed = false;
     downPressed = false;

     function isConflict(){

     }

    if(t.key == "Right" || t.key == "ArrowRight" && isConflict()){
        rightPressed = true 
        player.orientation = 'right'
    } else if(t.key == "Left" || t.key == "ArrowLeft"){
        leftPressed = true;
        player.orientation = 'left'
    } else if(t.key == "Up" || t.key == "ArrowUp"){
        upPressed = true;
        player.orientation = 'up'
    } else if(t.key == "Down" || t.key == "ArrowDown"){
        downPressed = true;
        player.orientation = 'down'
    }
    player.img.src = `./assets/tronredbike${player.orientation}.png`

}


// create our character/Bikerider
function drawChar(){
    
    ctx.drawImage(player.img, player.x, player.y, player.height, player.width); 
    
}


function change_direction(event) {
    let LEFT_KEY = leftPressed;
    let RIGHT_KEY = rightPressed;
    let UP_KEY = upPressed;
    let DOWN_KEY = downPressed;
    
    // Horizontal velocity
    let dx = 10;
    // Vertical velocity
    let dy = 0;
    
    
  // Prevent the rider from reversing
  
    if (changing_direction) return;
    changing_direction = true;
    let keyPressed = event;
    let goingUp = dy === -10;
    let goingDown = dy === 10;
    let goingRight = dx === 10;
    let goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
  }

let isCharMoving = false
function moveChar(){
    if(rightPressed){
        player.x += 4;
        isCharMoving= true;
    } else if(leftPressed){
        player.x -= 4;
        isCharMoving = true;
    } else if(upPressed){
        player.y -= 4;
        isCharMoving = true;
    } else if(downPressed){
        player.y += 4;
        isCharMoving = true;
    }
}




function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    moveChar();
    change_direction();
    has_game_ended();
    drawChar();
    if(isCharMoving){
        checkTrailCollision();
    }
    trail();
}

setInterval(draw, 30)