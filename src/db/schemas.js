export const LIBRARY_SCHEMA = 'library'
export const USER_SCHEMA = 'user'

export const LibrarySchema = {
  name: LIBRARY_SCHEMA,
  primaryKey: 'BookID',
  properties: {
    BookID: 'int',
    title: 'string',
    author: 'string',
    ISBN: 'string',
    coverImage: 'string',
    genre: 'string',
    year: 'string',
    unread: 'bool',
    isReading: 'bool',
    rating: 'number',
    isFavorite: 'bool'
  }
}

export class User {
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
