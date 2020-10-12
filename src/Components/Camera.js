import React from 'react';
import { Text, View } from 'react-native';

class Camera extends React.Component {
    render(){
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text>Welcome to Camera!</Text>
          </View>
        )
    }
}
export default Camera;