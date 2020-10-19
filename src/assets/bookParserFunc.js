export default (queryResult) => {
  const book = queryResult.items[0]
  return {
    BookId: `${book.id}`,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors,
    ISBN: book.volumeInfo.industryIdentifiers[0].identifier,
    coverImage: book.volumeInfo.imageLinks.thumbnail,
    genres: book.volumeInfo.categories,
    year: book.volumeInfo.publishedDate.slice(0, 4),
    numPages: book.volumeInfo.pageCount,
    description: book.volumeInfo.description,
  }
}
