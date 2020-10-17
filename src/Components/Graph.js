import React from 'react'
import { Text, View } from 'react-native'
import { VictoryPie } from 'victory-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'

class Graph extends React.Component {
  render() {
    const libraryData = {}
    const libraryDataArr = []
    this.props.library.forEach((book) => {
      if (libraryData[book.author]) {
        libraryData[book.author]++
      } else {
        libraryData[book.author] = 1
      }
    })
    Object.keys(libraryData).forEach((key) => {
      libraryDataArr.push({ author: key, value: libraryData[key] })
    })
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Welcome to Graphs!</Text>
        <VictoryPie data={libraryDataArr} x='author' y='value' />
      </View>
    )
  }
}

const mapState = (state) => ({
  library: state.library,
})

const mapDispatch = (dispatch) => ({
  getBooks: () => dispatch(getBooks()),
})

export default connect(mapState, mapDispatch)(Graph)
