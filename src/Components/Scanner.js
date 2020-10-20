import React from 'react'
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
        <SegmentedControl
          values={['One', 'Two']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex,
            })
          
          }}
          style={style.segmentedTabContainer}
        />
        <MaterialTopTabs.Navigator
          style={style.tabContainer}
          tabBarOptions={{ style: style.individualTab }}
        >
          <MaterialTopTabs.Screen name='Camera' component={Camera} />
          <MaterialTopTabs.Screen name='Results' component={Profile} />
        </MaterialTopTabs.Navigator>
      </React.Fragment>
    )
  }
}

const style = {
  tabContainer: {
    paddingTop: 100,
    backgroundColor: '#F4F1EA',
    activeTintColor: 'red',
  },
  individualTab: {
    backgroundColor: '#F4F1EA',
  },
  segmentedTabContainer: {
    paddingTop: 100
  }
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
