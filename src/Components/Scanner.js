import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Camera from './Camera'
import ScanResults from './ScanResults'
import { addSelectedBooks } from '../reducers/libraryReducer'
import { resetScanSelection } from '../reducers/scanSelectReducer'
import { removeScanItems } from '../reducers/scanReducer'
import SegmentedControl from '@react-native-community/segmented-control'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Scanner extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      loadingResults: false,
    }
    this.startLoading = this.startLoading.bind(this)
    this.finishLoading = this.finishLoading.bind(this)
  }

  startLoading() {
    this.setState({ loadingResults: true })
  }

  finishLoading() {
    this.setState({ loadingResults: false })
  }

  render() {
    const scanSelection = this.props.scanSelection
    console.log(scanSelection)
    return (
      <React.Fragment>
        <View style={style.scannerHeader}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent:
                this.state.selectedIndex !== 1 ? 'center' : 'space-between',
            }}
          >
            {this.state.selectedIndex === 1 && (
              <Text style={style.dummyText}>
                Add
                {scanSelection.length !== 0 && ` (${scanSelection.length})`}
              </Text>
            )}
            <Text style={style.scannerTitle}>BookSnap</Text>
            {this.state.selectedIndex === 1 && (
              <TouchableOpacity
                style={style.addToLibraryContainer}
                onPress={async () => {
                  await this.props.addSelectedBooks()
                  let ids = scanSelection.map((book) => book.BookId)
                  let scanResultsFiltered = this.props.scanResults.filter(
                    (book) => ids.includes(book.BookId)
                  )
                  this.props.removeScanItems(scanResultsFiltered)
                  this.props.resetScanSelection()
                }}
              >
                <Text style={style.addToLibrary}>
                  Add
                  {scanSelection.length !== 0 ? (
                    ` (${scanSelection.length})`
                  ) : (
                    <View />
                  )}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <SegmentedControl
            values={['Camera', 'Results']}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              })
            }}
            style={style.segmentedTabContainer}
          />
        </View>
        {
          [
            <Camera
              startLoading={this.startLoading}
              finishLoading={this.finishLoading}
            />,
            <ScanResults loadingResults={this.state.loadingResults} />,
          ][this.state.selectedIndex]
        }
      </React.Fragment>
    )
  }
}

const mapState = (state) => ({
  scanResults: state.scanResults,
  scanSelection: state.scanSelection,
})

const mapDispatch = (dispatch) => ({
  addSelectedBooks: (books) => dispatch(addSelectedBooks(books)),
  resetScanSelection: () => dispatch(resetScanSelection()),
  removeScanItems: (books) => dispatch(removeScanItems(books)),
})

export default connect(mapState, mapDispatch)(Scanner)

const style = {
  scannerHeader: {
    paddingTop: 50,
    backgroundColor: '#ddbea9',
  },
  dummyText: {
    color: '#ddbea9',
    fontSize: 17,
    marginLeft: 15,
    marginTop: 2,
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    borderColor: 'blue',
    padding: 0,
  },
  addToLibrary: {
    fontSize: 17,
    flex: 1,
    marginRight: 15,
    marginTop: 2,
  },
  addToLibraryContainer: {
    alignItems: 'center',
    marginBottom: 18,
    flexGrow: 1,
    width: 'auto',
  },
  segmentedTabContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 8,
  },
}
