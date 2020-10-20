import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const BookCard = (props) => {
  const { book, checkList } = props

  console.log(book.coverImage)
  return (
    <View style={style.container}>
      {checkList && (
        <Icon
          name={'checkcircle'}
          size={30}
          color='#01a699'
          onPress={() => console.log('hello')}
        />
      )}
      <Image style={style.coverImage} source={{ uri: book.coverImage }} />
      <View style={style.textContent}>
        <Text>{book.title}</Text>
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
    width: 110,
    height: 140,
    borderWidth: 2,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 2,
    marginLeft: 10,
  },
}

export default BookCard
