import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import ip_address from '../../ip_address'
import { getScanResults } from '../reducers/scanReducer'
import { connect } from 'react-redux'

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  '../../edge_detection_server/booksnap-service_account.json'

class PhotoCamera extends React.PureComponent {
  state = {
    type: RNCamera.Constants.Type.back,
    wordList: [],
    base64: '',
  }

  flipCamera = () =>
    this.setState({
      type:
        this.state.type === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
    })

  takePhoto = async () => {
    const options = {
      quality: 0.5,
      base64: true,
    }
    const picture = await this.camera.takePictureAsync(options)
    this.setState({ base64: picture.base64 })
    try {
      const res = await axios.post(`http://${ip_address}:3000/sd_api`, {
        base64: picture.base64,
      })
      this.props.getScanResults(res.data.message)
    } catch (error) {
      console.error(error)
    }
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
        />
        <View style={styles.cameraButton}>
          <TouchableOpacity onPress={this.takePhoto}>
            <Icon name='circle' size={50} color='orange' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapState = (state) => ({
  scanResults: state.scanResults,
})

const mapDispatch = (dispatch) => ({
  getScanResults: (data) => dispatch(getScanResults(data)),
})

export default connect(mapState, mapDispatch)(PhotoCamera)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  cameraButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topButtons: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bottomButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flipButton: {
    alignSelf: 'flex-end',
  },
  recordingButton: {
    width: 10,
    height: 10,
  },
})
