import React from 'react'
import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import { addBookFromResults } from '../reducers/libraryReducer'
import { searchBooks } from '../reducers/scanReducer'

const BookForm = (props) => {
  const { control, handleSubmit, errors } = useForm()
  const onSearch = (searchQuery) => {
    props.searchBooks(searchQuery)
    // props.navigation.navigate('Library')
  }
  const onAdd = (book) => {
    props.addBook(book)
    // props.navigation.navigate('Library')
  }
  console.log(props.results)
  return (
    <View style={styles.main}>
      <View style={styles.container}>
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
          rules={{ required: true }}
          defaultValue=''
        />
        {errors.searchQuery && <Text>This is required.</Text>}
        <Pressable style={styles.button} onPress={handleSubmit(onSearch)}>
          <Text style={{color: 'white'}}>Search</Text>
        </Pressable>
      </View>
      {props.results.length ? (
        <View style={{padding: 20}}>
          {
            props.results.map((book) => {
              return (
                <View>
                  <Text>{book.title} by {book.author}</Text>
                  <Pressable style={styles.button} onPress={() => onAdd(book)}>
                    <Text style={{color: 'white'}}>+</Text>
                  </Pressable>
                </View>
              )
            })
          }
        </View>
      ) : (
        <View/>
      )}
    </View>   
  )
}

const mapState = state => ({
  results: state.scanResults
})

const mapDispatch = (dispatch) => ({
  addBook: (book) => dispatch(addBookFromResults(book)),
  searchBooks: (input) => dispatch(searchBooks(input))
})

const connectedBookForm = connect(mapState, mapDispatch)(BookForm)

export default connectedBookForm

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: 'space-between'
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    borderRadius: 10,
    backgroundColor: 'rgb(50,50,50)',
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})