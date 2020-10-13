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
import Orientation from 'react-native-orientation'

class PhotoCamera extends React.PureComponent {
  state = {
    type: RNCamera.Constants.Type.back,
    wordList: [],
    base64: ''
  }

  componentDidMount() {
    console.log('Camera mounts')
    Orientation.lockToPortrait()
    this.props.navigation.addListener('blur', () =>
      Orientation.unlockAllOrientations()
    )
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
      base64: true
    }
    const picture = await this.camera.takePictureAsync(options)
    const pictureLocation = picture.uri.split('//')[1]
    // console.log('HERE IS WHERE THE PICTURE IS LOCATED', pictureLocation)
    console.log('BASE 64', picture.base64)
    this.setState({ base64: picture.base64 })
  }

  onTextFound = (data) => {
    let foundWords = []
    if (data && data.textBlocks && data.textBlocks.length > 0) {
      for (let i = 0; i < data.textBlocks.length; i++) {
        let text = data.textBlocks[i].value
        if (text && text.trim().length > 0) {
          let words = text.split(/[\s,.?]+/)
          if (words && words.length > 0) {
            for (let j = 0; j < words.length; j++) {
              if (words[j].trim().length > 0) {
                foundWords.push(words[j])
              }
            }
          }
        }
      }
      this.setState({ wordList: foundWords })
      console.log(this.state)
    }
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
          // onTextRecognized={(data) => this.onTextFound(data)}
        />
        <View style={styles.cameraButton}>
          <TouchableOpacity onPress={() => this.takePhoto()}>
            <Icon name='circle' size={50} color='orange' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default PhotoCamera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  cameraButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
    width: 10,
    height: 10
  }
})
