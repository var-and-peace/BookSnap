import React from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView } from 'react-native'
import { getScanResults, removeScanItems } from '../reducers/scanReducer'
import {
  addScanSelection,
  resetScanSelection,
} from '../reducers/scanSelectReducer'

import BookCard from './BookCard'
import { TouchableOpacity } from 'react-native-gesture-handler'

class ScanResults extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { scanSelection, scanResults } = this.props
    console.log('length comparison', scanSelection.length, scanResults.length)
    return (
      <View style={style.resultContainer}>
        <ScrollView>
          <View style={style.resultHeader}>
            <TouchableOpacity
              onPress={() => {
                this.props.removeScanItems(scanSelection)
                this.props.resetScanSelection()
              }}
              style={{
                // borderWidth: 2,
                margin: 5,
                borderRadius: 9,
                backgroundColor: '#ddbea9',
                borderColor: '#ddbea9',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  padding: 5,
                  // color: 'white',
                  fontWeight: 'bold',
                  // borderColor: 'blue',
                }}
              >
                Clear Selected
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (scanSelection.length !== scanResults.length) {
                  const scanSelectionIds = scanSelection.map(
                    (book) => book.BookId
                  )
                  scanResults.map((book) => {
                    if (!scanSelectionIds.includes(book.BookId)) {
                      this.props.addScanSelection(book)
                    }
                  })
                } else {
                  this.props.resetScanSelection()
                }
              }}
              style={{
                // borderWidth: 2,
                margin: 5,
                borderRadius: 9,
                backgroundColor: '#ddbea9',
                borderColor: '#ddbea9',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  padding: 5,
                  // color: 'white',
                  fontWeight: 'bold',
                  // borderColor: 'blue',
                }}
              >
                {scanSelection.length === scanResults.length
                  ? 'Deselect All'
                  : 'Select All'}
              </Text>
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
}

const mapState = (state) => ({
  scanResults: state.scanResults,
  scanSelection: state.scanSelection,
})

const mapDispatch = (dispatch) => ({
  getScanResults: (queries) => dispatch(getScanResults(queries)),
  addScanSelection: (book) => dispatch(addScanSelection(book)),
  resetScanSelection: () => dispatch(resetScanSelection()),
  removeScanItems: (books) => dispatch(removeScanItems(books)),
})

export default connect(mapState, mapDispatch)(ScanResults)
