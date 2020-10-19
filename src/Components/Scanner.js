import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import Camera from './Camera'
import ScanResults from './ScanResults'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const MaterialTopTabs = createMaterialTopTabNavigator();
const Stack = createStackNavigator()

class Scanner extends React.Component {
  render() {
    return (
        <MaterialTopTabs.Navigator>
            <MaterialTopTabs.Screen name="Camera" component={Camera} />
            <MaterialTopTabs.Screen name="Results" component={ScanResults} />
        </MaterialTopTabs.Navigator>
    )
  }
}

const mapState = (state) => ({
  scanResults: state.scanResults,
})

export default connect(mapState)(Scanner)
