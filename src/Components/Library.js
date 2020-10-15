import React from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import SingleBook from './SingleBook'
import AllBooks from './AllBooks'

const Stack = createStackNavigator()

class Library extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Library' component={AllBooks} />
        {this.props.library.map((book) => {
          return (
            <Stack.Screen
              key={book.id}
              name={book.title}
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
})

const mapDispatch = (dispatch) => ({
  getBooks: () => dispatch(getBooks()),
})

export default connect(mapState, mapDispatch)(Library)
