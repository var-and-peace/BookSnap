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
import { TouchableOpacity } from 'react-native-gesture-handler'

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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent:
                this.state.selectedIndex === 0 ? 'center' : 'space-between',
            }}
          >
            {this.state.selectedIndex === 1 && (
              <Text style={style.dummyText}>Shelve (2)</Text>
            )}
            <Text style={style.scannerTitle}>Snap Books</Text>
            {this.state.selectedIndex === 1 && (
              <TouchableOpacity style={style.addToLibraryContainer}>
                <Text style={style.addToLibrary}>Shelve (2)</Text>
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
  dummyText: {
    color: '#ddbea9',
    fontSize: 20,
  },
  scannerTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 18,
    borderColor: 'blue',
    // flexGrow: 1,
    padding: 0,
  },
  addToLibrary: {
    fontSize: 20,
    flex: 1,
  },
  addToLibraryContainer: {
    // marginBottom: 18,
    // borderWidth: 2,
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

const mapState = (state) => ({
  scanResults: state.scanResults,
})

export default connect(mapState)(Scanner)
// import * as React from 'react'
// import { Text, View } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   )
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   )
// }

// const Tab = createMaterialTopTabNavigator()

// export default function Scanner() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name='Home' component={HomeScreen} />
//       <Tab.Screen name='Settings' component={SettingsScreen} />
//     </Tab.Navigator>
//   )
// }
