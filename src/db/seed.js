const { LibrarySchema, UserSchema } = require('./schemas')

const Realm = require('realm')

const libraryFiller = [
  {
    title: 'Walden',
    author: 'Thoreau',
    genre: 'Old',
    unread: true,
    isReading: false,
    rating: 3,
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
    coverImage:
      'https://www.promotionalbooktours.com/wp-content/uploads/2014/08/library_book.jpg',
    year: '2000',
    pageNumber: 365,
  },
  {
    title: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
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

const seed = async () => {
  try {
    const library = await Realm.open({ schema: [LibrarySchema] })
    const user = await Realm.open({ schema: [UserSchema] })
    user.write(
      async () =>
        await user.create('User', {
          firstName: 'Mike',
          lastName: 'Maurer',
          profilePic: 'loser.jpg',
          library: [],
        })
    )
    await Promise.all(
      libraryFiller.map((book) => {
        library.create('Library', book)
      })
    )
  } catch (err) {
    console.error('Error seeding database', err)
  }
}

seed()
