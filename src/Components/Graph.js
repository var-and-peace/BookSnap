import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { VictoryPie, VictoryTheme } from 'victory-native'
import { connect } from 'react-redux'
import { getBooks } from '../reducers/libraryReducer'
import SegmentedControl from '@react-native-community/segmented-control';

class Graph extends React.Component {
  constructor(){
    super();
    this.state = {selectedIndex: 0};
  }
  dataSetUp(type){
    const libraryData = {}
    const libraryDataArr = []
    if(type === 0){
      this.props.library.forEach((book) => {
        if (libraryData[book.author]) {
          libraryData[book.author]++
        } else {
          libraryData[book.author] = 1
        }
      })
      Object.keys(libraryData).forEach((key) => {
        libraryDataArr.push({
          xValue: key.replace(' ', '\n'),
          yValue: libraryData[key],
        })
      })
      return libraryDataArr.sort(function (authorA, authorB) {
        return authorB.value - authorA.value
      })
      .slice(0, 10)
    } else if(type === 1){
      this.props.library.forEach((book) => {
        if (libraryData[book.genre]) {
          libraryData[book.genre]++
        } else {
          libraryData[book.genre] = 1
        }
      })
      Object.keys(libraryData).forEach((key) => {
        libraryDataArr.push({
          xValue: key.replace(' ', '\n'),
          yValue: libraryData[key],
        })
      })
      return libraryDataArr.sort(function (genreA, genreB) {
        return genreB.value - genreA.value
      })
      .slice(0, 10)
    } else{
      return new Error('That is not right. Invalid segment selection.');
    }
  }
  render() {
    let data = this.dataSetUp(this.state.selectedIndex);
    return (
      <View style={styles.container}>
        <Text>Welcome to Your Top 10</Text>
        <SegmentedControl
        values={['Author', 'Genre']}
        selectedIndex={this.state.selectedIndex}
        onChange={(event) => {
            this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
          }
        }
        />
        <View>
          <VictoryPie
            data={data}
            theme={VictoryTheme.material}
            animate={{ duration: 2000, easing: 'bounce' }}
            labelPosition={'centroid'}
            labelPlacement={({ index }) =>
              index ? 'perpendicular' : 'vertical'
            }
            innerRadius={50}
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
