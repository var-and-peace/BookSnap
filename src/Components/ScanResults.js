import React from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

class ScanResults extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello!</Text>
      </View>
    )
  }
}

const mapState = () => ({})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(ScanResults)
