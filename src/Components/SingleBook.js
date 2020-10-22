import React from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { getBook, setBook, setFavorite } from '../reducers/singleBookReducer'
import { removeBook } from '../reducers/libraryReducer'

const HEIGHT = Dimensions.get('window').height / 3.2

class SingleBook extends React.Component {
  componentDidMount() {
    this.props.getBook()
  }

  render() {
    const { isFavorite } = this.props.book
    return (
      <View style={{ backgroundColor: '#ddbea9', flex: 1 }}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={{marginBottom: 15, marginLeft: 15, fontSize: 20}}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{this.props.book.title.length > 20 ? this.props.book.title.slice(0, 20) + '...' : this.props.book.title}</Text>
          <Text style={styles.invisibleButton}>Back</Text>
        </View>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#fff1e6'
          }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>
            {this.props.book.title} by {this.props.book.author}
          </Text>
          <Text>ID: {this.props.book.BookId}</Text>
          {this.props.book.coverImage === null ? (
            <View style={styles.item}>
              <Text style={styles.itemText}>{this.props.book.title}</Text>
              <Text style={styles.itemText}>{this.props.book.author}</Text>
            </View>
          ) : (
            <Image
              style={{ width: 177, height: HEIGHT, borderRadius: 10 }}
              source={{ uri: this.props.book.coverImage }}
            />
          )}
          <Text style={{ padding: 20 }}>{this.props.book.description}</Text>
          <Button
            title='Remove from Library'
            onPress={() => {
              this.props.removeBook(this.props.book.BookId)
              this.props.setBook('EMPTY')
              this.props.navigation.goBack()
            }}
          />
          <Button
            title={!isFavorite ? 'Add to favorites' : 'Remove from favorites'}
            onPress={() => {
              this.props.setFavorite(this.props.book.BookId, !isFavorite)
            }}
          />
        </ScrollView>
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
  setBook: (bookId) => dispatch(setBook(bookId)),
  setFavorite: (bookId, isFavorite) => dispatch(setFavorite(bookId, isFavorite)),
})

export default connect(mapState, mapDispatch)(SingleBook)

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 15,
    marginTop: 50,
    fontWeight: 'bold'
  },
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
  },
  invisibleButton: {
    color: '#ddbea9',
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 20
  }
})
