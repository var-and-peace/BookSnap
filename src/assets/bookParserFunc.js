import convert from 'xml-js'

export default (xml) => {
  const bookObj = convert.xml2js(xml, { compact: true })
  const bookInfo = bookObj.GoodreadsResponse.book
  const getAuthors = () => {
    const authorArray = []
    if (!!bookInfo.authors.author.name) {
      authorArray.push(bookInfo.authors.author.name._text)
    } else
      for (let author of bookInfo.authors.author) {
        authorArray.push(author.name._text)
      }
    return authorArray
  }
  const author = getAuthors()
  const ISBN = bookInfo.isbn._cdata
  const description = bookInfo.description._cdata
  const title = bookInfo.work.original_title._text
  const genres = bookObj.popular_shelves
  const coverImage = bookInfo.image_url._text
  const year = bookInfo.work.original_publication_year._text
  const BookId = ++bookInfo.id._text
  const newBook = {
    BookId,
    title,
    author,
    ISBN,
    coverImage,
    year,
    description,
  }
  return newBook
}
