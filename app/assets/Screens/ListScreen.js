import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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
import CustomButton from '../cmps/CustomButton'

import { makeId } from '../services/utils'
import { loadPokemon } from '../store/actions/pokemon.actions'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function ListScreen({ navigation }) {
  const headerHeight = useHeaderHeight()

  const pokemons = useSelector(
    (stateSelector) => stateSelector.pokemonModule.pokemons
  )

  const handleSearchSubmit = (query) => {
    console.log('Searching for:', query)
    // Handle the search logic or state update here
  }
  const [keyboardOffset, setKeyboardOffset] = useState(0)

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
    loadPokemon(pokemonId)
    navigation.navigate('Details')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
        {/* <View style={styles.prevNextButtons}>
          <CustomButton
            handlePress={() => setPokemon(--currPokemon._id)}
            disabled={currPokemon.num === 1}
          >
            Previous
          </CustomButton>
          <CustomButton
            handlePress={() => setPokemon(++currPokemon._id)}
            disabled={currPokemon.num === pokemons.length}
          >
            Next
          </CustomButton>
        </View> */}

        {/* <PokemonContainer onPress={dismissKeyboard} currPokemon={currPokemon} /> */}

        <SearchInput onSubmit={handleSearchSubmit} />
        <ScrollView style={styles.scrollView}>
          {pokemons.map((pokemon) => {
            return (
              <TouchableOpacity
                key={pokemon.num}
                onPress={() => setPokemon(pokemon._id)}
                style={styles.preview}
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
    alignPokemons: 'center',
  },
  prevNextButtons: {
    padding: 5,
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

  preview: {
    borderBottomWidth: 0.3,
    borderColor: 'dodgerblue',
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

export default ListScreen
