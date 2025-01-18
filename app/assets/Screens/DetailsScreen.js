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

import { LinearGradient } from 'react-native-svg'

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
    _id: 1,
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
      _id: 1,
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
      _id: 2,
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
      _id: 3,
      num: 3,
      name: 'Venusaur',
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
      _id: 4,
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
    {
      _id: 5,
      num: 5,
      name: 'Charmeleon',
      types: ['fire'],
      entry:
        'When it swings its burning tail, it elevates the temperature to unbearably high levels.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/0/05/0005Charmeleon.png/500px-0005Charmeleon.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/f/f3/Spr_2g_005.png',
      },
    },
    {
      _id: 6,
      num: 6,
      name: 'Charizard',
      types: ['fire', 'flying'],
      entry:
        'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/3/38/0006Charizard.png/500px-0006Charizard.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/c/cc/Spr_2g_006.png',
      },
    },
    {
      _id: 7,
      num: 7,
      name: 'Squirtle',
      types: ['water'],
      entry:
        'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/500px-0007Squirtle.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/3/34/Spr_2g_007.png',
      },
    },
    {
      _id: 8,
      num: 8,
      name: 'Wartortle',
      types: ['water'],
      entry:
        'It is recognized by its tail that is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/0/0f/0008Wartortle.png/500px-0008Wartortle.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/6/63/Spr_2g_008.png',
      },
    },
    {
      _id: 9,
      num: 9,
      name: 'Blastoise',
      types: ['water'],
      entry:
        'It deliberately makes itself heavy so it can withstand the recoil of the water jets it fires.',
      sprites: {
        picture:
          'https://archives.bulbagarden.net/media/upload/thumb/0/0a/0009Blastoise.png/500px-0009Blastoise.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/c/c8/Spr_2g_009.png',
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
            onPress={() => setPokemon(--currPokemon._id)}
          />
          <Button
            title='Next'
            disabled={currPokemon.num === pokemons.length}
            onPress={() => setPokemon(++currPokemon._id)}
          />
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
