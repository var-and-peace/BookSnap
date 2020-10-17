import React from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import { addBook } from '../reducers/libraryReducer'

const BookForm = (props) => {
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = (searchQuery) => {
    props.addBookData(searchQuery)
    props.navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text>Search</Text>
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

      <Button title='Submit' onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
})

const mapDispatch = (dispatch) => ({
  addBookData: (book) => {
    dispatch(addBook(book))
  },
})

const connectedBookForm = connect(null, mapDispatch)(BookForm)

export default connectedBookForm
