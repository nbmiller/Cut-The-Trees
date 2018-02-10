var answerKey = new Array();
var playerS = new Array();


/*
** Load the previously Stored Size From Session Storage
**/
function getLocalFile(){
  if(typeof(Storage) !== "undefined" && (!isNaN(Number(sessionStorage.tSize)))){
    var number = Number(sessionStorage.tSize);
    // number = floor(number);
  }

   else{

    number = 6;
  }
  addTable(number);
}

/*
** Save the requested Size to Session Storage and Refresh Page
**/
function changeSize(){
  var tsize = document.getElementById("size");
  var oldTable = document.getElementById("table");

  reset();
  if(isNaN(Number(tsize.value)) || isFloat(Number(tsize.value))){
      alert('Entered value is not an integer, resetting to size 12.');
  }
  else{
    // var thisNum = floor(Number(tsize.value));
    if(typeof(Storage) !== "undefined") {
             sessionStorage.tSize = tsize.value;//thisNum.toString();
           }
  }

  //refresh page
  location.reload();
}

/*
** Checks if Float
** Returns Boolean
**/
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

/*
** Randomly populate Answer Array with either 0 or 1
**/
function createPuzzle(tsize){
  for(var a=0; a< tsize * tsize;a++){
    answerKey[a]= Math.floor(Math.random() * 2);
  }
}

/*
** Returns a String of the numbers in the Row given in Parameters
**/
function getRow(rowNum, tsize){
  var count = 0;
  var countString= "";
  var tsize = tsize;

  for(var r=0;r< tsize;r++){
    if(r === rowNum){
      for(var c=0;c< tsize;c++){
        if(answerKey[r * tsize + c] ===1){
          count++;
        }
        else if (c !== 0 && count !==0 ) {
          countString = countString + count.toString() + " " ;
          count = 0;
        }
        if (c === tsize-1 && count !==0 ){
          countString = countString + count.toString() + " " ;
          count = 0;
        }
      }
    }

  }
  return countString;
}

/*
** Returns a String of the numbers in the column given in Parameters
**/
function getCol(colNum, tsize){
  var count = 0;
  var countString= "";
  var tsize = tsize;

  for(var r=0;r< tsize;r++){

      for(var c=0;c< tsize;c++){
        if(c === colNum){
          if(answerKey[r * tsize + c] ===1){
            count++;
          }
          else if (r !== 0 && count !==0 ) {
            countString = countString + count.toString() + "<BR/>";
            count = 0;
          }
          if (r === tsize -1 && count !==0 ){
            countString = countString + count.toString() + "<BR/>";
            count = 0;
          }
      }
    }

  }
  //alert(countString);
  return countString;
}

/*
** Creates the table of a size given in Parameters
**/
function addTable(tsize) {
    createPuzzle(tsize);
    var boxID = 0;
    var table;
    var game = document.getElementById("myGame");


      table = document.createElement('TABLE');
      table.border='1';
      table.id = "table";


    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var header = table.createTHead();
    var row = header.insertRow(0);

    //create top row
    for (var i=0; i<tsize +1; i++){
      var cell = row.insertCell(-1);
      cell.width = '50';

      if(i !==0){
      cell.setAttribute('style', 'text-align:center;');
      cell.innerHTML = "<b>"+ getCol(i-1, tsize)+"</b>";
  }
    }

    for (var i=0; i< tsize; i++){
       var tr = document.createElement('TR');

       tableBody.appendChild(tr);
       //add leftmost cell
       var cell2 = tr.insertCell(0);
       cell2.height = '50';
       cell2.innerHTML = "<b>"+ getRow(i, tsize)+"</b>";

       for (var j=0; j< tsize; j++){
           var td = document.createElement('TD');
           td.width='50';
           td.height='50';


           var btn = document.createElement('input');
             btn.type = "button";
           btn.className = "btn";
           btn.id = boxID;
           btn.style="width:100%;height:100%";
           btn.onclick = function() {toggleButton(event, tsize)};

          btn.style.background = "url('tree25.png')";
          btn.style.backgroundSize = "50px 50px";
          btn.style.backgroundPosition = "center";

          td.appendChild(btn);

          playerS[boxID] = 0;
          boxID++;

           tr.appendChild(td);
       }
    }
    game.appendChild(table);

}
/*
** Handle a button press and change its background image
**/
function toggleButton(event, tsize){
  event = event;
  var target = event.target;
  var idN = target.id;
  var thisBox = document.getElementById(idN);
  if(playerS[idN] == 0){
    playerS[idN] =1;
    thisBox.style.background = "url('tree-stump.png')";
    thisBox.style.backgroundSize = "50px 50px";
    thisBox.style.backgroundPosition = "center";
  }
  else {
    playerS[idN] =0;
    thisBox.style.background = "url('tree25.png')";
    thisBox.style.backgroundSize = "50px 50px";
    thisBox.style.backgroundPosition = "center";
  }
  var solution = checkAnswers(tsize);
  if(solution == true){
    alert("CONGRATULATIONS! You titan of industry, think of all the junk mail"+
    " fliers that will be printed because of you.");
  }
}

/*
** Reset player's answers and all images
**/
function reset(){
  for(var i=0;i<answerKey.length;i++){
    playerS[i]=0;
      var thisBox2 = document.getElementById(i);
      thisBox2.style.background = "url('tree25.png')";
      thisBox2.style.backgroundSize = "50px 50px";
      thisBox2.style.backgroundPosition = "center";
      //thisBox2.style.backgroundColor= "#ff0000";

      }
}

/*
** Reveal answer key by changing background colors
**/
function showAnswers(){
  for(var i=0;i<answerKey.length;i++){
    if(answerKey[i]===1){
      var thisBox2 = document.getElementById(i);
      if(playerS[i] !== 1){
        thisBox2.style.backgroundColor= "#ff0000";

      }
      else
      thisBox2.style.backgroundColor= "#00ff00";
    }
  }

}

/*
** Check if player array matches answer key array
**/
function checkAnswers(tsize){
    for(var i=0;i< tsize;i++){
      for(var j=0;j< tsize;j++){
        if(playerS[i* tsize+j]!== answerKey[i* tsize+j]){
          return false;
        }
      }
    }
    return true;
}
