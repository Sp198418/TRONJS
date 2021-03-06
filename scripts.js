// Game wrap with click function

document.getElementById('startGame').addEventListener('click',function startGame(){


    //Removes image after click 
    let parent = document.getElementById('Parent')
    let child = document.getElementById('startGame')
    parent.removeChild(child)
    


let canvas = document.getElementById("Retro");
let ctx = canvas.getContext("2d");
// pause variable

let pause = false;
// define a char/bikerider
let player1 = { 
    orientation: 'left',
    height: 40,
    width: 40, 
    x: 750,
    y: 550,
    midX1: function(){
        return this.x + 17;
    },
    bttmY1: function(){
        return this.y + 38;
    }
}
let player2 = { 
    orientation: 'right',
    height: 40,
    width: 40, 
    x: 10,
    y: 10,
    midX2: function(){
        return this.x + 17;
    },
    bttmY2: function(){
        return this.y + 38;
    }
}
let trailState1 = {
    x: null,
    y: null
}

let trailState2 = {
    x: null,
    y: null
}

player1.img = new Image();
player1.img.src = './assets/tronredbikeleft.png'; //Bike image that will move 

player2.img = new Image();
player2.img.src = './assets/tronredbikeright.png';

// Checking for collision with walls
function has_game_ended(){


  let hitLeftWall = player1.x < 0;  
  let hitRightWall = player1.x >= canvas.width - 35;
  let hitToptWall = player1.y <= 0;
  let hitBottomWall = player1.y >= canvas.height - 35;
// checking player 2 wall collision
  let hitLeftWall2 = player2.x < 0;  
  let hitRightWall2 = player2.x >= canvas.width - 35;
  let hitToptWall2 = player2.y <= 0;
  let hitBottomWall2 = player2.y >= canvas.height - 35;



    let resetGame = () => {
        player1.x = 750
        player1.y = 550
        player2.x = 10
        player2.y = 10
        rightPressed1 = false;
        leftPressed1 = false;
        upPressed1 = false;
        downPressed1 = false;
        clearBoard();
        
    }


    if(hitLeftWall2 || hitRightWall2 || hitToptWall2 || hitBottomWall2){
        alert("Player 2 lost");
        window.location.reload(true);
    }

    if(hitLeftWall || hitRightWall || hitToptWall || hitBottomWall){
        alert("Player 1 lost")
        window.location.reload(true);
    }
}

// letting page know the buttons ARENT being pressed1 yet
let leftPressed2, rightPressed1, downPressed1, upPressed1, upPressed2, downPressed2 = false
let rightPressed2 = true;
let leftPressed1 = true;

document.onkeydown = keyDownHandler

//if player1 x and y moves draw trail

function trail() {
    /* Check x & y of player1 - if dif than trailState1 -> create a new rect using trailState1.x & y
      then update trailState1 */

    if(trailState1.x !== player1.midX1() || trailState1.y !== player1.bttmY1()){
        ctx.fillStyle = 'limegreen';
        

        // SAVING UNIQUE COORDINATE OF PLAYER
        trailState1[`${player1.midX1()} ${player1.bttmY1()}`] = [player1.midX1(), player1.bttmY1()];
    
        // SAVING WHERE PLAYER WAS LAST
        trailState1.x = player1.midX1();
        trailState1.y = player1.bttmY1();
    }
    // DRAW EACH COORDINATE
    for(coordinate in trailState1){
        if(trailState1[coordinate] != "x" && trailState1[coordinate] != "y"){
            ctx.fillRect(trailState1[coordinate][0], trailState1[coordinate][1] - 20, 5, 5);
        }
    }

    if(trailState2.x !== player2.midX2() || trailState2.y !== player2.bttmY2()){
        ctx.fillStyle = 'red';
        

        // SAVING UNIQUE COORDINATE OF PLAYER2
        trailState2[`${player2.midX2()} ${player2.bttmY2()}`] = [player2.midX2(), player2.bttmY2()];

        // SAVING LAST PLAYER2 STATE
        trailState2.x = player2.midX2();
        trailState2.y = player2.bttmY2();
    }
    // DRAW EACH COORDINATE
    for(coordinate in trailState2){
        if(trailState2[coordinate] != "x" && trailState2[coordinate] != "y"){
            ctx.fillRect(trailState2[coordinate][0], trailState2[coordinate][1] - 20, 5, 5);
        }
    }
}


function checkTrailCollision(){
 //Creating the variables for simplicity
 let headX1 = player1.midX1();
 let headY1 = player1.bttmY1();

 let headX2 = player2.midX2();
 let headY2 = player2.bttmY2();

 // If the current player1 coordinate matches a key (it looks like "x y") on trailState1 - end the game (because the player1 ran into the trail)
 
 // Turned our current player1s coordinates into a string that might match a key on trailState1
 let strCoord1 = `${headX1} ${headY1}`;
 let strCoord2 = `${headX2} ${headY2}`;

 if(trailState1[strCoord1]){
    alert('Player 1 Lost!');
    window.location.reload(true);
    return
 }

 if(trailState1[strCoord2]){
    alert('Player 2 Lost!');
    window.location.reload(true);
    return
 }

 if(trailState2[strCoord1]){
    alert('Player 1 Lost!');
    window.location.reload(true);
    return
 }

 if (trailState2[strCoord2]){
    alert('Player 2 Lost!')
    window.location.reload(true);
    return
 }


}

// defining functions to handle key up & down
function keyDownHandler(t){
    
    if(t.key == "Right" || t.key == "ArrowRight" && !leftPressed1){
        rightPressed1 = true;
        downPressed1 = false;
        upPressed1 = false;
        player1.orientation = 'right'
    } else if(t.key == "Left" || t.key == "ArrowLeft" && !rightPressed1){
        leftPressed1 = true;
        downPressed1 = false;
        upPressed1 = false;
        player1.orientation = 'left'
    } else if(t.key == "Up" || t.key == "ArrowUp" && !downPressed1){
        upPressed1 = true;
        leftPressed1 = false;
        rightPressed1 = false;
        player1.orientation = 'up'
    } else if(t.key == "Down" || t.key == "ArrowDown" && !upPressed1){
        downPressed1 = true;
        leftPressed1 = false;
        rightPressed1 = false;
        player1.orientation = 'down'
    }
// Pause the game
    if(t.key.toLowerCase() == ' '){
        pause = !pause; 
    }

    player1.img.src = `./assets/tronredbike${player1.orientation}.png`
// player 2 key downhandler
    if( t.key == "d" && !leftPressed2){
        rightPressed2 = true;
        downPressed2 = false;
        upPressed2 = false;
        player2.orientation = 'right'
    } else if(t.key == "a" && !rightPressed2){
        leftPressed2 = true;
        downPressed2 = false;
        upPressed2 = false;
        player2.orientation = 'left'
    } else if(t.key == "w" && !downPressed2){
        upPressed2 = true;
        leftPressed2 = false;
        rightPressed2 = false;
        player2.orientation = 'up'
    } else if(t.key == "s" && !upPressed2){
        downPressed2 = true;
        leftPressed2 = false;
        rightPressed2 = false;
        player2.orientation = 'down'
    }
    player2.img.src = `./assets/tronredbike${player2.orientation}.png`
}

// create our character/Bikerider
function drawChar(){
    ctx.drawImage(player1.img, player1.x, player1.y, player1.height, player1.width); 
    ctx.drawImage(player2.img, player2.x, player2.y, player2.height, player2.width);
}
// Movement for player 1
let isCharMoving = false;
function moveChar(){
    if(rightPressed1){
        player1.x += 4;
        isCharMoving= true;
    } else if(leftPressed1){
        player1.x -= 4;
        isCharMoving = true;
    } else if(upPressed1){
        player1.y -= 4;
        isCharMoving = true;
    } else if(downPressed1){
        player1.y += 4;
        isCharMoving = true;
    }
}
// Movement for player2
let isCharMoving2 = false;
function moveChar2(){
    if(rightPressed2){
        player2.x += 4;
        isCharMoving2 = true;
    } else if(leftPressed2){
        player2.x -= 4;
        isCharMoving2 = true;
    } else if(upPressed2){
        player2.y -= 4;
        isCharMoving2 = true;
    } else if(downPressed2){
        player2.y += 4;
        isCharMoving2 = true;
    } 
}
// Clears the canvas at the start of each frame in an animation
function clearBoard(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    if(pause){
        return
    }
    clearBoard();
    trail();
    drawChar();
    moveChar();
    moveChar2();
    has_game_ended();
    checkTrailCollision();
}

setInterval(draw, 30)
})
// startGame();