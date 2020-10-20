const LIBRARY_SCHEMA = 'Library'
const USER_SCHEMA = 'User'
const SCAN_RESULT_SCHEMA = 'SCAN_RESULT'

const LibrarySchema = {
  name: LIBRARY_SCHEMA,
  primaryKey: 'BookId',
  properties: {
    BookId: 'string',
    title: 'string',
    author: 'string[]',
    ISBN: 'string?',
    coverImage: 'string?',
    genres: { type: 'string[]', default: [''] },
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
  },
}

const UserSchema = {
  name: USER_SCHEMA,
  properties: {
    firstName: 'string',
    lastName: 'string?',
    profilePic: 'string?',
    library: { type: 'list', objectType: LIBRARY_SCHEMA },
  },
}

const ScanResultSchema = {
  name: SCAN_RESULT_SCHEMA,
  properties: {
    scanResult: {
      objectType: LIBRARY_SCHEMA,
      type: 'list',
    },
  },
}

module.exports = {
  LIBRARY_SCHEMA,
  USER_SCHEMA,
  SCAN_RESULT_SCHEMA,
  LibrarySchema,
  UserSchema,
  ScanResultSchema,
}
