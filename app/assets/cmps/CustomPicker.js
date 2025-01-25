import {
  Modal,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import CustomText from './CustomText'
import Screen from '../Screens/Screen'
import PickerItem from './PickerItem'

import defaultStyles from '../config/styles'

export default function CustomPicker({ icon, placeholder, items }) {
  const [isModal, setIsModal] = useState(false)

  const filter = useSelector(
    (stateSelector) => stateSelector.pokemonModule.filter
  )

  console.log(filter)

  const [regionText, setRegionText] = useState(filter.region)

  useEffect(() => {
    setRegionText(
      filter.region.toUpperCase().slice(0, 1) +
        filter.region.slice(1, filter.region.length)
    )
  }, [filter.region])

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
            <CustomText style={styles.text}>{regionText}</CustomText>
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
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  item.onPress(item.label.toLowerCase())
                  setIsModal(false)
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,

    backgroundColor: defaultStyles.colors.strongWhite,
    borderRadius: 50,
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
