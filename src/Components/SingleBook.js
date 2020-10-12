import React from 'react';
import { Text, View } from 'react-native';

class SingleBook extends React.Component {
    render(){
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text>Welcome to SingleBooks!</Text>
          </View>
        )
    }
}
export default SingleBook;