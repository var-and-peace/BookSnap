import React from 'react'
import { Text, View, Image, StyleSheet, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getBook, setBook } from '../reducers/singleBookReducer'
import { removeBook } from '../reducers/libraryReducer'

const HEIGHT = Dimensions.get('window').height / 3.2

class SingleBook extends React.Component {
  componentDidMount() {
    this.props.getBook()
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>
          {this.props.book.title} by {this.props.book.author}
        </Text>
        <Text>ID: {this.props.book.BookId}</Text>
        {
          this.props.book.coverImage === 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png' ? (
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.props.book.title}</Text>
              <Text style={styles.itemText}>{this.props.book.author}</Text>
            </View>
          ) : (
            <Image
              style={{ width: 177, height: HEIGHT, borderRadius: 10 }}
              source={{ uri: this.props.book.coverImage }}
            />
          )
        }
        <Text style={{ padding: 20 }}>{this.props.book.description}</Text>
        <Button title='Remove from Library' onPress={async () => {
            this.props.removeBook(this.props.book.BookId)
            this.props.setBook('EMPTY')
            this.props.navigation.goBack()
        }}/>
      </View>
    )
  }
}

const mapState = (state) => ({
  book: state.selectedBook,
})

const mapDispatch = (dispatch) => ({
  getBook: () => dispatch(getBook()),
  removeBook: (bookId) => dispatch(removeBook(bookId)),
  setBook: (bookId) => dispatch(setBook(bookId))
})

export default connect(mapState, mapDispatch)(SingleBook)

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFC771',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT,
    width: 177,
    margin: 10,
    padding: 2,
    borderRadius: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 22,
  }
})
