import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import Camera from './Camera'
import ScanResults from './ScanResults'
import Profile from './Profile'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import SegmentedControl from '@react-native-community/segmented-control'

const MaterialTopTabs = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

class Scanner extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
    }
  }
  render() {
    return (
      <React.Fragment>
        <View style={style.scannerHeader}>
          <Text style={style.scannerTitle}>BookSnap</Text>
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
        {this.state.selectedIndex === 0 ? <Camera /> : <ScanResults />}
      </React.Fragment>
    )
  }
}

const style = {
  scannerHeader: {
    paddingTop: 58,
    backgroundColor: '#ddbea9',
  },
  scannerTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 18,
  },
  segmentedTabContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 8,
  },
}

const mapState = (state) => ({
  scanResults: state.scanResults,
})

export default connect(mapState)(Scanner)
