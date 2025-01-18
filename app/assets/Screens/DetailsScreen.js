import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native'

import { useHeaderHeight } from '@react-navigation/elements'

import SearchInput from '../cmps/SearchInput'
import PokemonContainer from '../cmps/PokemonContainer'
import PokemonPreview from '../cmps/PokemonPreview'

import { makeId } from '../services/utils'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function DetailsScreen({ navigation }) {
  const headerHeight = useHeaderHeight()

  const handleSearchSubmit = (query) => {
    console.log('Searching for:', query)
    // Handle the search logic or state update here
  }
  const [keyboardOffset, setKeyboardOffset] = useState(0)

  const [currPokemon, setCurrPokemon] = useState({
    _id: `1Id`,
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
  })

  const pokemons = [
    {
      _id: `1Id`,
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
    },
    {
      _id: `2Id`,
      num: 2,
      name: 'Ivysaur',
      types: ['grass', 'poison'],
      entry:
        'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/8/81/0002Ivysaur.png/500px-0002Ivysaur.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/a/a0/Spr_2g_002.png',
      },
    },
    {
      _id: `3Id`,
      num: 3,
      name: 'Ivysaur',
      types: ['grass', 'poison'],
      entry:
        'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/6/6b/0003Venusaur.png/500px-0003Venusaur.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/6/64/Spr_2g_003.png',
      },
    },
    {
      _id: `4Id`,
      num: 4,
      name: 'Charmander',
      types: ['fire'],
      entry:
        'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/2/27/0004Charmander.png/500px-0004Charmander.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/6/6f/Spr_2g_004.png',
      },
    },
  ]

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardOffset(400) // Or any additional calculation based on your UI
      }
    )
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0) // Reset offset when keyboard is dismissed
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const setPokemon = (pokemonId) => {
    console.log(pokemonId)
    const pokemon = pokemons.find((pokemon) => pokemon._id === pokemonId)
    setCurrPokemon(pokemon)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
        <View style={styles.prevNextButtons}>
          <Button
            disabled={currPokemon.num === 1}
            title='Previous'
            onPress={() => navigation.navigate('Details')}
          />
          <Button title='Next' onPress={() => navigation.navigate('Details')} />
        </View>
        <PokemonContainer onPress={dismissKeyboard} currPokemon={currPokemon} />

        <SearchInput onSubmit={handleSearchSubmit} />
        <ScrollView style={styles.scrollView}>
          {pokemons.map((pokemon) => {
            return (
              <TouchableOpacity
                key={pokemon.num}
                onPress={() => setPokemon(pokemon._id)}
              >
                <PokemonPreview pokemon={pokemon} />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  prevNextButtons: {
    flexDirection: 'row',
    // paddingTop: 10,
    justifyContent: 'space-around',
    width: screenWidth,
  },
  scrollView: {
    // width: screenWidth,
    width: '100%',

    flex: 1,
    // paddingBottom: 20,
  },
})

const dismissKeyboard = () => {
  Keyboard.dismiss()
}

const DismissKeyboardView = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default DetailsScreen
