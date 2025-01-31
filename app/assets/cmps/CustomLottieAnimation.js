import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LottieView from 'lottie-react-native'

export default function CustomLottieAnimation({ animation, visible }) {
  return (
    visible && (
      <LottieView
        source={animation}
        // height={200}
        width={200}
        loop
        autoPlay
        style={styles.container}
      />
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
})
