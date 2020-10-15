const { User, LibrarySchema } = require('./schemas')
const Realm = require('realm')

const libraryFiller = [
  {
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

;async () => {
  try {
    const realm = await Realm.open({ schema: [LibrarySchema, User] })
    realm.write(async () => {
      await realm.create('User', {
        UserId: 1,
        firstName: 'Mike',
        lastName: 'Maurer',
        profilePic: 'loser.jpg',
        library: [],
      })
      await Promise.all(
        libraryFiller.map((book) => {
          realm.create('Library', book)
        })
      )
    })
  } catch (err) {
    console.error('Error seeding database', err)
  }
}
