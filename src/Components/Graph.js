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
    const data = libraryDataArr.sort(function(authorA,authorB){return authorB.value-authorA.value}).slice(0,9);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Welcome to Your Top 10</Text>
        <Text>Authors!</Text>
          <VictoryPie
            width="100%"
            height="auto"
            data={data}
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
