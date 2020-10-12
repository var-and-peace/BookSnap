import React from 'react';
import { Text, View } from 'react-native';

class Library extends React.Component {
    render(){
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text>Welcome to Your Library!</Text>
          </View>
        )
    }
}
export default Library 