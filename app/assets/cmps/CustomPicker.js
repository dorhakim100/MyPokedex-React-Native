import {
  Modal,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import CustomText from './CustomText'
import Screen from '../Screens/Screen'

import defaultStyles from '../config/styles'

export default function CustomPicker({ icon, placeholder, ...otherProps }) {
  const [isModal, setIsModal] = useState(false)
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsModal(true)}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            {icon && (
              <MaterialCommunityIcons
                name={icon}
                size={20}
                color={defaultStyles.colors.darkGray}
                style={styles.icon}
              />
            )}
            <CustomText style={styles.text}>{placeholder}</CustomText>
          </View>
          <MaterialCommunityIcons
            name={'chevron-down'}
            size={20}
            color={defaultStyles.colors.darkGray}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={isModal} animationType='slide'>
        <Screen>
          <Button title='Close' onPress={() => setIsModal(false)} />
        </Screen>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginRight: 10,
  },

  text: {
    flex: 1,
  },
})
