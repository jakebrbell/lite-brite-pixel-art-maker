document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementsByClassName('canvas')[0];
  var colorPalette = document.getElementsByClassName('color-palette')[0];
  var button = document.querySelector('.button');
  var currentSelection = "white";
  var multiPeg = document.getElementsByClassName('multiple-peg-button')[0];
  var multiPegMode = 'off';

  var createCanvas = function(gridWidth, gridHeight) {
    // First make sure the canvas element is clear
    canvas.innerHTML = '';

    var size = gridWidth * gridHeight;
    canvas.style.width = (gridWidth * 10).toString() + 'px';
    canvas.style.height = (gridHeight * 10).toString() + 'px';
    var div;

    for (var i = 0; i < size; i++) {
      div = document.createElement('div');
      div.className = 'pixel';
      canvas.appendChild(div);
    }

  };

  var getSize = function(event) {
    event.preventDefault;
    var gridWidth = document.getElementsByTagName('select')[0].value;
    var gridHeight = document.getElementsByTagName('select')[1].value;

    createCanvas(gridWidth, gridHeight);
  };

  button.addEventListener('click', getSize);

  var updateCurrentSelection = function(event) {
    if (event.target.className.indexOf('red') !== -1) {
      currentSelection = 'red';
    } else if (event.target.className.indexOf('orange') !== -1) {
      currentSelection = 'orange';
    } else if (event.target.className.indexOf('yellow') !== -1) {
      currentSelection = 'yellow';
    } else if (event.target.className.indexOf('green') !== -1) {
      currentSelection = 'green';
    } else if (event.target.className.indexOf('blue') !== -1) {
      currentSelection = 'blue';
    } else if (event.target.className.indexOf('purple') !== -1) {
      currentSelection = 'purple';
    } else if (event.target.className.indexOf('brown') !== -1) {
      currentSelection = 'brown';
    } else if (event.target.className.indexOf('black') !== -1) {
      currentSelection = 'black';
    } else if (event.target.className.indexOf('white') !== -1) {
      currentSelection = 'white';
    }

    document.querySelector('.current-color').className = 'current-color ' + currentSelection;
  };

  colorPalette.addEventListener('click', updateCurrentSelection);

  var applySelection = function(event) {
    event.preventDefault;
    if (event.target.className.indexOf('pixel') !== -1) {

      if (multiPegMode === 'off') {
        if (event.target.className.indexOf(currentSelection) === -1) {
          event.target.className = 'pixel ' + currentSelection;
        } else {
          event.target.className = 'pixel black';
        }
      } else {
        event.target.className = 'pixel ' + currentSelection;
        canvas.addEventListener('mouseover', drawMultiPegMode);

      }
    }
  };

  canvas.addEventListener('mousedown', applySelection);

  var drawMultiPegMode = function(event) {
    if (event.target.className.indexOf('pixel') !== -1) {
      event.target.className = 'pixel ' + currentSelection;
    }
    canvas.addEventListener('mouseup', stopMultiPegDraw);
  };

  var stopMultiPegDraw = function(event) {
    canvas.removeEventListener('mouseover', drawMultiPegMode);
  };

  var toggleMultiPegMode = function(event) {
    if (multiPeg.className.indexOf('active') === -1) {
      multiPeg.className = 'multiple-peg-button ' + 'active';
      multiPegMode = 'on';
    } else {
      multiPeg.className = 'multiple-peg-button';
      multiPegMode = 'off';
    }
  };

  multiPeg.addEventListener('click', toggleMultiPegMode);

});
