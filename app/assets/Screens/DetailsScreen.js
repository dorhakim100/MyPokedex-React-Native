import React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'

import SearchInput from '../cmps/SearchInput'
import PokemonContainer from '../cmps/PokemonContainer'
import PokemonPreview from '../cmps/PokemonPreview'

import { StyleSheet } from 'react-native'

import { makeId } from '../services/utils'

const screenWidth = Dimensions.get('window').width

function DetailsScreen({ navigation }) {
  const handleSearchSubmit = (query) => {
    console.log('Searching for:', query)
    // Here you could set the state or trigger a fetch to a search API
  }

  const pokemon = {
    _id: makeId(),
    num: 1,
    name: 'Bulbasaur',
    types: ['grass', 'poison'],
    entry:
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    sprites: {
      picture:
        'https://archives.bulbagarden.net/media/upload/thumb/f/fb/0001Bulbasaur.png/500px-0001Bulbasaur.png',
      pixel: 'https://art.pixilart.com/20dc875b721fed5.png',
    },
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.prevNextButtons}>
        <Button
          title='Go to Details'
          onPress={() => navigation.navigate('Details')}
        />
        <Button
          title='Go to Details'
          onPress={() => navigation.navigate('Details')}
        />
      </View>
      <PokemonContainer />
      <SearchInput onSubmit={handleSearchSubmit} />
      <ScrollView style={styles.scrollView}>
        {/* <View style={styles.contentContainer}> */}
        {[...Array(50).keys()].map((number) => (
          <PokemonPreview key={number} pokemon={pokemon} />
        ))}
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // gap: 20,
    // justifyContent: 'center',
    // flexDirection: 'row',
  },

  prevNextButtons: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-around',
    width: screenWidth,
  },

  scrollView: {
    width: screenWidth,
    gap: 5,
  },
})

export default DetailsScreen
