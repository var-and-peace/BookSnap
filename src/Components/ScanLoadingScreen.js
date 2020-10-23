import React, { useRef, useEffect } from 'react'
import { Animated, Text, View, StyleSheet, Button } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis'

const quotes = [
  'Rivers know this: there is no hurry. We shall get there some day.',
  "'Patience, grasshopper,' said Maia. 'Good things come to those who wait.'",
  'The two hardest tests on the spiritual road are the patience to wait for the right moment and the courage not to be disappointed with what we encounter.',
  'Trees that are slow to grow bear the best fruit.',
]
const ScanLoadingScreen = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current
  let currIndex = 0
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start(() => {
      currIndex = (currIndex + 1) % quotes.length
      console.log('inside loop', currIndex)
    })
  }, [])

  return (
    <View style={styles.container}>
      <AnimatedEllipsis />
      <Animated.View
        style={{
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        <Text style={styles.fadingText}>{quotes[currIndex]}</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff1e6',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
})

export default ScanLoadingScreen
