import axios from 'axios'
const Realm = require('realm')
import { BOOK_SCHEMA, BookSchema } from '../db/currentSchemas'
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
      schema: [BookSchema],
      schemaVersion: 2,
    })
    let books = [...library.objects(BOOK_SCHEMA)]
    dispatch(gotBooks(books))
  } catch (err) {
    console.error(err)
  }
}
export const addBook = (book) => async (dispatch) => {
  try {
    const library = await Realm.open({
      schema: [BookSchema],
    })
    library.write(() => {
      library.create(BOOK_SCHEMA, book)
    })
    dispatch(getBooks())
  } catch (err) {
    console.error(err)
  }
}

export const addSelectedBooks = () => async (dispatch, getState) => {
  try {
    const library = await Realm.open({
      schema: [BookSchema],
    })
    library.write(() => {
      getState().scanSelection.forEach((book) =>
        library.create(BOOK_SCHEMA, book)
      )
    })
    dispatch(getBooks())
  } catch (error) {}
}

export const removeBook = (bookId) => async (dispatch) => {
  const library = await Realm.open({
    schema: [BookSchema],
  })
  let book = library.objects(BOOK_SCHEMA).filtered(`BookId = '${bookId}'`)[0]
  library.write(() => {
    library.delete(book)
  })
  let books = library.objects(BOOK_SCHEMA)
  dispatch(gotBooks(books))
}

// LIBRARY REDUCER
const libraryReducer = (library = initialLibrary, action) => {
  switch (action.type) {
    case GOT_BOOKS:
      return action.books
    case ADDED_BOOK:
      return [...library, action.book]
    default:
      return library
  }
}

export default libraryReducer
