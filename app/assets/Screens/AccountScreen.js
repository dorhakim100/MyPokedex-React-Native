import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'

import Screen from './Screen'
import ProfileBanner from '../cmps/ProfileBanner'
import PokemonPreview from '../cmps/PokemonPreview'
import CustomListSection from '../cmps/CustomListSection'
import colors from '../config/color'
import ListItemSeparator from '../cmps/ListItemSeparator'
import CustomMap from '../cmps/CustomMap'

import paths from '../navigation/routes'

export default function AccountScreen({ navigation }) {
  const profile = {
    name: 'Dor Hakim',
    mail: 'dorhakim100@gmail.com',
  }

  const list = [
    {
      text: 'My Pokemons',
      icon: <ListIcon />,
      onPress: navigateToMyList,
    },
    {
      text: 'My Messages',
      icon: <MessageIcon />,
    },
  ]

  function navigateToMyList() {
    navigation.navigate(paths.LIST)
  }

  return (
    <Screen>
      <ProfileBanner profile={profile} />
      <View style={styles.listsContainer}>
        {list.map((item, index) => (
          <React.Fragment key={index}>
            <CustomListSection icon={item.icon} onPress={item.onPress}>
              {item.text}
            </CustomListSection>
            {index < list.length - 1 && <ListItemSeparator />}
          </React.Fragment>
        ))}
      </View>
      <CustomListSection icon={<LogoutIcon />}>Log Out</CustomListSection>
      <CustomMap
        cords={{
          latitude: 32.1845,
          longitude: 34.8706,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        isFixed={true}
      />
    </Screen>
  )
}

const ListIcon = () => {
  return (
    <View style={styles.listContainer}>
      <Feather style={styles.icon} name='list' size={24} color='black' />
    </View>
  )
}
const MessageIcon = () => {
  return (
    <View style={styles.messageContainer}>
      <MaterialIcons
        style={styles.icon}
        name='message'
        size={24}
        color='black'
      />
    </View>
  )
}
const LogoutIcon = () => {
  return (
    <View style={styles.logoutContainer}>
      <Entypo name='log-out' style={styles.icon} size={24} color='black' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},

  listsContainer: {
    marginBottom: 20,
  },

  listContainer: {
    backgroundColor: colors.mainRed,
    borderRadius: 50,
    margin: 10,
  },
  messageContainer: {
    backgroundColor: colors.secondaryBlue,
    borderRadius: 50,
    margin: 10,
  },
  logoutContainer: {
    backgroundColor: colors.gold,
    borderRadius: 50,
    margin: 10,
  },
  icon: {
    padding: 10,
    color: colors.strongWhite,
  },
})
