import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const BookCardColor = '#fff1e6'
const BookCard = (props) => {
  const { book, checkList } = props

  const [buttonChecked, toggleCheck] = useState(false)
  console.log(book.coverImage)
  return (
    <View style={style.container}>
      <View style={style.buttonContainer}>
        {checkList &&
          (buttonChecked ? (
            <FontAwesomeIcon
              name={'check-circle'}
              size={30}
              color='#774936'
              onPress={() => toggleCheck(!buttonChecked)}
            />
          ) : (
            <FontAwesomeIcon
              name={'circle-thin'}
              size={30}
              color='#774936'
              onPress={() => toggleCheck(!buttonChecked)}
            />
          ))}
      </View>
      <View style={style.cardProfile}>
        <Image style={style.coverImage} source={{ uri: book.coverImage }} />
        <View style={style.textContent}>
          <Text style={style.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={style.author} numberOfLines={1}>
            by {book.author.join(', ')}
          </Text>
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
    marginRight: 5,
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

export default BookCard
