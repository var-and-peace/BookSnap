const BOOK_SCHEMA = 'Book'
const USER_SCHEMA = 'User'
const SCAN_RESULT_SCHEMA = 'SCAN_RESULT'
const BOOKSHELF_SCHEMA = 'BOOKSHELF'

const BookSchema = {
  name: BOOK_SCHEMA,
  primaryKey: 'BookId',
  properties: {
    BookId: 'string',
    title: 'string',
    author: 'string[]',
    ISBN: 'string?',
    coverImage: 'string?',
    genres: { type: 'string[]', default: ['Unlisted'] },
    year: 'string?',
    unread: { type: 'bool', default: true },
    isReading: { type: 'bool', default: false },
    rating: { type: 'int?', default: 0 },
    isFavorite: { type: 'bool', default: false },
    numPages: 'int?',
    currentPage: { type: 'int?', default: 0 },
    description: {
      type: 'string?',
      default: 'No description available at this time.',
    },
    mainBookshelf: 'string?',
  },
}
const BookSchemaVersion = 2

const UserSchema = {
  name: USER_SCHEMA,
  properties: {
    firstName: 'string',
    lastName: 'string?',
    profilePic: 'string?',
    library: { type: 'list', objectType: BOOK_SCHEMA },
  },
}

const ScanResultSchema = {
  name: SCAN_RESULT_SCHEMA,
  properties: {
    scanResult: {
      objectType: BOOK_SCHEMA,
      type: 'list',
    },
  },
}

const BookshelfSchema = {
  name: BOOKSHELF_SCHEMA,
  properties: {
    name: 'string',
    books: `${BOOKSHELF_SCHEMA}[]`,
  },
}

module.exports = {
  BOOK_SCHEMA,
  USER_SCHEMA,
  SCAN_RESULT_SCHEMA,
  BOOKSHELF_SCHEMA,
  BookSchema,
  UserSchema,
  ScanResultSchema,
  BookshelfSchema,
  BookSchemaVersion,
}
