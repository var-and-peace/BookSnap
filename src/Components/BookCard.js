import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

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
              color='#01a699'
              onPress={() => toggleCheck(!buttonChecked)}
            />
          ) : (
            <FontAwesomeIcon
              name={'circle'}
              size={30}
              color='#01a699'
              onPress={() => toggleCheck(!buttonChecked)}
            />
          ))}
      </View>
      <Image style={style.coverImage} source={{ uri: book.coverImage }} />
      <View style={style.textContent}>
        <View style={style.titleContainer}>
          <Text style={style.title} numberOfLines={2}>
            {book.title}
          </Text>
        </View>
        <Text>by {book.author.join(', ')}</Text>
        <Text>{book.genres[0]}</Text>
      </View>
    </View>
  )
}

const style = {
  container: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'stretch',
  },
  coverImage: {
    width: 87.5,
    height: 140,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    borderWidth: 2,
    width: '65%',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Times New Roman',
  },
  titleContainer: {
    width: '100%',
    borderWidth: 2,
    overflow: 'hidden',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 10,
  },
}

export default BookCard
