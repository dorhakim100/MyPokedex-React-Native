import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native'

import { useSelector } from 'react-redux'
import { loadPokemon, navPokemon } from '../store/actions/pokemon.actions'

import Constants from 'expo-constants'

import { StyleSheet } from 'react-native'

import CustomButton from '../cmps/CustomButton'
import PokemonContainer from '../cmps/PokemonContainer'
import Screen from './Screen'
import { pokemonService } from '../services/pokemon/pokemon.service'

const screenWidth = Dimensions.width

function DetailsScreen() {
  const currPokemon = useSelector(
    (stateSelector) => stateSelector.pokemonModule.currPokemon
  )
  const pokemons = useSelector(
    (stateSelector) => stateSelector.pokemonModule.pokemons
  )

  const [index, setIndex] = useState()

  useEffect(() => {
    console.log(currPokemon)
    const idx = pokemons.findIndex((pokemon) => pokemon._id === currPokemon._id)
    console.log(idx)
    setIndex(idx)
  }, [currPokemon])

  return (
    <Screen>
      <View style={styles.prevNextButtons}>
        <CustomButton
          handlePress={async () => await navPokemon(index - 1)}
          disabled={index === 0}
        >
          Previous
        </CustomButton>
        <CustomButton
          handlePress={async () => await navPokemon(index + 1)}
          disabled={index === pokemons.length - 1}
        >
          Next
        </CustomButton>
      </View>

      <PokemonContainer currPokemon={currPokemon} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{currPokemon.entry}</Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  prevNextButtons: {
    padding: 5,
    flexDirection: 'row',
    // paddingTop: 10,
    justifyContent: 'space-around',
    width: screenWidth,
  },

  textContainer: {},
  text: {
    fontSize: 20,
    textAlign: 'justify',
  },
})

export default DetailsScreen
