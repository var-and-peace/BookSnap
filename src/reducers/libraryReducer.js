import axios from 'axios'
const Realm = require('realm')
import { LIBRARY_SCHEMA, LibrarySchema } from '../db/currentSchemas'
import parse from '../assets/bookParserFunc'

// INITIAL LIBRARY STATE
initialLibrary = []

// ACTION CONSTANTS
const GOT_BOOKS = 'GOT_BOOKS'
const ADDED_BOOK = 'ADDED_BOOK'

// ACTION CREATORS
export const gotBooks = (books) => ({
  type: GOT_BOOKS,
  books,
})
export const addedBook = (book) => ({
  type: ADDED_BOOK,
  book,
})

// THUNK CREATORS
export const getBooks = () => async (dispatch) => {
  try {
    const library = await Realm.open({
      schema: [LibrarySchema],
    })
    let books = await [...library.objects(LIBRARY_SCHEMA)]
    dispatch(gotBooks(books))
  } catch (err) {
    console.error(err)
  }
}

export const addBook = (book) => async (dispatch) => {
  try {
    const { data: xml } = await axios.get(
      `https://www.goodreads.com/book/title.xml?author=${book.author
        .split(' ')
        .join('+')}&key=swlLnKRkZ9AWD5M3fGBbVw&title=${book.title
        .split(' ')
        .join('+')}`
    )
    const newBook = await parse(xml)
    const library = await Realm.open({
      schema: [LibrarySchema],
    })
    library.write(() => {
      library.create('Library', newBook)
    })
    dispatch(addedBook(newBook))
  } catch (err) {
    console.error(err)
  }
}

// LIBRARY REDUCER
const libraryReducer = (state = initialLibrary, action) => {
  switch (action.type) {
    case GOT_BOOKS:
      return action.books
    case ADDED_BOOK:
      return [...state, action.book]
    default:
      return state
  }
}

export default libraryReducer
