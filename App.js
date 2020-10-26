// React
import React from 'react'
// React-Redux
import { Provider } from 'react-redux'
import store from './src/store'
// React-Navigator
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
// Components
import Library from './src/Components/Library'
import Graph from './src/Components/Graph'
import Scanner from './src/Components/Scanner'
import BookForm from './src/Components/BookForm'
// Orientation
import Orientation from 'react-native-orientation'

const Tabs = createMaterialBottomTabNavigator()

class App extends React.Component {
  componentDidMount() {
    Orientation.lockToPortrait()
    console.disableYellowBox = true
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tabs.Navigator
            barStyle={{ backgroundColor: '#774936', borderTopWidth: 0 }}
            tabBarOptions={{ showIcon: true }}
            labeled={false}
          >
            <Tabs.Screen
              name='library'
              component={Library}
              options={{
                tabBarIcon: () => <Icon name='book' color='white' size={24} />,
              }}
            />
            <Tabs.Screen
              name='Search'
              component={BookForm}
              options={{
                tabBarIcon: () => (
                  <Icon name='search' color='white' size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name='camera'
              component={Scanner}
              options={{
                tabBarIcon: () => (
                  <Icon name='camera' color='white' size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name='graph'
              component={Graph}
              options={{
                tabBarIcon: () => (
                  <Icon name='area-chart' color='white' size={24} />
                ),
              }}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
