
function drawBall() {//отрисовка мяча
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI*2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}
function drawPaddle() {//отрисовка ракетки
  context.beginPath();
  context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}





function drawBricks() {//отрисовка блоков
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = "#50A337";
        //console.log(context.fillStyle);
        context.fill();
        context.closePath();
      }
      if(bricks[c][r].status == 2) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = "#787204";
        //console.log(context.fillStyle);
        context.fill();
        context.closePath();
      }
      if(bricks[c][r].status == 3) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = "#801012";
        //console.log(context.fillStyle);
        context.fill();
        context.closePath();
      }
    }
  }
}


function drawScore() {//отрисовка счета
  context.font = "16px Arial";
  context.fillStyle = "#0095DD";
  context.fillText("Points: "+score, 8, 20);
}
function drawLives() {//отрисовка жизни
  context.font = "16px Arial";
  context.fillStyle = "#0095DD";
  context.fillText("Lives: "+lives, canvas.width-65, 20);
}
