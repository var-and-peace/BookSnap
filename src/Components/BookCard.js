import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { addBook, removeBook } from '../reducers/libraryReducer'
import { connect } from 'react-redux'
import {
  addScanSelection,
  removeScanSelection,
} from '../reducers/scanSelectReducer'

const BookCardColor = '#fff1e6'
const BookCard = (props) => {
  const { book, checkList, toggleSelection } = props

  const buttonChecked = props.scanSelection
    .map((elt) => elt.BookId)
    .includes(book.BookId)

  let addedToLibrary = false
  if (
    props.library.filter((ownedBook) => ownedBook.BookId === book.BookId)
      .length > 0
  ) {
    addedToLibrary = true
  }

  return (
    <View style={style.container}>
      <View style={style.buttonContainer}>
        {checkList &&
          (buttonChecked ? (
            <FontAwesomeIcon
              name={'check-circle'}
              size={27}
              color='#774936'
              onPress={() => {
                // toggleCheck(!buttonChecked)
                props.removeScanSelection(book)
              }}
            />
          ) : (
            <FontAwesomeIcon
              name={'circle-thin'}
              size={27}
              color='#774936'
              onPress={() => {
                // toggleCheck(!buttonChecked)
                props.addScanSelection(book)
              }}
            />
          ))}
        {!checkList &&
          (addedToLibrary ? (
            <FontAwesomeIcon
              name={'check'}
              size={20}
              color='#774936'
              onPress={() => {
                addedToLibrary = !addedToLibrary
                props.removeBook(book.BookId)
              }}
            />
          ) : (
            <FontAwesomeIcon
              name={'plus'}
              size={25}
              color='#774936'
              onPress={() => {
                addedToLibrary = !addedToLibrary
                props.addBook(book)
              }}
            />
          ))}
      </View>
      <View style={style.cardProfile}>
        <Image style={style.coverImage} source={{ uri: book.coverImage }} />
        <View style={style.textContent}>
          <Text style={style.title} numberOfLines={2}>
            {book.title}
          </Text>
          {book.author ? (
            <Text style={style.author} numberOfLines={1}>
              by {book.author.join(', ')}
            </Text>
          ) : (
            <View />
          )}
          <View style={style.metaData}>
            <Rating
              readonly
              type='custom'
              fractions={1}
              startingValue={book.averageRating}
              tintColor={BookCardColor}
              imageSize={14}
              ratingColor='#774936'
              style={style.rating}
            />
            <Text
              style={{
                fontSize: 2,
                margin: 'auto',
                marginHorizontal: 7,
              }}
            >
              {'\u2B24'}
            </Text>
            <Text style={{ fontSize: 12 }}>{book.ratingsCount}</Text>
            <Text style={{ fontSize: 2, margin: 'auto', marginHorizontal: 7 }}>
              {'\u2B24'}
            </Text>
            <Text style={{ fontSize: 12 }}>{book.year}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const mapState = (state) => ({
  library: state.library,
  scanSelection: state.scanSelection,
})

const mapDispatch = (dispatch) => ({
  addBook: (bookId) => dispatch(addBook(bookId)),
  removeBook: (bookId) => dispatch(removeBook(bookId)),
  addScanSelection: (book) => dispatch(addScanSelection(book)),
  removeScanSelection: (book) => dispatch(removeScanSelection(book)),
})

export default connect(mapState, mapDispatch)(BookCard)

const style = {
  container: {
    borderColor: 'gray',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    background: 'linear-gradient(black,black) bottom',
    backgroundSize: '50% 3px',
    backgroundColor: BookCardColor,
  },
  coverImage: {
    width: 62.5,
    height: 100,
  },
  cardProfile: {
    display: 'flex',
    borderBottomWidth: 1,
    borderColor: '#c38e70',
    width: '100%',
    flexDirection: 'row',
    margin: 0,
    padding: 10,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    width: '65%',
  },
  title: {
    fontSize: 19,
    fontFamily: 'Times New Roman',
  },
  author: {
    fontSize: 12,
    marginTop: 5,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 0,
    // borderRightWidth: 2,
  },
  rating: {
    padding: 0,
    marginLeft: 5,
    width: 60,
  },
  metaData: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    // justifyContent: 'center',
    alignItems: 'center',
  },
}
