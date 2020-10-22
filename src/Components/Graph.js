import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import {
  VictoryPie,
  VictoryTheme,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from 'victory-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import SegmentedControl from '@react-native-community/segmented-control'

class Graph extends React.Component {
  constructor() {
    super()
    this.state = { statIndex: 0, chartIndex: 0, selected: false }
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
    let data = this.countForPie(values[idx])
    if (idx === 2) {
      data = data.map((obj) => {
        if (obj.xValue === 'true') {
          //if favorite is true
          obj.xValue = 'Favorites'
        } else {
          obj.xValue = 'Other Books'
        }
        return obj
      })
    }
    if (idx === 3) {
      data = data.map((obj) => {
        if (obj.xValue === 'false') {
          //if read is true
          obj.xValue = 'Read'
        } else {
          obj.xValue = 'Unread'
        }
        return obj
      })
    }
    const width = Dimensions.get('window').width
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Your Library Statistics</Text>
        </View>
        <View style={styles.container}>
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
                labelPlacement={'perpendicular'
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
          </View>
          <View>
            <SegmentedControl
              values={['Pie Chart', 'Bar Chart']}
              selectedIndex={this.state.chartIndex}
              onChange={(event) => {
                this.setState({
                  chartIndex: event.nativeEvent.selectedSegmentIndex,
                })
              }}
            />
          </View>
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
    paddingBottom: 15,
    marginTop: 50,
    fontWeight: 'bold'
  },
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff1e6',
    justifyContent: 'space-around',
    flex: 1
  },
  pie: {
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#ddbea9',
  }
})

export default connect(mapState, mapDispatch)(Graph)
