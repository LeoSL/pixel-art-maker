// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

/* global jQuery */

const $ = jQuery

const urlParam = window.location.search.substring(1)
const paramsValues = urlParam.match(/(\d{1,4})/) || [1, 1]

const gridSpecifications = {
  width: Number(paramsValues[0]),
  height: Number(paramsValues[1])
}

const makeGrid = () => {
  const table = $('#pixel-canvas')

  for (let i = gridSpecifications.height - 1; i >= 0; i--) {
    let tCell
    let cellCounter = 0
    const tRow = $('<tr/>')

    while (cellCounter <= gridSpecifications.width - 1) {
      tCell = $('<td class=\'pixel-cell\' />')
      tRow.append(tCell)
      cellCounter = cellCounter + 1
    }

    table.append(tRow)
  }
}

const persistSpecificationsInput = () => {
  $('#input-height').val(gridSpecifications.height)
  $('#input-width').val(gridSpecifications.width)
}

const paintCell = (cell) => {
  const pickedColor = $('#color-picker').val()
  $(cell).attr('style', `background-color: ${pickedColor};`)
}

const bindCells = () => {
  $('.pixel-cell').on('click', (event) => {
    const cell = event.currentTarget
    const hasPaintedBackground = cell.style.length > 0

    hasPaintedBackground ? $(cell).removeAttr('style') : paintCell(cell)
  })
}

const initPixelMaker = () => {
  const width = gridSpecifications.width
  const height = gridSpecifications.height
  const paramsAreNumbers = typeof(width) === 'number' && typeof(height) === 'number'

  if (paramsAreNumbers) {
    persistSpecificationsInput()
    makeGrid()
    bindCells()
  }
}

$(document).on('ready', initPixelMaker())
