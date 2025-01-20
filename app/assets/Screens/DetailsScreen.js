import React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native'

import { useSelector } from 'react-redux'
import { loadPokemon } from '../store/actions/pokemon.actions'

import { StatusBar } from 'react-native'

import { StyleSheet } from 'react-native'

import CustomButton from '../cmps/CustomButton'
import PokemonContainer from '../cmps/PokemonContainer'
import { pokemonService } from '../services/pokemon/pokemon.service'

const screenWidth = Dimensions.width

function DetailsScreen() {
  const currPokemon = useSelector(
    (stateSelector) => stateSelector.pokemonModule.currPokemon
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.prevNextButtons}>
        <CustomButton
          handlePress={() => loadPokemon(--currPokemon._id)}
          disabled={currPokemon.num === 1}
        >
          Previous
        </CustomButton>
        <CustomButton
          handlePress={() => loadPokemon(++currPokemon._id)}
          disabled={currPokemon.num === pokemonService.getPokemons().length}
        >
          Next
        </CustomButton>
      </View>

      <PokemonContainer currPokemon={currPokemon} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  prevNextButtons: {
    padding: 5,
    flexDirection: 'row',
    // paddingTop: 10,
    justifyContent: 'space-around',
    width: screenWidth,
  },
})

export default DetailsScreen
