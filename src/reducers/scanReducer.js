import axios from 'axios'
import parse from '../assets/bookParserFunc'

const initialScanResults = []

// ACTION CONSTANTS
const GOT_SCAN_RESULTS = 'GOT_SCAN_RESULTS'
const REMOVE_SCAN_ITEMS = 'REMOVE_SCAN_ITEMS'

// ACTION CREATORS
export const gotScanResults = (scanResults) => ({
  type: GOT_SCAN_RESULTS,
  scanResults,
})
export const removeScanItems = (books) => ({
  type: REMOVE_SCAN_ITEMS,
  books,
})

// THUNK CREATORS
// takes array of detected text -> makes api call -> sets results to parsed data
export const getScanResults = (scanArray) => async (dispatch) => {
  try {
    // takes the array of scan results and queries Google Books API
    const scanResults = await Promise.all(
      scanArray.map((text) =>
        axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=1`
        )
      )
    )
    const scanResultsParse = scanResults
      .filter((result) => result.data.items)
      .map((result) => {
        return parse(result.data.items[0])
      })
    dispatch(gotScanResults(scanResultsParse))
  } catch (err) {
    console.error(err)
  }
}

export const getBarcodeResult = (isbn) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`
    )
    if (res.data.items) {
      dispatch(gotScanResults([parse(res.data.items[0])]))
    }
  } catch (err) {
    console.error(err)
  }
}

// LIBRARY REDUCER
const scanReducer = (scanResults = initialScanResults, action) => {
  let ids
  switch (action.type) {
    case GOT_SCAN_RESULTS:
      ids = scanResults.map((elt) => elt.BookId)
      const filteredScanResults = action.scanResults.filter(
        (elt) => !ids.includes(elt.BookId)
      )
      return [...scanResults, ...filteredScanResults]
    case REMOVE_SCAN_ITEMS:
      ids = action.books.map((book) => book.BookId)
      let scanResultsFiltered = scanResults.filter(
        (book) => !ids.includes(book.BookId)
      )
      return scanResultsFiltered
    default:
      return scanResults
  }
}

export default scanReducer
