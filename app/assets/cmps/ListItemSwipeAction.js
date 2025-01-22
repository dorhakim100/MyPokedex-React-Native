import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/color'

function ListItemSwipeAction() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='trash-can' color={colors.white} size={35} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ListItemSwipeAction
