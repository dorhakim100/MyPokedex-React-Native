import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'

import defaultStyles from '../config/styles'

export default function CustomText({
  children,
  style = {
    color: defaultStyles.colors.darkGray,
    fontSize: 14,
    fontWeight: 500,
  },
}) {
  const {
    color,
    fontSize,
    fontWeight,
    padding,
    margin,
    paddingHorizontal,
    marginHorizontal,
    width,
    alignSelf,
    textAlign,
    justifySelf,
    flex,
  } = style

  return (
    <Text
      style={{
        ...styles.text,
        color,
        fontSize,
        fontWeight,
        padding,
        margin,
        paddingHorizontal,
        marginHorizontal,
        width,
        alignSelf,
        textAlign,
        justifySelf,

        flex,
      }}
    >
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
