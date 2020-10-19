import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import Camera from './Camera'
import ScanResults from './ScanResults'
import Profile from './Profile'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'

const MaterialTopTabs = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

class Scanner extends React.Component {
  render() {
    return (
      <MaterialTopTabs.Navigator style={style.topTab}>
        <MaterialTopTabs.Screen
          name='Camera'
          component={Camera}
          style={style.tab}
        />
        <MaterialTopTabs.Screen
          name='Results'
          component={Profile}
          style={style.tab}
        />
      </MaterialTopTabs.Navigator>
    )
  }
}

const style = {
  topTab: {
    paddingTop: 50,
    backgroundColor: '#F4F1EA',
  },
  tab: {
    color: 'blue !important',
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
