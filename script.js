let main = document.querySelector(".main");

function changeColor(element,initialBG) {

  if (element.currentBG == "purple") {
    element.currentBG =  initialBG;
    element.style.background = initialBG;
  }else {
    element.currentBG =  "purple";
  element.style.background = "purple";
  }
}

Array.matrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}

let map = Array.matrix(20,20,1);

function draw() {
  let mainInnerHTML = "";
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        mainInnerHTML += '<div class="cell" onclick="mark('+x+','+y+')"></div>';
    }
  }
  main.innerHTML = mainInnerHTML;
}
draw();
