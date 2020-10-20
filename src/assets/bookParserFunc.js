export default (book) => {
  const DATE = book.volumeInfo.publishedDate
  const IMAGE_URL = book.volumeInfo.imageLinks
  const ISBN_CODE = book.volumeInfo.industryIdentifiers
  return {
    BookId: `${book.id}`,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors,
    ISBN: ISBN_CODE !== undefined ? ISBN_CODE[0].identifier : null,
    coverImage: IMAGE_URL !== undefined ? IMAGE_URL.thumbnail : null,
    genres: book.volumeInfo.categories,
    year: DATE !== undefined ? DATE.slice(0, 4) : null,
    numPages: book.volumeInfo.pageCount,
    description: book.volumeInfo.description,
  }
}
