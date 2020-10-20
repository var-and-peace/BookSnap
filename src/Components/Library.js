import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import SingleBook from './SingleBook'
import BookForm from './BookForm'
import AllBooks from './AllBooks'

const Stack = createStackNavigator()

class Library extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Library'
          component={AllBooks}
        />
        {this.props.library.map((book) => {
          return (
            <Stack.Screen
              key={book.BookId}
              name={book.title}
              component={SingleBook}
            />
          )
        })}
        <Stack.Screen name='Add Book' component={BookForm} />
      </Stack.Navigator>
    )
  }
}

const mapState = (state) => ({
  library: state.library,
  scanResults: state.scanResults,
})

const mapDispatch = (dispatch) => ({
  getBooks: () => dispatch(getBooks()),
})

export default connect(mapState, mapDispatch)(Library)
