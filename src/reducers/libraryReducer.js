import axios from 'axios'

// INITIAL LIBRARY STATE
initialLibrary = [
    { id: 1, title: 'Great Gatsby', author: 'F. Scott Fitzgerald'},
    { id: 2, title: 'Catcher in the Rye', author: 'J.D. Salinger'},
    { id: 3, title: 'A Brave New World', author: 'Alduous Huxley'},
    { id: 4, title: 'Slaughterhouse Five', author: 'Kurt Vonnegut'},
    { id: 5, title: 'Howl', author: 'Allen Ginsburg'}
]

// ACTION CONSTANTS
const GOT_BOOKS = 'GOT_BOOKS'

// ACTION CREATORS
export const gotBooks = (books) => ({
  type: GOT_BOOKS,
  books,
})

// THUNK CREATORS
export const getBooks = () => async (dispatch) => {
  try {
    // const books = await axios.get('/HTTP ADDRESS TO GET LIBRARY')
    const books = initialLibrary
    dispatch(gotBooks(books))
  } catch (err) {
    console.error(err)
  }
}

// LIBRARY REDUCER
const libraryReducer = (state = initialLibrary, action) => {
  switch (action.type) {
    case GOT_BOOKS:
      return action.books
    default:
      return state
  }
}

export default libraryReducer
