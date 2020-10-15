const LIBRARY_SCHEMA = 'Library'
const USER_SCHEMA = 'User'

const LibrarySchema = {
  name: LIBRARY_SCHEMA,
  properties: {
    title: 'string',
    author: 'string',
    ISBN: 'string?',
    coverImage: 'string',
    genre: 'string',
    year: 'string',
    unread: 'bool?',
    isReading: 'bool?',
    rating: 'int?',
    isFavorite: 'bool',
    pageNumber: 'int',
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

module.exports = {
  LIBRARY_SCHEMA,
  USER_SCHEMA,
  UserSchema,
  LibrarySchema,
}
