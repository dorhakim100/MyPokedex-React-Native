import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'

export default function CustomText({ children, style }) {
  console.log(style)
  const { color, fontSize, fontWeight } = style

  return (
    <Text style={{ ...styles.text, color, fontSize, fontWeight }}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {
        fontFamily: 'Avenir',
        // color: 'crimson',
      },
      android: {
        fontFamily: 'Roboto',

        // color: 'royalblue',
      },
    }),
  },
})
