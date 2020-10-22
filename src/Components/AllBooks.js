import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import { setBook } from '../reducers/singleBookReducer'

const HEIGHT = Dimensions.get('window').height / 3.2
const numColumns = 2

class AllBooks extends React.Component {
  constructor() {
    super()
    this.formatData = this.formatData.bind(this)
    this.renderBook = this.renderBook.bind(this)
  }
  componentDidMount() {
    this.props.getBooks()
  }
  formatData(data, numColumns) {
    const library = [...data]
    const totalRows = Math.floor(library.length / numColumns)
    let totalLastRow = library.length - totalRows * numColumns
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      library.push({ title: 'blank', empty: true })
      totalLastRow++
    }
    return library
  }
  renderBook(book) {
    if (book.item.empty) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <Pressable
        style={styles.item}
        onPress={() => {
          this.props.setBook(book.item.BookId)
          this.props.navigation.navigate(book.item.BookId)
        }}
      >
        {book.item.coverImage === null ? (
          <View style={styles.item}>
            <Text style={styles.itemText}>{book.item.title}</Text>
            <Text style={styles.itemText}>{book.item.author}</Text>
          </View>
        ) : (
          <Image
            style={{ width: 177, height: HEIGHT, borderRadius: 10 }}
            source={{ uri: book.item.coverImage }}
          />
        )}
      </Pressable>
    )
  }
  render() {
    return (
      <View style={{ backgroundColor: '#ddbea9', flex: 1 }}>
        <Text style={styles.text}>Library</Text>
        <View style={styles.container}>
          <FlatList
            data={this.formatData(this.props.library, numColumns)}
            renderItem={this.renderBook}
            keyExtractor={(book, index) => index.toString()}
            numColumns={numColumns}
          />
        </View>
      </View>
    )
  }
}

const mapState = (state) => ({
  library: state.library,
})

const mapDispatch = (dispatch) => ({
  getBooks: () => dispatch(getBooks()),
  setBook: (bookId) => dispatch(setBook(bookId)),
})

export default connect(mapState, mapDispatch)(AllBooks)

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 15,
    marginTop: 50,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff1e6'
  },
  item: {
    backgroundColor: '#FFC771',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT,
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 22,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
})