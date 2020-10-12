import React from 'react';
import { Text, View } from 'react-native';

class Graph extends React.Component {
    render(){
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text>Welcome to Graphs!</Text>
          </View>
        )
    }
}
export default Graph;