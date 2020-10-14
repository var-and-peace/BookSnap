import axios from 'axios'

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
export const setBook = bookId => async dispatch => {
    try {
        console.log('SETTING BOOK')
        let book = {};
        if (bookId === 1) book = {
            id: 1,
            title: 'Great Gatsby',
            author: 'F. Scott Fitzgerald'
        }
        else book = {
            id: 2,
            title: 'Catcher in the Rye',
            author: 'J.D. Salinger'
        }
        dispatch(gotBook(book))
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
