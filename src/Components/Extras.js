import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'

class Extras extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Welcome to Extras!</Text>
      </View>
    )
  }
}

const mapState = (state) => ({
  library: state.library
})

const mapDispatch = (dispatch) => ({
  getBooks: () => dispatch(getBooks())
})

export default connect(mapState, mapDispatch)(Extras)

