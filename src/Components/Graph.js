import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import {
  VictoryPie,
  VictoryTheme,
  VictoryBar,
  VictoryArea,
  VictoryChart,
  VictoryLabel
} from 'victory-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import SegmentedControl from '@react-native-community/segmented-control'

class Graph extends React.Component {
  constructor() {
    super()
    this.state = { statIndex: 0, chartIndex: 0 }
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
    const idx = this.state.statIndex
    const data = this.countForPie(values[idx])
    const width = Dimensions.get('window').width
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Your Library Statistics</Text>
        <View style={{ width: width * 0.95, alignSelf: 'center' }}>
          <SegmentedControl
            values={['Author', 'Genres', 'Favorites', 'Unread']}
            selectedIndex={this.state.statIndex}
            onChange={(event) => {
              this.setState({
                statIndex: event.nativeEvent.selectedSegmentIndex,
              })
            }}
          />
        </View>
        <View style={styles.pie}>
          {this.state.chartIndex === 0 && (
            <VictoryPie
              width={width * 0.95}
              data={data}
              theme={VictoryTheme.material}
              animate={{ duration: 1000, easing: 'bounce' }}
              domainPadding={20}
              labelPosition={'centroid'}
              labelPlacement={({ index }) =>
                index ? 'perpendicular' : 'vertical'
              }
              innerRadius={width * 0.2}
              x='xValue'
              y='yValue'
            />
          )}
          {this.state.chartIndex === 1 && (
              <VictoryChart
                theme={VictoryTheme.material}
                width={width * 0.9}
                domainPadding={20}
              >
                <VictoryBar
                  horizontal
                  data={data}
                  labels={({ datum }) => datum.xValue}
                  labelComponent={<VictoryLabel renderInPortal dx={10} />}
                  y='yValue'
                />
              </VictoryChart>
          )}
          {this.state.chartIndex === 2 && (
            <VictoryChart polar>
              <VictoryArea
                data={data}
                labels={({ datum }) => {datum.xValue}}
                x='xValue'
                y='yValue'
              />
            </VictoryChart>
          )}
        </View>
        <View>
          <SegmentedControl
            values={['Pie Chart', 'Bar Chart', 'Polar Chart']}
            selectedIndex={this.state.chartIndex}
            onChange={(event) => {
              this.setState({
                chartIndex: event.nativeEvent.selectedSegmentIndex,
              })
            }}
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
