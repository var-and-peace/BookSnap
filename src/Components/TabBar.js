import React from 'react'
import { Link } from 'react-router-native'
import { View, StyleSheet, Text } from 'react-native'
import Library from './Library'

const styles = StyleSheet.create({
    bar: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      width: "100%",
      justifyContent: "space-around"
    },
    tab: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey'
    },
    one: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    }
})

export default class TabBar extends React.Component {
    render() {
        return (
            <View style={styles.bar}>
                <Link to='/library' style={styles.one}>
                    <Text>1</Text>
                </Link>
                <Link style={styles.tab}>
                    <Text>2</Text>
                </Link>
                <Link style={styles.tab}>
                    <Text>3</Text>
                </Link>
                <Link style={styles.tab}>
                    <Text>4</Text>
                </Link>
                <Link style={styles.tab}>
                    <Text>5</Text>
                </Link>
            </View>
        )
    }
}