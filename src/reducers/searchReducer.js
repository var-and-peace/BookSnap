import axios from 'axios'
import parse from '../assets/bookParserFunc'

const GOT_SEARCH_RESULTS = 'GOT_SEARCH_RESULTS'

const initialSearchResults = []

export const gotSearchResults = (searchResults) => ({
  type: GOT_SEARCH_RESULTS,
  searchResults,
})

export const searchBooks = (input) => async (dispatch) => {
  try {
    const { data: queryResult } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${input.searchQuery}&maxResults=10`
    )
    const books = queryResult.items.map((book) => parse(book))
    dispatch(gotSearchResults(books))
  } catch (err) {}
}

const searchReducer = (searchResults = initialSearchResults, action) => {
  switch (action.type) {
    case GOT_SEARCH_RESULTS:
      return action.searchResults
    default:
      return searchResults
  }
}

export default searchReducer
