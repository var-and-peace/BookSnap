import axios from 'axios'

// INITIAL LIBRARY STATE
initialScanResults = []

// ACTION CONSTANTS
const GOT_SCAN_RESULTS = 'GOT_SCAN_RESULTS'

// ACTION CREATORS
export const gotScanResults = (scanResults) => ({
  type: GOT_SCAN_RESULTS,
  scanResults,
})

// THUNK CREATORS
export const getScanResults = (scanArray) => async (dispatch) => {
  try {
    // takes the array of scan results and queries Google Books API
    const scanResults = await Promise.all(
      scanArray.map((text) =>
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
      )
    )
    dispatch(gotScanResults(scanResults))
  } catch (err) {
    console.error(err)
  }
}

// LIBRARY REDUCER
const scanReducer = (state = initialScanResults, action) => {
  switch (action.type) {
    case GOT_SCAN_RESULTS:
      return action.scanResults
    default:
      return state
  }
}

export default scanReducer
