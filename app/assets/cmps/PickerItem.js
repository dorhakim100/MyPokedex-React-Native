import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import CustomText from './CustomText'

export default function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.text}>
      <CustomText>{label}</CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
})
