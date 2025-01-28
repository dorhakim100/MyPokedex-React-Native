import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import * as ImagePicker from 'expo-image-picker'

import defaultStyles from '../config/styles'
import CustomButton from './CustomButton'

export default function CustomImagePicker({ input }) {
  const [imageUri, setImageUri] = useState(
    'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
  )
  useEffect(() => {
    askPermission()
  }, [])

  const askPermission = async () => {
    try {
      const res = await ImagePicker.requestMediaLibraryPermissionsAsync()

      const { granted } = res
      if (!granted) {
        alert('You need to enable permission to access the library')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const selectImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync()
      if (!res.canceled) {
        const img = res.assets[0].uri
        setImageUri(img)
        input.onSetImage(img)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.img}
      />
      <CustomButton handlePress={selectImage}>Upload</CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.input,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  iconContainer: {
    marginInlineEnd: 10,
    // padding: 5,
  },
})
