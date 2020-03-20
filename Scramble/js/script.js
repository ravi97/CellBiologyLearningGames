//var iframe = document.getElementById("mainSandboxGuts");
//var iframe2=document.getElementByClassname('mainSandboxGuts')[0];
//console.log(iframe);
//console.log(iframe2);

//iframe.addEventListener("load",function(){
//window.frames[0].document.body.style.height="100% !important";
//  window.frames[0].document.body.style.height(100);

//})

var levelEasy = {
  ribosomes: "Non-membrane bound structures which make proteins",
  lysosome: "Fluid-filled bags containing digestive chemicals",
  chloroplast: "Energy producing organelle found in all plant cells",
  chlorophyll: "Green pigment which gives plants their color",
  vacuole: "Storage bubbles within a cell which may contain water, nutrients, or waste",
  tissue: "Different types of cells performing specialized functions",
  organs: "Two or more different types of tissue working together"
};
var levelMedium = {
  phospholipid: "A bilayer that makes up the plasma membrane",
  cytosol: "Gel-like fluid that fills the cell and holds organelles in place",
  cytosckeleton: "A network of microtubules that support the cell's shape",
  microtubules: "Make up the cytosckeleton",
  organelles: "Little organs",
  nucleus: "A spherical membrane-bound organelle that holds the cell's DNA",
  nucleolus: "Dense, protein-rish region in the nucleus"
};
var levelHard = {
  mitochondria: "The powerhouse of the cell",
  prokaryotic: "Cells with no membrane-bound organelles",
  eukaryotic: "Cells with membrane-bound organelles",
  flagella: "A tail that whips back and forth for movement",
  pili: "Help prokaryotic cells hold onto surfaces",
  cytoplasm: "A cell's fluids",
  hydrophilic: "Water loving",
  hydrophobic: "Water fearing"
};
var level;
var wordbank;
var rndNum;
var word;
var originalHTML = document.getElementById("squares").innerHTML
var score = 0;

String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;
  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
} //shuffle function

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}//get Random int

function reSetSquares() {
  document.getElementById("squares").innerHTML = originalHTML;
}

function chooseLevel(lvl) {
  level = lvl
  wordbank = Object.keys(level);
  rndNum = getRandomInt(0, wordbank.length - 1);
  word = wordbank[rndNum];
  reSetSquares();
  // play();
}//chooseLevel

function play() {
  if (level != levelMedium && level != levelHard) {
    chooseLevel(levelEasy);
  }
  reSetSquares();
  var rstring = word.shuffle();
  for (var i = 1; i < word.length + 1; i++) {
    document.getElementById("squares").innerHTML += '<td id="' + i + '" class ="ui-sortable-handle"></td>'
  }
  for (var i = 0; i < word.length; i++) {
    document.getElementById(i + 1).innerHTML = rstring.charAt(i);
  }
} //play function

// document.getElementById("squares").onclick = function(){
//   if (level != levelMedium || level != levelHard){
//     chooseLevel(levelEasy);
//   } else {
//       reSetSquares();
//       play()
//   }
// }

document.getElementById("next").onclick = function () {
  reSetSquares();
  rndNum = getRandomInt(0, wordbank.length - 1);
  word = wordbank[rndNum];
  play();
} //next function

document.getElementById("levels").onclick = function () {
  swal({
    title: 'Please Select Difficulty Level',
    html: "<br>" +
      '<button id="buttonEasy" class="button btn-lg" style="margin: 0 5px">EASY</button>' +
      '<button id="buttonMedium" class="button btn-lg" style="margin: 0 5px">MEDIUM</button>' +
      '<button id="buttonHard" class="button btn-lg" style="margin: 0 5px">HARD</button>',
    showCancelButton: false,
    showConfirmButton: false
  })//swal
  document.getElementById("buttonEasy").onclick = function () {
    chooseLevel(levelEasy)
    swal.clickConfirm();
  }//buttonEasy
  document.getElementById("buttonMedium").onclick = function () {
    chooseLevel(levelMedium);
    swal.clickConfirm();
  }//buttonMedium
  document.getElementById("buttonHard").onclick = function () {
    chooseLevel(levelHard)
    swal.clickConfirm();
  }//buttonHard

} //levels

document.getElementById("hint").onclick = function () {
  swal(level[word]);
}
$('#board tr').sortable({
  placeholder: '#board tr',
  update: function checkOrder(event, ui) {
    var tiles = $('td');
    var tempWord = '';
    for (var i = 0; i < tiles.length; i++) {
      var letter = $(tiles[i]).text();
      tempWord += letter;
    }
    if (tempWord === word) {
      swal("Correct!", "You guessed the word!", "success");
      $('ul').append('<li>' + word + '</li>');
      score++
      $('#score').text(score);
    } //tempword
  }//function check order
}); //sortable
