import React from 'react'
import { Text, View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryPie } from 'victory-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
]

class Graph extends React.Component {
  render() {
    const libraryData = {}
    const libraryDataArr = []
    this.props.library.forEach(book => {
      if (libraryData[book.author]) {
        libraryData[book.author] ++
      }
      else {
        libraryData[book.author] = 1
      }
    })
    Object.keys(libraryData).forEach(key => {
      libraryDataArr.push({ author: key, value: libraryData[key]})
    })
    console.log(libraryDataArr)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Welcome to Graphs!</Text>
        <VictoryPie data={libraryDataArr} x='author' y='value'/>
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
