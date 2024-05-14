
let turn = 1;
let isrun =true;

const ids = [
  ['b1','b2','b3'],
  ['b4','b5','b6'],
  ['b7','b8','b9'],
];

const Firstmark = '○';
const Secondmark = '×';

function $(id){
  return document.getElementById(id);
}

function reset() {
  location.reload();
}

document.getElementById('reset').addEventListener('click', reset);

function changedisplaymessage(){
  if(isFirstMove()){
    $('display-message').innerHTML = Firstmark +'の番';
  } else {
    $('display-message').innerHTML = Secondmark +'の番';
  }
}

function isFirstMove(){
  let isFirst = turn % 2;
  return isFirst == 1;
}

function clickAction(event){
  if(!isrun){
    return;
  }
  let id = event.target.id;
  let object = $(id);
  if(object.value !==''){
    return;
  }

  if(isFirstMove()){
    object.value =Firstmark;
  } else {
    object.value = Secondmark;  
  }

  if (judgeEnd()){
    return;
  }                                 

  turn = turn +1;

  changedisplaymessage();
}


function onloadAction(){
  for(let row=0; row<3; row++){
    for(let col=0; col<3; col++){
      $(ids[row][col]).onclick = clickAction;
    }
  }
}

function judgeEnd(){

  let isEnd = false;

  for(let row=0; row<3; row++){ 
    isEnd = isWin(ids[row][0], ids[row][1], ids[row][2]);
    if (isEnd){
      displayresult($(ids[row][0]).value +'の勝利');
      return true;
    }
  }
  for(let col=0; col<3; col++){
    isEnd = isWin(ids[0][col], ids[1][col], ids[2][col]);
    if (isEnd){
      displayresult($(ids[0][col]).value +'の勝利');
      return true;
    }
  }

  isEnd = isWin(ids[0][0], ids[1][1], ids[2][2]);
  if (isEnd){
    displayresult($(ids[0][0]).value + 'の勝利');
    return true;
  }

  isEnd = isWin(ids[0][2], ids[1][1], ids[2][0]);
  if (isEnd){
    displayresult($(ids[0][2]).value + 'の勝利');
    return true;
  }

  if(turn == 9){
    displayresult('引き分け')
    return true;
  }
  
  return false;
}

function isWin(Firstid,Secondid,Thirdid){
  if($(Firstid).value ==''){
    return false;
  }
  if($(Secondid).value ==''){
    return false;
  }
  if($(Thirdid).value ==''){
    return false;
  }
  if(($(Firstid).value == $(Secondid).value) && ($(Secondid).value == $(Thirdid).value)){
    return true;
  }
}

function displayresult(message){
  $('result-message').innerHTML = message;
  isrun = false;
}
window.onload = onloadAction;