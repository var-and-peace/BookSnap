import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { VictoryPie, VictoryTheme } from 'victory-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import SegmentedControl from '@react-native-community/segmented-control'

class Graph extends React.Component {
  constructor() {
    super()
    this.state = { selectedIndex: 0 }
  }
  countForPie = (value) => {
    const dataObj = {}
    const dataArr = []
    this.props.library.forEach((item) => {
      if (dataObj[item[value]]) {
        dataObj[item[value]]++
      } else {
        dataObj[item[value]] = 1
      }
    })
    Object.keys(dataObj).forEach((key) => {
      dataArr.push({
        xValue: key.replace(' ', '\n'),
        yValue: dataObj[key],
      })
    })
    return value === 'author' || value === 'genres'
      ? dataArr
          .sort((x, y) => {
            return y.value - x.value
          })
          .slice(0, 10)
      : dataArr
  }

  render() {
    const values = ['author', 'genres', 'isFavorite', 'unread']
    const idx = this.state.selectedIndex
    const data = this.countForPie(values[idx])
    const width = Dimensions.get('window').width
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Your Library Statistics</Text>
        <View style={{ width: width * 0.95, alignSelf: 'center' }}>
          <SegmentedControl
            values={['Author', 'Genres', 'Favorites', 'Unfinished']}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              })
            }}
          />
        </View>
        <View style={styles.pie}>
          <VictoryPie
            width={width * 0.95}
            data={data}
            theme={VictoryTheme.material}
            animate={{ duration: 1000, easing: 'bounce' }}
            labelPosition={'centroid'}
            labelPlacement={({ index }) =>
              index ? 'perpendicular' : 'vertical'
            }
            innerRadius={width * 0.2}
            x='xValue'
            y='yValue'
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20,
  },
  container: {
    flexDirection: 'column',
    marginTop: 50,
  },
  pie: {
    alignItems: 'center',
  },
})

export default connect(mapState, mapDispatch)(Graph)
