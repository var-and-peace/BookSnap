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
  countForGraph = (value) => {
    const dataObj = {}
    const dataArr = []
    this.props.library.forEach((item) => {
      console.log(this.props.library[0].author)
      if (dataObj[item[value]]) {
        dataObj[item[value]]++
      } else {
        dataObj[item[value]] = 1
      }
    })
    Object.keys(dataObj).forEach((key) => {
      dataArr.push({
        xValue: key.replace(' ', '\n').replace(',', ' &\n'),
        yValue: dataObj[key],
      })
    })
    return value === 'author' || value === 'genres'
      ? dataArr
          .sort((x, y) => {
            return y.yValue - x.yValue
          })
          .slice(0, 10)
      : dataArr
  }

  render() {
    const values = ['author', 'genres', 'isFavorite', 'unread']
    let idx = this.state.statIndex
    let idy = this.state.chartIndex
    let data = this.countForGraph(values[idx])
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
    const colors = ["brown","red", "orange", "yellow","lime", "green", "cyan", "blue","purple", "violet"]
    if(idy === 1){//if it's a bar chart
      for(let i = 0; i < data.length; i++){
        data[i].count = i + 1;
        data[i].color = colors[i];
      }
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
                animate={{ duration: 1500, easing: 'bounce' }}
                domainPadding={20}
                labelPosition={'centroid'}
                labelPlacement={'perpendicular'}
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
                    style={{ data: { fill: ({ datum }) => datum.color}}}
                    animate={{ duration: 800, easing: 'bounce' }}
                    labels={({ datum }) => datum.xValue}
                    labelComponent={<VictoryLabel renderInPortal dx={10} />}
                    x='count'
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
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff1e6',
    justifyContent: 'space-around',
    flex: 1,
  },
  pie: {
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#ddbea9',
  },
})

export default connect(mapState, mapDispatch)(Graph)
