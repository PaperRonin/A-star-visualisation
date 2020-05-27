let main = document.querySelector(".main");

let PaintColor = "green";
let goalPoint, startPoint;
let inProgress = false;
let choosedAlg = 1;
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

function Node(x, y, type, moveCost) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.moveCost = moveCost;
  this.cost_so_far = null;
  this.came_from = null;
  this.priority = 0;
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
  document.getElementById('brush').style.background = color;
  PaintColor = color;
}

function mark(cell, x, y) {
  if (inProgress) {
    return
  }
  if (PaintColor === "green" && map[x][y].type !== 'goal') {

    map[startPoint.x][startPoint.y].type = 'not visited';
    startPoint = new Point(x, y);
    map[x][y].type = 'start';
  } else if (PaintColor === "red" && map[x][y].type !== 'start') {

    map[goalPoint.x][goalPoint.y].type = 'not visited';
    goalPoint = new Point(x, y);
    map[x][y].type = 'goal';

  } else if (PaintColor === "grey") {

    if (map[x][y].type === 'wall') {
      map[x][y].type = 'not visited';
    } else if (map[x][y].type !== 'goal' && map[x][y].type !== 'start') {
      map[x][y].type = 'wall';
    }

  }
  draw();
}

function draw() {
  let mainInnerHTML = "";
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {

      switch (map[x][y].type) {
        case 'visited':
          mainInnerHTML += '<div class="cell" style="background: #9ef3c0" onclick="mark(this,' + x + ',' + y + ')"></div>';
          break;
        case 'enqueued':
          mainInnerHTML += '<div class="cell" style="background:  #5da1ff" onclick="mark(this,' + x + ',' + y + ')"></div>';
          break;
        case 'path':
          mainInnerHTML += '<div class="cell" style="background: #ffac4d" onclick="mark(this,' + x + ',' + y + ')"></div>';
          break;
        case 'wall':
          mainInnerHTML += '<div class="cell" style="background: grey" onclick="mark(this,' + x + ',' + y + ')"></div>';
          break;
        case 'start':
          mainInnerHTML += '<div class="cell" style="background: green" onclick="mark(this,' + x + ',' + y + ')"></div>';
          break;
        case 'goal':
          mainInnerHTML += '<div class="cell" style="background: red" onclick="mark(this,' + x + ',' + y + ')"></div>';
          break;
        default:
          mainInnerHTML += '<div class="cell" onclick="mark(this,' + x + ',' + y + ')"></div>';
      }
    }
  }
  main.innerHTML = mainInnerHTML;
}

async function startSearch() {
  inProgress = true;
  let pWeight;
  switch (choosedAlg) {
    case 1:
      pWeight = AStarSearch(map[startPoint.x][startPoint.y], map[goalPoint.x][goalPoint.y]);
      break;
    case 2:
      pWeight = dijkstraSearch(map[startPoint.x][startPoint.y], map[goalPoint.x][goalPoint.y]);
      break;
    case 3:
      pWeight = heuristicSearch(map[startPoint.x][startPoint.y], map[goalPoint.x][goalPoint.y]);
      break;

  }
  let pathWeight = document.getElementById('weights');
  let itercount = document.getElementById('itercount');
  if (pWeight === -1) {
    itercount.innerHTML = "OwO";
    pathWeight.innerHTML = "Can't find a path!";
  } else {
    pathWeight.innerHTML = "Path weight: " + pWeight;
    itercount.innerHTML = "Number of iterations: " + count;
  }
  let button = document.getElementById('startBttn');
  button.innerHTML = 'Clear';
  button.setAttribute("onClick", "clearResult(1);");
}

async function clearResult(initial) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[x][y].type === 'start') {
        map[x][y] = new Node(x, y, 'start', initial);
      } else if (map[x][y].type === 'goal') {
        map[x][y] = new Node(x, y, 'goal', initial);
      } else if (map[x][y].type !== 'wall') {
        map[x][y] = new Node(x, y, 'not visited', initial);
      }
    }
  }
  draw();
  let button = document.getElementById('startBttn');
  button.innerHTML = 'Start';
  button.setAttribute("onClick", "startSearch(1);");
  inProgress = false;
}


map[0][0].type = 'start';
map[6][6].type = 'goal';
startPoint = new Point(0, 0);
goalPoint = new Point(6, 6);
draw();
