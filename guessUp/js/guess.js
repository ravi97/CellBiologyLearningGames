window.onload = function() {
  // import{categories, imglist, hints} from 'game_data.json'
  var categories = window.categories;
  var imglist = window.imglist;
  var hints = window.hints;
  var alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  /*
  var hints = [
      [
        "Power house of the cell",
        "Brain of a cell",
        "Basic unit of life in organisms of the kingdom plantae",
        "Brain of a cell",
        "Power house of the cell",
        "Basic unit of life in organisms of the kingdom plantae",
        "Basic unit of life in organisms of the kingdom plantae"
      ],
      ["Basic unit of life in organisms of the kingdom animalia", "Infects a host cell", "Basic unit of life in organisms of the kingdom animalia",
       "Infects a host cell", "Basic unit of life in organisms of the kingdom animalia"],
      ["unicellular organism which has the ability to alter its shape", "genus of unicellular ciliates, commonly studied as a representative of the ciliate group", 
      "unicellular organism which has the ability to alter its shape", "genus of unicellular ciliates, commonly studied as a representative of the ciliate group", "unicellular organism which has the ability to alter its shape"]
    ];
  var categories = [
      [
        "mitochondria",
        "nucleus",
        "plant-cell",
        "nucleus",
        "mitochondria",
        "plant-cell",
        "plant-cell"
      ],
      ["animal-cell", "virus", "animal-cell", "virus", "animal-cell"],
      ["amoeba", "paramecium", "amoeba", "paramecium", "amoeba"]
    ];

  var imglist = [
      [
        "mitochondria",
        "nucleus",
        "plantcell",
        "nucleus",
        "mitochondria",
        "plantcell",
        "plantcell"
      ],
      ["animal", "virus", "animal", "virus", "animal"],
      ["amoeba", "paramecium", "amoeba", "paramecium", "amoeba"]
    ];
  */

  var categories; // Array of topics
  var chosenCategory; // Selected catagory
  var getHint; // Word getHint
  var word; // Selected word
  var guess; // Geuss
  var geusses = []; // Stored geusses
  var lives; // Lives
  var counter; // Count correct geusses
  var space; // Number of spaces in word '-'

  var imglist; // Array of images

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  var image = document.getElementById("imageguess");

  // create alphabet ul
  var buttons = function() {
    myButtons = document.getElementById("buttons");
    letters = document.createElement("ul");

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };

  // Select Catagory
  var selectCat = function() {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is a Plant Category";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is a Animal or Virus";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Unicellular";
    }
  };

  // Create geusses ul
  result = function() {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // Show lives
  comments = function() {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
      for (var i = letters.children.length - 1; i >= 0; i--) {
        letters.children[i].onclick = null;
        letters.children[i].setAttribute("class", "active");
      }
      hint.onclick = null;
    }
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
        for (var i = letters.children.length - 1; i >= 0; i--) {
        letters.children[i].onclick = null;
        letters.children[i].setAttribute("class", "active");
      }
      hint.onclick = null;
    }
  };

  // Animate man
  var animate = function() {
    var drawMe = lives;
    drawArray[drawMe]();
  };

  // Hangman
  canvas = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  frame1 = function() {
    draw(0, 150, 150, 150);
  };

  frame2 = function() {
    draw(10, 0, 10, 600);
  };

  frame3 = function() {
    draw(0, 5, 70, 5);
  };

  frame4 = function() {
    draw(60, 5, 60, 15);
  };

  torso = function() {
    draw(60, 36, 60, 70);
  };

  rightArm = function() {
    draw(60, 46, 100, 50);
  };
  leftArm = function() {
    draw(60, 46, 20, 50);
  };

  rightLeg = function() {
    draw(60, 70, 100, 100);
  };

  leftLeg = function() {
    draw(60, 70, 20, 100);
  };

  drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    torso,
    head,
    frame4,
    frame3,
    frame2,
    frame1
  ];

  // OnClick Function
  check = function() {
    list.onclick = function() {
      var geuss = this.innerHTML;
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = word.indexOf(geuss);
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    };
  };

  // Hint

  var hintFunc = function() {
    /*
    hints = [
      [
        "Power house of the cell",
        "Brain of a cell",
        "Basic unit of life in organisms of the kingdom plantae",
        "Brain of a cell",
        "Power house of the cell",
        "Basic unit of life in organisms of the kingdom plantae",
        "Basic unit of life in organisms of the kingdom plantae"
      ],
      ["Basic unit of life in organisms of the kingdom animalia", "Infects a host cell", "Basic unit of life in organisms of the kingdom animalia",
       "Infects a host cell", "Basic unit of life in organisms of the kingdom animalia"],
      ["unicellular organism which has the ability to alter its shape", "genus of unicellular ciliates, commonly studied as a representative of the ciliate group", 
      "unicellular organism which has the ability to alter its shape", "genus of unicellular ciliates, commonly studied as a representative of the ciliate group", "unicellular organism which has the ability to alter its shape"]
    ];
    */

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    //showClue.innerHTML = "Clue: - " + hints[catagoryIndex][hintIndex];
    swal(hints[catagoryIndex][hintIndex])
  };


  // Play
  play = function() {
    /*
    categories = [
      [
        "mitochondria",
        "nucleus",
        "plant-cell",
        "nucleus",
        "mitochondria",
        "plant-cell",
        "plant-cell"
      ],
      ["animal-cell", "virus", "animal-cell", "virus", "animal-cell"],
      ["amoeba", "paramecium", "amoeba", "paramecium", "amoeba"]
    ];

    imglist = [
      [
        "mitochondria",
        "nucleus",
        "plantcell",
        "nucleus",
        "mitochondria",
        "plantcell",
        "plantcell"
      ],
      ["animal", "virus", "animal", "virus", "animal"],
      ["amoeba", "paramecium", "amoeba", "paramecium", "amoeba"]
    ];
    */

    var a = Math.floor(Math.random() * categories.length);
    chosenCategory = categories[a];
    var b = Math.floor(Math.random() * chosenCategory.length);
    word = chosenCategory[b];

    image.src = "assets/" + imglist[a][b] + ".jpg";

    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();
    hint.onclick = hintFunc;

    geusses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  };

  play();


  // Reset

  document.getElementById("reset").onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    //showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  };
};
