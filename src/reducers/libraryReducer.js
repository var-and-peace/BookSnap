import axios from 'axios'
const Realm = require('realm')
import { LIBRARY_SCHEMA, LibrarySchema } from '../db/schemas'
import convert from 'xml-js'

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
    console.log(books)
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
    const bookData = convert.xml2js(xml, { compact: true })
    const bookInfo = bookData.GoodreadsResponse.book
    const author = bookInfo.authors.author.name._text
    const ISBN = bookInfo.isbn._cdata
    const description = bookInfo.description._cdata
    const title = bookInfo.work.original_title._text
    const genres = bookData.popular_shelves
    const coverImage = bookInfo.image_url._text
    const year = bookInfo.work.original_publication_year._text
    const BookId = ++bookInfo.id._text
    const numPages = ++bookInfo.num_pages._cdata
    const bookObj = {
      BookId,
      title,
      author,
      ISBN,
      coverImage,
      year,
      numPages,
    }
    console.log(bookObj)
    const library = await Realm.open({
      schema: [LibrarySchema],
    })
    library.write(() => {
      library.create('Library', bookObj)
    })
    dispatch(addedBook(bookObj))
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
