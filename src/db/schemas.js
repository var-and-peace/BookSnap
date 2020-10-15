const LIBRARY_SCHEMA = 'Library'
const USER_SCHEMA = 'User'

const LibrarySchema = {
  name: LIBRARY_SCHEMA,
  primaryKey: 'BookId',
  properties: {
    BookId: 'int',
    title: 'string',
    author: 'string',
    ISBN: 'string',
    coverImage: 'string',
    genre: 'string',
    year: 'string',
    unread: 'bool',
    isReading: 'bool',
    rating: 'int',
    isFavorite: 'bool',
    pageNumber: 'int'
  }
}

class User {
  get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}

User.schema = {
  name: USER_SCHEMA,
  primaryKey: 'UserId',
  properties: {
    UserId: 'int',
    firstName: 'string',
    lastName: 'string',
    profilePic: 'string',
    library: { type: 'list', objectType: LIBRARY_SCHEMA }
  }
}

module.exports = {
  LIBRARY_SCHEMA,
  USER_SCHEMA,
  User,
  LibrarySchema
}

