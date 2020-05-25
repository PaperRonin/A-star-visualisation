let main = document.querySelector(".main");

let PaintColor = "none";
let endpoint, startPoint;
var inProgress = false;

Array.matrix = function(numrows, numcols, initial) {
  var arr = [];
  for (var i = 0; i < numrows; ++i) {
    var columns = [];
    for (var j = 0; j < numcols; ++j) {
      columns[j] = new Node(i, j, 'not visited', initial);
    }
    arr[i] = columns;
  }
  return arr;
}

let map = Array.matrix(20, 20, 1);

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Node(x, y, type, value) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.value = value;
}

function changeColor(element, initialBG) {

  if (element.currentBG == "purple") {
    element.currentBG = initialBG;
    element.style.background = initialBG;
  } else {
    element.currentBG = "purple";
    element.style.background = "purple";
  }
}

function setPaintColor(color) {
  PaintColor = color;
}

function mark(cell, x, y) {
  if (inProgress) {
    return
  }
  if (PaintColor === "green" && map[x][y].type !== 'end') {

    map[startPoint.x][startPoint.y].type = 'path';
    startPoint = new Point(x, y);
    map[x][y].type = 'start';
    console.log("done");
  } else if (PaintColor === "red" && map[x][y].type !== 'start') {

    map[endPoint.x][endPoint.y].type = 'path';
    endPoint = new Point(x, y);
    map[x][y].type = 'end';

  } else if (PaintColor === "grey") {

    if (map[x][y].type === 'wall') {
      map[x][y].type = 'path';
    } else {
      map[x][y].type = 'wall';
    }

  }
  draw();
}

function draw() {
  let mainInnerHTML = "";
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[x][y].type === 'visited') {
        mainInnerHTML += '<div class="cell" style="background: #9ef3c0" onclick="mark(this,' + x + ',' + y + ')"></div>';
      } else if (map[x][y].type === 'wall') {
        mainInnerHTML += '<div class="cell" style="background: grey" onclick="mark(this,' + x + ',' + y + ')"></div>';
      } else if (map[x][y].type === 'start') {
        mainInnerHTML += '<div class="cell" style="background: green" onclick="mark(this,' + x + ',' + y + ')"></div>';
      } else if (map[x][y].type === 'end') {
        mainInnerHTML += '<div class="cell" style="background: red" onclick="mark(this,' + x + ',' + y + ')"></div>';
      } else {
        mainInnerHTML += '<div class="cell" onclick="mark(this,' + x + ',' + y + ')"></div>';
      }
    }
  }
  main.innerHTML = mainInnerHTML;
}
map[0][0].type = 'start';
map[6][6].type = 'end';
startPoint = new Point(0, 0);
endPoint = new Point(6, 6);
draw();
