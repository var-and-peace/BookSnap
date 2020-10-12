import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
})

class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text>App Name</Text>
                    <Text>Content</Text>
                </View>
            </View> 
        )
    }
}

export default Main