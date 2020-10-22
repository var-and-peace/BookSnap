const Realm = require('realm')
import { LIBRARY_SCHEMA, LibrarySchema } from '../db/currentSchemas'

// INITIAL LIBRARY STATE
initialBook = {}

// ACTION CONSTANTS
const GOT_BOOK = 'GOT_BOOK'

// ACTION CREATORS
export const gotBook = (book) => ({
  type: GOT_BOOK,
  book,
})

// THUNK CREATORS
export const getBook = () => async (dispatch, getState) => {
  try {
    let selectedBook = getState().selectedBook
    dispatch(gotBook(selectedBook))
  } catch (err) {
    console.error(err)
  }
}
export const setBook = (bookId) => async (dispatch) => {
  try {
    if (bookId === 'EMPTY') {
      dispatch(gotBook({}))
    } else {
      const library = await Realm.open({
        schema: [LibrarySchema],
      })
      let book = await library
        .objects(LIBRARY_SCHEMA)
        .filtered(`BookId = '${bookId}'`)[0]
      dispatch(gotBook(book))
    }
  } catch (err) {
    console.error(err)
  }
}

export const setFavorite = (bookId, isFavorite) => async (dispatch) => {
  try {
    const fave = await Realm.open({ schema: [LibrarySchema] })
    fave.write(() => {
      const faveData = fave.create(
        'Library',
        { BookId: bookId, isFavorite },
        'modified'
      )
      dispatch(gotBook(faveData))
    })
  } catch (err) {
    console.error(err)
  }
}
export const setRead = (bookId, unread) => async (dispatch) => {
  try {
    const read = await Realm.open({ schema: [LibrarySchema] })
    read.write(() => {
      const readData = read.create(
        'Library',
        { BookId: bookId, unread },
        'modified'
      )
      console.log(readData.unread)
      dispatch(gotBook(readData))
    })
  } catch (err) {
    console.error(err)
  }
}

// SINGLE BOOK REDUCER
const singleBookReducer = (state = initialBook, action) => {
  switch (action.type) {
    case GOT_BOOK:
      return action.book
    default:
      return state
  }
}

export default singleBookReducer
