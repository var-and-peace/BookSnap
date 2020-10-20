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
export const addedBook = book => ({
  type: ADDED_BOOK,
  book,
})

// THUNK CREATORS
export const getBooks = () => async dispatch => {
  try {
    const library = await Realm.open({
      schema: [LibrarySchema],
    })
    let books = [...library.objects(LIBRARY_SCHEMA)]
    dispatch(gotBooks(books))
  } catch (err) {
    console.error(err)
  }
}
export const addBookFromResults = book => async dispatch => {
  try {
    const library = await Realm.open({
      schema: [LibrarySchema],
    })
    library.write(() => { 
      library.create('Library', book)
    })
    dispatch(addedBook(book))
  } catch (err) {
    console.error(err)
  }
}
export const addBook = input => async dispatch => {
  try {
    const { data: queryResult } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${input.searchQuery}&maxResults=1`
      )
    const newBook = parse(queryResult)
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
export const removeBook = (bookId) => async dispatch => {
    const library = await Realm.open({
        schema: [LibrarySchema],
    })
    let book = library
    .objects(LIBRARY_SCHEMA)
    .filtered(`BookId = '${bookId}'`)[0]
    library.write(() => {
        library.delete(book)
    })
    let books = library.objects(LIBRARY_SCHEMA)
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
