let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

// NEW
let history = "";

const screen = document.querySelector(".screen");
const historyScreen = document.querySelector(".history");

const clickSound = new Audio("assets/sounds/click.mp3");
clickSound.preload = "auto";
clickSound.load();

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function buttonClick(value){
  playClick();

  if(isNaN(value)){
    handleSymbol(value);
  } else{
    handleNumber(value);
  }

  screen.innerText = buffer;
  historyScreen.innerText = history;
}

function handleSymbol(symbol){
  switch(symbol){
    case 'C':
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      history = "";
      break;
    case '=':
      if(previousOperator === null){
        return;
      }

      history += " " + buffer;

      flushOperation(parseFloat(buffer));

      previousOperator = null;
      buffer = runningTotal.toString();

      history = "";

      runningTotal = 0;
      break;
    case '←':
      if(buffer.length===1){
        buffer="0";
      }else{
        buffer=buffer.substring(0,buffer.length-1);
      }
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      handleMath(symbol);
      break;

      case '.':
    handleDecimal();
    break;

    case '±':
    handlePlusMinus();
    break;
  }
}

 

function handleMath(symbol){
  if(buffer === "0"){
    return;
  }

const intBuffer = parseFloat(buffer);

  if(runningTotal === 0){
    runningTotal = intBuffer;
  } else{
    flushOperation(intBuffer);
  }

  previousOperator = symbol;

  history = runningTotal + " " + symbol;

  buffer = "0";
}

function flushOperation(intBuffer){
  if(previousOperator==='+'){
    runningTotal+=intBuffer;
  } else if(previousOperator==='-'){
    runningTotal-=intBuffer;
  } else if(previousOperator==='×'){
    runningTotal*=intBuffer;
  } else if(previousOperator==='÷'){
    runningTotal/=intBuffer;
  }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    } else if(buffer === "-0"){
        buffer = "-" + numberString;
    } else{
        buffer += numberString;
    }
}

function init(){
  document.querySelector('.calc-buttons').addEventListener('click',function(event){
    buttonClick(event.target.innerText);
  });
}

 function handleDecimal(){
    if(buffer.includes(".")){
        return;
    }

    buffer += ".";
}

function handlePlusMinus(){
    if(buffer === "0"){
        buffer = "-0";
        return;
    }

    if(buffer.startsWith("-")){
        buffer = buffer.substring(1);
    } else{
        buffer = "-" + buffer;
    }
}

init();