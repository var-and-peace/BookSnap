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
import BookForm from './src/Components/BookForm'
// Realm
const Realm = require('realm')
import { LibrarySchema, UserSchema } from './src/db/currentSchemas'

const Tabs = createMaterialBottomTabNavigator()

class App extends React.Component {
  async componentDidMount() {
    const realms = await Realm.open({
      schema: [LibrarySchema, UserSchema],
    })
    return realms
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
                tabBarIcon: () => <Icon name='book' color='white' size={24} />,
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
            <Tabs.Screen
              name='camera'
              component={Camera}
              options={{
                tabBarIcon: () => (
                  <Icon name='camera' color='white' size={24} />
                ),
              }}
            />
            <Tabs.Screen
              name='profile'
              component={Profile}
              options={{
                tabBarIcon: () => <Icon name='user' color='white' size={24} />,
              }}
            />
            <Tabs.Screen
              name='Add a Book'
              component={BookForm}
              options={{
                tabBarIcon: () => <Icon name='bars' color='white' size={24} />,
              }}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
