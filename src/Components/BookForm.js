import React from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import { addBook } from '../reducers/libraryReducer'
import { searchBooks } from '../reducers/searchReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BookCard from './BookCard'

const BookForm = (props) => {
  const { control, handleSubmit, errors } = useForm()
  const onSearch = (searchQuery) => {
    props.searchBooks(searchQuery)
  }
  const onAdd = (book) => {
    props.addBook(book)
    props.navigation.navigate('Library')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
      <View style={styles.inputView}>
        <Controller
          control={control}
          style={styles.input}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name='searchQuery'
          defaultValue=''
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSearch)}
        >
          <Text style={{ color: 'white' }}>Submit</Text>
        </TouchableOpacity>
      </View>
      {props.results.length ? (
        <ScrollView style={{ backgroundColor: '#fff1e6' }}>
          {props.results.map((book) => {
            return <BookCard key={book.BookId} book={book} checkList={false} addBook={onAdd} />
          })}
        </ScrollView>
      ) : (
        <View style={{flex: 1, backgroundColor: '#fff1e6'}}/>
      )}
    </View>
  )
}

const mapState = (state) => ({
  results: state.searchResults,
})

const mapDispatch = (dispatch) => ({
  addBook: (book) => dispatch(addBook(book)),
  searchBooks: (input) => dispatch(searchBooks(input)),
})

const connectedBookForm = connect(mapState, mapDispatch)(BookForm)

export default connectedBookForm

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 5,
    marginTop: 50,
    fontWeight: 'bold'
  },
  container: {
    flexDirection: 'column',
    backgroundColor: '#ddbea9',
    flex: 1,
  },
  inputView: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 10,
    backgroundColor: 'rgb(50,50,50)',
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 305,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
})
