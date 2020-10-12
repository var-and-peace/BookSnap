import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import Library from './src/Components/Library'
import Graph from './src/Components/Graph'
import Camera from './src/Components/Camera'
import Profile from './src/Components/Profile'
import Extras from './src/Components/Extras'

const Tabs = createMaterialBottomTabNavigator()

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tabs.Navigator
          barStyle={{ backgroundColor: 'black'}}
          tabBarOptions={{ showIcon: true }}
          labeled={false}
        >
          <Tabs.Screen 
            name='library'
            component={Library} 
            options={{ tabBarIcon:(tabInfo) => (<Icon
              name="book"
              color='white'
              size={24}
            />)}}
          />
          <Tabs.Screen 
            name='graph' 
            component={Graph}
            options={{ tabBarIcon:(tabInfo) => (<Icon
              name="area-chart"
              color='white'
              size={24}
            />)}}
          />
          <Tabs.Screen 
            name='camera' 
            component={Camera}
            options={{ tabBarIcon:(tabInfo) => (<Icon
              name="camera"
              color='white'
              size={24}
            />)}}
          />
          <Tabs.Screen 
            name='profile' 
            component={Profile}
            options={{ tabBarIcon:(tabInfo) => (<Icon
              name="user"
              color='white'
              size={24}
            />)}}
          />
          <Tabs.Screen 
            name='extras' 
            component={Extras}
            options={{ tabBarIcon:(tabInfo) => (<Icon
              name="bars"
              color='white'
              size={24}
            />)}}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
