import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import SingleBook from './SingleBook'
import AllBooks from './AllBooks'

const Stack = createStackNavigator()

class Library extends React.Component {
  render() {
    return (
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Library'
          component={AllBooks}
        />
        {this.props.library.map((book) => {
          return ( 
            <Stack.Screen
              key={book.BookId}
              name={book.BookId}
              component={SingleBook}
            />
          )
        })}
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
