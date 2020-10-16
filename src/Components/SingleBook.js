import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { getBook } from '../reducers/singleBookReducer'

class SingleBook extends React.Component {
  componentDidMount() {
    this.props.getBook()
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
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
  book: state.selectedBook,
})

const mapDispatch = (dispatch) => ({
  getBook: () => dispatch(getBook()),
})

export default connect(mapState, mapDispatch)(SingleBook)
