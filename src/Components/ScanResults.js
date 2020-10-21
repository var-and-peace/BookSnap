import React from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView } from 'react-native'
import { getScanResults } from '../reducers/scanReducer'

import BookCard from './BookCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  addScanSelection,
  removeScanSelection,
} from '../reducers/scanSelectReducer'

class ScanResults extends React.Component {
  render() {
    return (
      <View style={style.resultContainer}>
        <ScrollView>
          <View style={style.resultHeader}>
            <TouchableOpacity>
              <Text style={{ fontSize: 17, padding: 7.7 }}>Select All</Text>
            </TouchableOpacity>
          </View>
          <View>
            {this.props.scanResults.map((book) => (
              <BookCard
                book={book}
                checkList={true}
                toggleSelection={this.toggleSelection}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const style = {
  resultContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff1e6',
  },
  resultHeader: {
    backgroundColor: '#fff1e6',
    borderColor: '#c38e70',
    borderBottomWidth: 0.5,
  },
}

const mapState = (state) => ({
  scanResults: state.scanResults,
  scanSelection: state.scanSelection,
})

const mapDispatch = (dispatch) => ({
  getScanResults: (queries) => dispatch(getScanResults(queries)),
})

export default connect(mapState, mapDispatch)(ScanResults)
