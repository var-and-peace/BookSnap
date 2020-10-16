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
import Camera from './src/Components/Camera'
import Profile from './src/Components/Profile'
import Extras from './src/Components/Extras'
import BookForm from './src/Components/BookForm'
// Realm
const Realm = require('realm')
import {
  LIBRARY_SCHEMA,
  USER_SCHEMA,
  LibrarySchema,
  UserSchema,
} from './src/db/schemas'


const Tabs = createMaterialBottomTabNavigator()

class App extends React.Component {
  async componentDidMount() {
    const library = await Realm.open({
      schema: [LibrarySchema],
    })
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tabs.Navigator
            barStyle={{ backgroundColor: 'rgb(50,50,50)' }}
            tabBarOptions={{ showIcon: true }}
            labeled={false}
          >
            <Tabs.Screen
              name='library'
              component={Library}
              options={{
                tabBarIcon: (tabInfo) => (
                  <Icon name='book' color='white' size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name='graph'
              component={Graph}
              options={{
                tabBarIcon: (tabInfo) => (
                  <Icon name='area-chart' color='white' size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name='camera'
              component={Camera}
              options={{
                tabBarIcon: (tabInfo) => (
                  <Icon name='camera' color='white' size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name='profile'
              component={Profile}
              options={{
                tabBarIcon: (tabInfo) => (
                  <Icon name='user' color='white' size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name='Add a Book'
              component={BookForm}
              options={{
                tabBarIcon: (tabInfo) => (
                  <Icon name='bars' color='white' size={24} />
                ),
              }}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

const styles = {
  navContainer: {
    margin: 0,
    padding: 0,
  },
}

export default App
