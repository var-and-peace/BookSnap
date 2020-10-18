import React from 'react'
import { Text, View } from 'react-native'
import { VictoryPie, VictoryTheme } from 'victory-native'
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
        <svg viewBox={"0 0 width, height"}>
          <VictoryPie
            data={libraryDataArr}
            theme={VictoryTheme.material}
            animate={{ duration: 2000, easing: 'bounce' }}
            labelPosition={({ index }) => index
              ? "centroid"
              : "startAngle"
            }
            labelPlacement={({ index }) => index
              ? "perpendicular"
              : "vertical"
            }
            x='author'
            y='value'
          />
        </svg>
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
