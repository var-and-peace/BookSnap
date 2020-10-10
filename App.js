/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  topButtons: {
    flex: 1,
    alignItems: 'flex-start'
  },
  bottomButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  flipButton: {
    alignSelf: 'flex-end'
  },
  recordingButton: {
    marginTop: 10,
    alignSelf: 'center'
  }
})

class PhotoCamera extends React.PureComponent {
  state = {
    type: RNCamera.Constants.Type.back
  }

  flipCamera = () =>
    this.setState({
      type:
        this.state.type === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back
    })

  takePhoto = async () => {
    const options = {
      quality: 0.5,
    }
    const data = await this.camera.takePictureAsync(options)
    const fileLocation = data.uri.split('//')[1]
    console.log(fileLocation)
  }
  render() {
    const { type } = this.state
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam
          }}
          type={type}
          style={styles.preview}
          captureAudio={false}
          onTextRecognized={(data) => console.log(data.textBlocks)}
        />
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={this.takePhoto}
            style={styles.recordingButton}
          >
            <Icon name='camera' size={50} color='orange' />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.flipCamera} style={styles.flipButton}>
            <Icon name='refresh' size={35} color='orange' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default PhotoCamera
