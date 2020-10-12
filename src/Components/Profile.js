import React from 'react';
import { Text, View } from 'react-native';

class Profile extends React.Component {
    render(){
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text>Welcome to Your Profile!</Text>
          </View>
        )
    }
}
export default Profile;