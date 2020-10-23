// import React, { useRef, useEffect, useState } from 'react'
// import { View, Text, Animated } from 'react-native'
// import Spinner from 'react-native-loading-spinner-overlay'
// import AnimatedEllipsis from 'react-native-animated-ellipsis'
// import * as Animatable from 'react-native-animatable'

// const quotes = [
//   'Patience is next to Godliness.',
//   'Please wait while we shred your books',
//   'Your scanned books will soon be detextified',
// ]

// /*

// Animated.loop(
//   Animated.sequence([
//     Animated.delay(3000),
//     Animated.timing(this.state.width, {
//       toValue: 400,
//       duration: 2000
//     })
//   ]),
//   {
//     iterations: 10
//   }
// ).start()
// */

// const ScanLoadingScreen = () => {
//   console.disableYellowBox = true
//   //   let [currIndex, nextIndex] = useState(0)
//   //   useEffect(() => {
//   //     const interval = setInterval(
//   //       () => nextIndex((currIndex + 1) % quotes.length),
//   //       3000
//   //     )
//   //     return () => {
//   //       clearInterval(interval)
//   //     }
//   //   })

//   const currIndex = 0
//   const textOpacity = 0
//   Animated.loop(
//     Animated.sequence([
//       Animated.delay(3000),
//       Animated.timing(textOpacity, {
//         toValue: 400,
//         duration: 2000,
//       }),
//     ]),
//     {
//       iterations: 10,
//     }
//   ).start()

//   console.log('RENDERS', currIndex)
//   return (
//     <View style={style.screen}>
//       <Animated.Text style={{ opacity: textOpacity }}>Hello</Animated.Text>
//       {/* <AnimatedEllipsis useNativeDriver={true} /> */}
//       {/* <Animatable.View
//         animation='fadeIn'
//         iterationCount={Infinity}
//         duration={3000}
//         useNativeDriver={true}
//       >
//         <Text>{quotes[currIndex]}</Text>
//       </Animatable.View> */}
//       {/* <Spinner
//         visible={false}
//         textContent={'Loading...'}
//         // textStyle={styles.spinnerTextStyle}
//       /> */}
//       {/* <Text>Hello</Text> */}
//     </View>
//   )
// }

// export default ScanLoadingScreen

// const style = {
//   screen: {
//     backgroundColor: '#fff1e6',
//     height: '100%',
//     // borderWidth: 2,
//   },
// }

import React, { useRef } from 'react'
import { Animated, Text, View, StyleSheet, Button } from 'react-native'

const ScanLoadingScreen = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 5000,
    // }).start()
    Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
        }),
      ]),
      {
        iterations: 10,
      }
    ).start()
  }

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
    }).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
      >
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title='Fade In' onPress={fadeIn} />
        <Button title='Fade Out' onPress={fadeOut} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
})

export default ScanLoadingScreen
