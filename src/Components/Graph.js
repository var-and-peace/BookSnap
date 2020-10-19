import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
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
      libraryDataArr.push({
        author: key.replace(' ', '\n'),
        value: libraryData[key],
      })
    })
    const data = libraryDataArr
      .sort(function (authorA, authorB) {
        return authorB.value - authorA.value
      })
      .slice(0, 10)
    return (
      <View style={styles.container}>
        <Text>Welcome to Your Top 10</Text>
          <Text>Authors!</Text>
        <View>
          <VictoryPie
            data={data}
            theme={VictoryTheme.material}
            animate={{ duration: 2000, easing: 'bounce' }}
            labelPosition={'centroid'}
            labelPlacement={({ index }) =>
              index ? 'perpendicular' : 'vertical'
            }
            x='author'
            y='value'
          />
        </View>
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

const styles = StyleSheet.create({
  pie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect(mapState, mapDispatch)(Graph)
