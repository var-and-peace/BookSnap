import axios from 'axios'
import parse from '../assets/bookParserFunc'
const Realm = require('realm')

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
        axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=1`
        )
      )
    )
    const scanParse = scanResults
      .filter((result) => result.data.items)
      .map((result) => {
        return parse(result.data)
      })
    dispatch(gotScanResults(scanParse))
  } catch (err) {
    console.error(err)
  }
}
export const searchBooks = (input) => async (dispatch) => {
  try {
    const { data: queryResult } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${input.searchQuery}&maxResults=10`
    )
    const books = queryResult.items.map((book) => parse(book))
    dispatch(gotScanResults(books))
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
