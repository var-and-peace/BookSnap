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
import SegmentedControl from '@react-native-community/segmented-control'

const WIDTH = Dimensions.get('window').width / 2.3
const HEIGHT = Dimensions.get('window').height / 3.2
const numColumns = 2

class AllBooks extends React.Component {
  constructor() {
    super()
    this.state = {sortIndex: 0}
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
            style={{ width: WIDTH, height: HEIGHT, borderRadius: 10 }}
            source={{ uri: book.item.coverImage }}
          />
        )}
      </Pressable>
    )
  }
  render() {
    let library = [...this.props.library];
    if(this.state.sortIndex === 0){
      library = this.props.library;
    } else if(this.state.sortIndex === 1){//by author
      library = library.sort(function(bookA, bookB){
        let authorA = bookA.author.length === 0 ? 'z zz' : bookA.author[0].split(' ')[1];
        let authorB = bookB.author.length === 0 ? 'z zz' : bookB.author[0].split(' ')[1];
        return authorA.localeCompare(authorB);
      })
    } else if(this.state.sortIndex === 2){//by title
      library = library.sort(function(bookA, bookB){
        let titleA = bookA.title;
        let titleB = bookB.title;
        return titleA.localeCompare(titleB);
      })
    } else if(this.state.sortIndex === 3){//by year
      library = library.sort(function(bookA, bookB){
        let yearA = parseInt(bookA.year);
        let yearB = parseInt(bookB.year);
        return yearB - yearA;
      })
    }
    return (
      <View style={{ backgroundColor: '#ddbea9', flex: 1 }}>
        <Text style={styles.text}>Library</Text>
        <SegmentedControl
          values={['Unsorted', 'Author', 'Title', 'Year']}
          selectedIndex={this.state.sortIndex}
          style={{marginBottom: 8, marginRight: 20, marginLeft: 20}}
          onChange={(event) => {
            this.setState({
              sortIndex: event.nativeEvent.selectedSegmentIndex,
            })
          }}
        />
        <View style={styles.container}>
          <FlatList
            data={this.formatData(library, numColumns)}
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
    paddingRight: 10,
    paddingLeft: 10,
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

