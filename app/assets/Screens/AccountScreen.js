import { View, Text, FlatList } from 'react-native'
import React from 'react'

import Screen from './Screen'
import ProfileBanner from '../cmps/ProfileBanner'
import PokemonPreview from '../cmps/PokemonPreview'

export default function AccountScreen() {
  const profile = {
    name: 'Dor Hakim',
    mail: 'dorhakim100@gmail.com',
  }
  return (
    <Screen>
      <ProfileBanner profile={profile} />
    </Screen>
  )
}
