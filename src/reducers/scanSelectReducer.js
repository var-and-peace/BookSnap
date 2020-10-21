// INITIAL LIBRARY STATE
initialScanSelection = []

// ACTION CONSTANTS
const ADD_SCAN_SELECTION = 'ADD_SCAN_SELECTION'
const REMOVE_SCAN_SELECTION = 'REMOVE_SCAN_SELECTION'

// ACTION CREATORS
export const addScanSelection = (scanItem) => ({
  type: ADD_SCAN_SELECTION,
  scanItem,
})

export const removeScanSelection = (scanItem) => ({
  type: REMOVE_SCAN_SELECTION,
  scanItem,
})

// LIBRARY REDUCER
const scanSelectReducer = (scanSelection = initialScanSelection, action) => {
  switch (action.type) {
    case ADD_SCAN_SELECTION:
      return [...scanSelection, action.scanItem]
    case REMOVE_SCAN_SELECTION:
      const newScanSelection = scanSelection.filter(
        (elt) => elt !== scanItem.BookId
      )
    default:
      return scanSelection
  }
}

export default scanSelectReducer
