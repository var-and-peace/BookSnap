import convert from 'xml-js'

export default (xml) => {
  const bookObj = convert.xml2js(xml, { compact: true })
  const bookInfo = bookObj.GoodreadsResponse.search.results.work[0]
  const getAuthors = () => {
    const authorArray = []
    if (!!bookInfo.best_book.author.name) {
      authorArray.push(bookInfo.best_book.author.name._text)
    } else
    for (let author of bookInfo.best_book.author) {
      authorArray.push(author.name._text)
    }
    return authorArray
  }
  //console.log('BOOK INFO: ', bookInfo)
  const author = getAuthors()
  // const ISBN = bookInfo.isbn._cdata
  // const description = bookInfo.description._cdata
  const title = bookInfo.best_book.title._text
  // const genres = bookObj.popular_shelves
  const coverImage = bookInfo.best_book.image_url._text
  const year = bookInfo.original_publication_year._text
  const BookId = ++bookInfo.best_book.id._text
  const newBook = {
    BookId,
    title,
    author,
    coverImage,
    year,
  }
  return newBook
}
