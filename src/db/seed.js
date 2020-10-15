const {
  LIBRARY_SCHEMA,
  USER_SCHEMA,
  User,
  LibrarySchema,
} = require('./schemas')
const Realm = require('realm')

const libraryFiller = [
  {
    BookId: 1,
    title: 'Walden',
    author: 'Thoreau',
    genre: 'Old',
    unread: true,
    isReading: false,
    rating: 3,
    isFavorite: true,
    ISBN: 'HONESTLY IDK',
    coverImage:
      'https://www.promotionalbooktours.com/wp-content/uploads/2014/08/library_book.jpg',
    year: '2000',
    pageNumber: 500,
  },
  {
    BookId: 2,
    title: 'A Pale Blue Dot',
    author: 'Carl Sagan',
    genre: 'Science',
    unread: false,
    isReading: false,
    rating: 5,
    isFavorite: true,
    ISBN: 'HONESTLY IDK',
    coverImage:
      'https://www.promotionalbooktours.com/wp-content/uploads/2014/08/library_book.jpg',
    year: '2000',
    pageNumber: 365,
  },
  {
    BookId: 3,
    title: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
    genre: 'Kids',
    unread: false,
    isReading: false,
    rating: 3,
    isFavorite: false,
    ISBN: 'HONESTLY IDK',
    coverImage:
      'https://www.promotionalbooktours.com/wp-content/uploads/2014/08/library_book.jpg',
    year: '2000',
    pageNumber: 42,
  },
]

Realm.open({ schema: [LibrarySchema, User] })
  .then((realm) => {
    realm.write(() =>
      realm.create('User', {
        UserId: 1,
        firstName: 'Mike',
        lastName: 'Maurer',
        profilePic: 'loser.jpg',
        library: [],
      })
    )
    realm.write(() => {
      realm.create('Library', libraryFiller[0])
      realm.create('Library', libraryFiller[1])
      realm.create('Library', libraryFiller[2])
    })
  })
  .catch((err) => console.error('Error seeding database', err))
