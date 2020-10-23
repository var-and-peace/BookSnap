import React, { useRef, useEffect, useState } from 'react'
import { Animated, Text, View, StyleSheet, Button } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis'

const quotes = [
  {
    quote: 'Rivers know this: there is no hurry. We shall get there some day.',
    author: 'Winnie-the-Pooh',
  },
  {
    quote:
      'The two hardest tests on the spiritual road are the patience to wait for the right moment and the courage not to be disappointed with what we encounter.',
    author: 'Paulo Coelho',
  },
  {
    quote: 'Trees that are slow to grow bear the best fruit.',
    author: 'Moliere',
  },
]
const ScanLoadingScreen = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current

  let [currIndex, nextIndex] = useState(0)

  //   let currIndex = 0
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(4000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      //   currIndex = (currIndex + 1) % quotes.length
      console.log('inside loop', currIndex)
      nextIndex((currIndex + 1) % quotes.length)
    })
  }, [currIndex])

  return (
    <View style={style.container}>
      <AnimatedEllipsis />
      <Animated.View
        style={{
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        <View style={style.quoteContainer}>
          <Text style={style.quote}>"{quotes[currIndex].quote}"</Text>
          <Text style={style.author}>- {quotes[currIndex].author}</Text>
        </View>
      </Animated.View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff1e6',
  },
  quoteContainer: {
    height: 150,
  },
  quote: {
    width: 250,
    color: 'gray',
  },
  author: {
    textAlign: 'right',
    color: 'gray',
  },
})

export default ScanLoadingScreen
