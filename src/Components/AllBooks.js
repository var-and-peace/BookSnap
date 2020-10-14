import React from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
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
    componentDidMount(){
        this.props.getBooks()
    }
    formatData(data, numColumns){
        const totalRows = Math.floor(data.length / numColumns)
        let totalLastRow = data.length - (totalRows * numColumns)
        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            data.push({title: 'blank', empty: true})
            totalLastRow++
        }
        return data
    }
    renderBook(book){
        if (book.item.empty){
            return <View style={[styles.item, styles.itemInvisible]}/>
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.setBook(book.item.id)
                this.props.navigation.navigate(book.item.title)
                }
            }>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{book.item.title}</Text>
                    <Text style={styles.itemText}>{book.item.author}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render(){
        return (
          <View style={styles.container}>
            <FlatList
                data={this.formatData(this.props.library, numColumns)}
                renderItem={this.renderBook}
                keyExtractor={(book, index) => index.toString()}
                numColumns={numColumns}
            />
          </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  item: {
    backgroundColor: '#FFC771',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT,
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
  itemText: {
    color: '#fff',
    fontSize: 30
  },
  itemInvisible: {
    backgroundColor: 'transparent'
  }
})

const mapState = (state) => ({
  library: state.library
})

const mapDispatch = (dispatch) => ({
  getBooks: () => dispatch(getBooks()),
  setBook: (bookId) => dispatch(setBook(bookId))
})

export default connect(mapState, mapDispatch)(AllBooks)

