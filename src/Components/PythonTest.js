import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'

class Profile extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Welcome to Your Profile!</Text>
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

export default connect(mapState, mapDispatch)(Profile)
