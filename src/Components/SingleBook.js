import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class SingleBook extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>
          {this.props.book.title} by {this.props.book.author}
        </Text>
      </View>
    )
  }
}

const mapState = (state) => ({
  book: state.selectedBook
})

export default connect(mapState)(SingleBook)

