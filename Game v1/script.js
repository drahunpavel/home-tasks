
//var waitingForEnter = false;
console.log(document.documentElement.clientWidth);
console.log(document.documentElement.clientHeight); 

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var factor=1;
canvas.width  = 480;
canvas.height = 320; 




//запускается каждый раз, когда заданное разрешение медиа запроса достигнуто

if(document.documentElement.clientWidth>1024 && document.documentElement.clientHeight<2600){
  canvas.width  = 1080;
  canvas.height = 720; 
  var factor=2;
  };
if(document.documentElement.clientWidth>1024 && document.documentElement.clientHeight<768){
canvas.width  = 720;
canvas.height = 480; 
var factor=1.5;
};/*
if(document.documentElement.clientWidth>768 && document.documentElement.clientHeight<480){
  canvas.width  = 480;
  canvas.height = 320; 
  var factor=1;
  };
if(document.documentElement.clientWidth>480 && document.documentElement.clientHeight<320){
  canvas.width  = 336;
  canvas.height = 224; 
  var factor=0.7;
  };
*/
var ballRadius = 5*factor;
var x = canvas.width/2;
var paddleHeight = 6*factor;//высота ракетки
var paddleWidth = 80*factor;//ширина ракетки
var y = canvas.height-paddleHeight-6;
var dx = 2.02;//изменение положения 2px/кадр
var dy = 2.02;//изменение положения


var paddleX = (canvas.width-paddleWidth)/2;//стартовое положение ракетки  на оси х
var rightPressed = false;//Значением по умолчанию для обоих является false, так как изначально кнопки не нажаты.
var leftPressed = false;
var brickRowCount = 9;//колво столбцов блоков
var brickColumnCount = 6;//колво строк блоков
var brickWidth = 28*factor;//ширина блока
var brickHeight = 6*factor;//высота блока
var brickPadding = 21*factor;//отступы блоков
var brickOffsetTop = 30*factor;//отступ сверху
var brickOffsetLeft = 30*factor;//отступы слева
var score = 0;//начальный счет
var lives = 3;//количество жизней
var point=0;//временная переменная


//генерация рандомного числа
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



//Вышеприведенный код будет прокручивать строки и столбцы и создавать новые кирпичи.
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    //bricks[c][r] = { x: 0, y: 0, status: 1 };
    bricks[c][r] = { x: 0, y: 0, status: getRandomInRange(1, 3) };
    //console.log(bricks[c][r]);
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
canvas.addEventListener('mousemove', touchMoveHandler, false );
canvas.addEventListener('touchstart', touchMoveHandler, false);
canvas.addEventListener('touchmove', touchMoveHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}


function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function touchMoveHandler(e) {
  if (e.client) {
    var posX = e.clientX;
  } else if (e.targetTouches) {
    posX = e.targetTouches[0].clientX-canvas.offsetLeft;
    if(posX > paddleWidth/2 && posX < canvas.width-paddleWidth/2) {
      paddleX = posX - paddleWidth/2;
    }
    e.preventDefault();
  }
}

//обнаружение касания
//Мы проверим, сталкивается ли центр мяча с любым из данных кирпичей
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      
      var b = bricks[c][r];

      if(b.status==3){
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          brickSound();
          window.navigator.vibrate(100);
          b.status = 2;
          score++;

          if(score % 10 == 0){ //увелечение скорости на+1 за каждые 10 очков
            console.log("speed up!");
            dx=dx*1.3;
            dy=dy*1.3;
            //console.log(" dx: "+ dx);
            //console.log(" dy: "+ dy);
          };
        }
      
      }

else if(b.status==2){
  if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
    dy = -dy;
    brickSound();
    window.navigator.vibrate(100);
    b.status = 1;
    score++;

    if(score % 10 == 0){ //увелечение скорости на+1 за каждые 10 очков
      console.log("speed up!");
      dx=dx*1.3;
      dy=dy*1.3;
      //console.log(" dx: "+ dx);
      //console.log(" dy: "+ dy);
    };
  }

}
      else if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          brickSound();
          window.navigator.vibrate(100);
          b.status = 0;
          score++;
          
          if(score % 10 == 0){ //увелечение скорости на+1 за каждые 10 очков
            console.log("speed up!");
            dx=dx*1.3;
            dy=dy*1.3;
            //console.log(" dx: "+ dx);
            //console.log(" dy: "+ dy);
          };

        }
      }





    }
  }


}















function draw() {//полная отрисовка
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(score == 150) {
    point=score;
    getInfoArray();
    alert("YOU WIN, CONGRATS!" );
    document.location.reload();
  }

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {//проверка мяча на соприкасание -лево\право
    
    dx = -dx;
    clickSound();
    window.navigator.vibrate(300);
  }
  if(y + dy < ballRadius) {//проверка мяча на соприкасание с верхней стеной 
    dy = -dy;
    clickSound();
    window.navigator.vibrate(300);
  }
  else if(y + dy > canvas.height-ballRadius-paddleHeight/3) {//проверка мяча на соприкасание с рокеткой
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      paddleSound();
    }
    else {
      lives--;//Теперь, когда мяч попадает в нижний край экрана, мы вычитаем одну жизнь из переменной жизни.
      if(!lives) {
        point=score;


        alert("GAME OVER");
        getInfoArray();
        //showarray();
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;

        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {//Если нажата стрелка влево, то ракетка будет двигаться на 7 пикселей влево, а если нажата стрелка вправо то
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}



var clickAudio=new Audio;
// результат canPlayType: "probably" - скорее всего, "maybe" - неизвестно, "" - нет
//console.log( clickAudio.canPlayType("audio/ogg; codecs=vorbis") );
//console.log( clickAudio.canPlayType("audio/mpeg") );
if ( clickAudio.canPlayType("audio/mpeg")=="probably" )
    clickAudio.src="http://www.wou.edu/~tbafarat06/1001%20Sound%20Effects/Horror%20Effects/Creature%20Footstep%2003.wav";

var paddleAudio= new Audio;
paddleAudio.src="http://www.tafelrunde.net/hlds/sound/ambience/3dm_bik_ball.wav";

var brickAudio= new Audio;
brickAudio.src="http://www.sounds.beachware.com/2illionzayp3may/nshzz/SHATTER.mp3";

    function clickSoundInit() {
      clickAudio.play(); // запускаем звук
      clickAudio.pause(); // и сразу останавливаем
  }

  function clickSound() {
      clickAudio.currentTime=0; // в секундах
      clickAudio.play();
  }

    function paddleSoundInit() {
      paddleAudio.play(); // запускаем звук
      paddleAudio.pause(); // и сразу останавливаем
    };
    function paddleSound() {
      paddleAudio.currentTime=0; // в секундах
      paddleAudio.play();
  }

  function brickSoundInit() {
    brickAudio.play(); // запускаем звук
    brickAudio.pause(); // и сразу останавливаем
  };
  function brickSound() {
    brickAudio.currentTime=0; // в секундах
    brickAudio.play();
}


function vibrate(val){
  if("vibrate" in navigator)  return navigator.vibrate(val);
  if("oVibrate" in navigator)  return navigator.oVibrate(val);
  if("mozVibrate" in navigator)  return navigator.mozVibrate(val);
  if("webkitVibrate" in navigator)  return navigator.webkitVibrate(val);
}


function GetUserIP(){
  var ret_ip;
  $.ajaxSetup({async: false});
  $.get('http://freegeoip.net/json/', function(r){ 
    ret_ip = r.ip; 
  });
  return ret_ip;
}
console.log(GetUserIP());



var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var array; // элемент массива - {name:'Иванов',mess:'Привет'};
var updatePassword;
var stringName='LOKAGES3333';
//message
// показывает все сообщения из array на страницу




function showarray() {
    for ( var m=0; m<array.length; m++ ) {
        var storeInfo=array[m];
        //alert("Ip: "+storeInfo.ip+"|"+"Points: "+storeInfo.points+"|"+"Lives: "+storeInfo.lives);
        //console.log(storeInfo);
    }
    //console.log(storeInfo);
    
}

// получает сообщения с сервера и потом показывает
function refresharray() {
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName },
            cache : false,
            success : readReady,
            error : errorHandler
        }
    );
}

function readReady(callresult) { // сообщения получены - показывает
    if ( callresult.error!=undefined )
        alert(callresult.error); 
    else {
        array=[];
        if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            array=JSON.parse(callresult.result); 
            // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_array?
            if ( !Array.isArray(array) )
                array=[];
        }
        //showarray();
    }
}

// получает сообщения с сервера, добавляет новое,
// показывает и сохраняет на сервере
function getInfoArray() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'LOCKGET', n : stringName,
                p : updatePassword },
            cache : false,
            success : lockGetReady,
            error : errorHandler
        }
    );
}

// сообщения получены, добавляет, показывает, сохраняет
function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
    else {
        array=[];
        if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            array=JSON.parse(callresult.result); 
            // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_array?
            if ( !Array.isArray(array) )
                array=[];
        }

        //var points=point;
        //var message=GetUserIP();

        array.push( { points:point, ip:GetUserIP(), lives:lives } );
        var str='';
        for(var k=0; k<array.length; k++) {
          //console.log(array[k]);
          array.sort(function (a, b) {
            if (a.points > b.points) {
              return 1;
            }
            if (a.points < b.points) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          });
          var InArr=array[k];
          //console.log(array);
          //console.log(array[k]);
          //console.log("Ip: "+array[k].ip+"|"+"Points: "+array[k].points+"|"+"Lives: "+array[k].lives);
          //alert(("Ip: "+array[k].ip+"|"+"Points: "+array[k].points+"|"+"Lives: "+array[k].lives));
          str+='\n'+"Ip: "+InArr.ip+" | "+"Points: "+InArr.points+" | "+"Lives: "+InArr.lives+'\n';
          //str+="Ip: "+array[k].ip+"|"+"Points: "+array[k].points+"|"+"Lives: "+array[k].lives;
          
        }
        //console.log("Ip: "+array[k].ip+"|"+"Points: "+array[k].points+"|"+"Lives: "+array[k].lives);
        alert("Лучшие результаты: "+'\n'+str+'\n');
        if ( array.length>10 )
            array=array.slice(array.length-10);

        //showarray();

        $.ajax( {
                url : ajaxHandlerScript,
                type : 'POST', dataType:'json',
                data : { f : 'UPDATE', n : stringName,
                    v : JSON.stringify(array), p : updatePassword },
                cache : false,
                success : updateReady,
                error : errorHandler
            }
        );
    }
}

// сообщения вместе с новым сохранены на сервере
function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

refresharray();



draw();





