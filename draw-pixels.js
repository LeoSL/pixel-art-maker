// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

/* global jQuery */

const $ = jQuery;

const gridSpecifications = {
  width: 1,
  height: 1
};

const paintCell = (cell, color) => {
  $(cell).attr('style', `background-color: ${color};`);
  $(cell).attr('data-color', color);
};

const bindCells = () => {
  $('.pixel-cell').on('click', (event) => {
    const pickedColor = $('#color-picker').val();
    const cell = event.currentTarget;
    const isDifferentColor = (cell.dataset.color !== pickedColor);
    const hasBackgroundColor = cell.style.length > 0;

    if (isDifferentColor || !hasBackgroundColor) {
      paintCell(cell, pickedColor);
    } else {
      $(cell).removeAttr('style');
    }
  });
};

const makeGrid = (canvas) => {
  const previousGrid = canvas.children();
  if (previousGrid.length > 0) previousGrid.remove();

  for (let i = gridSpecifications.height - 1; i >= 0; i--) {
    let tCell;
    let cellCounter = 0;
    const tRow = $('<tr/>');

    while (cellCounter <= gridSpecifications.width - 1) {
      tCell = $('<td class=\'pixel-cell\' />');
      tRow.append(tCell);
      cellCounter = cellCounter + 1;
    }

    canvas.append(tRow);
  }
  bindCells();
};

const populateGridSpecifications = () => {
  gridSpecifications.width = $('#input-width').val();
  gridSpecifications.height = $('#input-height').val();
};

const initPixelMaker = () => {
  const table = $('#pixel-canvas');
  $('#grid-submit').click((event) => {
    event.preventDefault();
    populateGridSpecifications();
    makeGrid(table);
  });
  makeGrid(table);
};

$(document).on('ready', initPixelMaker());
