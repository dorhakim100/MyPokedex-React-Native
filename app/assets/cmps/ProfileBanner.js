import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import colors from '../config/color'

import CustomText from './CustomText'

function ProfileBanner({ profile }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name='account-circle' size={60} color={colors.mainRed} />
      <View style={styles.nameContainer}>
        <CustomText style={styles.name}>{profile.name}</CustomText>
        <CustomText style={styles.mail}>{profile.mail}</CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 20,
    marginTop: 25,
    backgroundColor: colors.strongWhite,
  },

  nameContainer: {
    gap: 5,
  },
  name: {
    fontWeight: 700,
    fontSize: 18,
  },
  mail: {
    fontWeight: 400,
    fontSize: 16,
    color: colors.subText,
  },
})

export default ProfileBanner
