import { Alert, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import * as ImagePicker from 'expo-image-picker'

import defaultStyles from '../config/styles'
import CustomButton from './CustomButton'
import { makeId } from '../services/utils'

export default function CustomImagePicker({ input }) {
  const [imagesUri, setImagesUri] = useState([
    'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
  ])
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
        let newImages
        if (
          imagesUri[0] ===
          'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
        ) {
          newImages = [img]
        } else {
          newImages = [...imagesUri, img]
        }
        console.log(newImages)
        setImagesUri(newImages)
        input.onSetImage(newImages)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.imgsContainer}
        horizontal
        showsHorizontalScrollIndicator={true}
      >
        {imagesUri.map((uri) => {
          return (
            <Image
              key={uri + makeId()}
              source={{
                uri,
              }}
              style={styles.img}
            />
          )
        })}
      </ScrollView>
      <CustomButton handlePress={selectImage}>Upload</CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.input,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },

  imgsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
