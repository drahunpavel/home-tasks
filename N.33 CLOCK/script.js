    var clockSize = 210; //размер clockDisplay - циферблата
    var сircleSize= clockSize/6;//размер digitsCircle - окружности под цифрой 
    var hourWidth = clockSize / 21;//размер часовой стрелки
    var minWidth = hourWidth / 2;//размер минуткой стрелки
    var secWidth = 1;//размер секундой стрелки
    var secTop = clockSize * 0.04762;//шаг секундной стрелки

function createClock() {
    var divClock = document.getElementById("clock");

    // описание циферблата
    var clockDisplay = document.createElement("div");
    clockDisplay.style.position = "relative";
    clockDisplay.style.borderRadius = "50%";
    clockDisplay.style.backgroundColor = "#fccb66";
    clockDisplay.style.border = "solid 1px" + "#fccb66";
    clockDisplay.style.width = clockSize + "px";
    clockDisplay.style.height = clockSize + "px";
    divClock.appendChild(clockDisplay);

    //цифровые часы
    var digitalClock = document.createElement("p");
    digitalClock.id = 'digitalClock';
    digitalClock.style.fontSize = clockSize / 10 + "px";
    digitalClock.style.marginTop = clockSize * 0.25 + "px";
    digitalClock.style.textAlign = "center";
    digitalClock.style.color = "#000";
    //digitalClock.innerHTML="44:44:44";
    clockDisplay.appendChild(digitalClock);

    // цифры на табло, разметка
    var numberOfDisplay = document.createElement("div");
    numberOfDisplay.style.position = "absolute";
    numberOfDisplay.style.height = "80%";
    numberOfDisplay.style.listStyle = "none";
    numberOfDisplay.style.top = 0;
    numberOfDisplay.style.left = clockSize / 2 - сircleSize/1.3 + "px";
    clockDisplay.appendChild(numberOfDisplay);

//формирование цифр
  for (var i = 0; i < 12; i++) {
    var digitsOnTheDisplay = document.createElement("div");
    digitsOnTheDisplay.id = 'digitsOnTheDisplay';
    digitsOnTheDisplay.style.position = "absolute";
    digitsOnTheDisplay.style.textAlign = "center";
    digitsOnTheDisplay.style.height = clockSize + "px";
    digitsOnTheDisplay.style.fontSize = clockSize / 12 + "px";
    digitsOnTheDisplay.style.fontStyle = "arial";
    digitsOnTheDisplay.style.transform = "rotate(" + 360 / 12 * (i + 1) + "deg)";
    numberOfDisplay.appendChild(digitsOnTheDisplay);
 
    //цифровые окружности
    var digitsCircle = document.createElement("div");
    digitsCircle.style.borderRadius = "50%";
    digitsCircle.style.margin = "10px";
    digitsCircle.style.backgroundColor = "#46b483";
    digitsCircle.style.width = сircleSize + "px";
    digitsCircle.style.height = сircleSize + "px";
    digitsCircle.style.transform = "rotate(" + -360 / 12 * (i + 1) + "deg)";
    digitsOnTheDisplay.appendChild(digitsCircle);
    
    //выводим цифр на табло
   var numTop = document.createElement("div");
    numTop.style.width = "100%";
    numTop.style.position = "absolute";
    numTop.style.textAlign = "center";
    numTop.style.paddingTop = сircleSize / 5 + "px";
    numTop.innerHTML = i + 1;
    digitsCircle.appendChild(numTop);

}
    //часовая стрелка
    var hour = document.createElement("div");
    var hourTop = clockSize * 0.25 - (hourWidth * 0.5);
    var hourleft = clockSize * 0.5 - (hourWidth * 0.5);
    hour.id = 'hourHand';
    hour.style.width = hourWidth + "px";
    hour.style.height = hourWidth * 6 + "px";
    hour.style.position = "absolute";
    hour.style.left = hourleft + "px";
    hour.style.top = hourTop + "px";
    hour.style.borderRadius = hourWidth + "px";
    hour.style.backgroundColor = "black";
    hour.style.transformOrigin = "55% 90%";
    clockDisplay.appendChild(hour);

    //минутная стрелка 
    var min = document.createElement("div");
    var minTop = clockSize * 0.1 - (minWidth * 0.5);
    var minleft = clockSize * 0.5 - (minWidth * 0.5);
    min.id = 'minHand';
    min.style.width = minWidth + "px";
    min.style.position = "absolute";
    min.style.border = "solid 0px transparent";
    min.style.left = minleft + "px";
    min.style.top = minTop + "px";
    min.style.borderTop = "solid " + (clockSize * 0.5 - minTop) + "px";
    min.style.borderBottomWidth = (clockSize * 0.5 - minTop) + "px";
    min.style.borderRadius = hourWidth + "px";
    clockDisplay.appendChild(min);

    //секундная стрелка 
    var sec = document.createElement("div");
    sec.id = 'secHand';
    sec.style.width = secWidth + "px";
    sec.style.height = secWidth + "px";
    sec.style.position = "absolute";
    sec.style.border = "solid 0px transparent";
    sec.style.left = (clockSize * 0.5 - secWidth) + "px";
    sec.style.top = secTop + "px";
    sec.style.borderTop = "solid " + (clockSize * 0.5 - secTop) + "px " + "#000";
    sec.style.borderBottomWidth = (clockSize * 0.5 - secTop) + "px";
    sec.style.borderRadius = 2 + "px";
    clockDisplay.appendChild(sec);
};


createClock();