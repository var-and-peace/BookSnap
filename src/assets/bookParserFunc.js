import toTitleCase from './toTitleCase'

export default (book) => {
  const DATE = book.volumeInfo.publishedDate
  const IMAGE_URL = book.volumeInfo.imageLinks
  const ISBN_CODE = book.volumeInfo.industryIdentifiers
  const AVERAGE_RATING = book.volumeInfo.averageRating
  const GENRES = book.volumeInfo.categories
  return {
    BookId: `${book.id}`,
    title: toTitleCase(book.volumeInfo.title),
    author: book.volumeInfo.authors.map(author => toTitleCase(author)),
    ISBN: ISBN_CODE ? ISBN_CODE[0].identifier : null,
    coverImage: IMAGE_URL ? IMAGE_URL.thumbnail : null,
    genres: GENRES ? GENRES.map((genre) => toTitleCase(genre)) : 'Unlisted',
    year: DATE ? DATE.slice(0, 4) : null,
    numPages: book.volumeInfo.pageCount,
    averageRating: AVERAGE_RATING ? AVERAGE_RATING : 0,
    ratingsCount: AVERAGE_RATING ? book.volumeInfo.ratingsCount : 0,
    description: book.volumeInfo.description,
  }
}
