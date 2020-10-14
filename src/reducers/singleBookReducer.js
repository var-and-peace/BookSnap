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
        let book = {}

        if (bookId === 1) book = { id: 1, title: 'Great Gatsby', author: 'F. Scott Fitzgerald'}
        else if (bookId === 2) book = { id: 2, title: 'Catcher in the Rye', author: 'J.D. Salinger'}
        else if (bookId === 3) book = { id: 3, title: 'A Brave New World', author: 'Alduous Huxley'}
        else if (bookId === 4) book = { id: 4, title: 'Slaughterhouse Five', author: 'Kurt Vonnegut'}
        else if (bookId === 5) book = { id: 5, title: 'Howl', author: 'Allen Ginsburg'}

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
