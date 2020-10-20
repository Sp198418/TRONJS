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
    y: canvas.width/2 - 15

}

let trailState = {
    x: null,
    y: null
}

player.img = new Image();
player.img.src = './assets/tronredbikeup.png'; //Bike image that will move 

// Checking for collision
function has_game_ended()

{  
  for (let i = 4; i < player.length; i++)
  {    
      console.log("checking...")
    let has_collided = player[i] === player[0] && player[i] === player[0]
    if (has_collided) 
      return alert('Gameover')
}
  let hitLeftWall = player.x < 0;  
  let hitRightWall = player.x >= canvas.width - 35;
  let hitToptWall = player.y <= 0;
  let hitBottomWall = player.y >= canvas.height - 35;
    const onGameOver = () => {
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
      console.log('here we are')
    if(trailState.x !== player.x || trailState.y !== player.y){
        ctx.fillStyle = 'green';
        ctx.fillRect(trailState.x, trailState.y, 5, 5);

        // SAVING UNIQUE COORDINATE OF PLAYER
        trailState[`${player.x} ${player.y}`] = [player.x, player.y];

        // SAVING LAST PLAYER STATE
        trailState.x = player.x;
        trailState.y = player.y;
    }
    // DRAW EACH COORDINATE
    for(coordinate in trailState){
        if(trailState[coordinate] != "x" && trailState[coordinate] != "y"){
            ctx.fillRect(trailState[coordinate][0], trailState[coordinate][1], 5, 5);
        }
    }
}

function checkTrailCollision(){

}

// defining functions to handle key up & down
function keyDownHandler(t){
     rightPressed = false;
     leftPressed = false;
     upPressed = false;
     downPressed = false;

    if(t.key == "Right" || t.key == "ArrowRight"){
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

function moveChar(){

    if(rightPressed){
        player.x += 4;
    } else if(leftPressed){
        player.x -= 4;
    } else if(upPressed){
        player.y -= 4;
    } else if(downPressed){
        player.y += 4;
    }
}




function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    moveChar();
    has_game_ended();
    drawChar();
    trail();
    // ctx.fillStyle = 'green';
    // ctx.fillRect(20, 20, 5, 5);
}

setInterval(draw, 30)
  