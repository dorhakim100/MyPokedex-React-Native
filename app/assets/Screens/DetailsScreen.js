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
  Platform,
} from 'react-native'

import { useSelector } from 'react-redux'
import { loadPokemon } from '../store/actions/pokemon.actions'

import { StatusBar } from 'react-native'
import Constants from 'expo-constants'

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
      <View style={styles.textContainer}>
        <Text style={styles.text}>{currPokemon.entry}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    // paddingTop: Platform.OS === 'android' ? Constants.StatusBarHeight : 0, // for android users, add padding equal to statusBar
    paddingTop: Constants.statusBarHeight, // if SafeAreaView is container, it will take affect only for android users, add padding equal to statusBar
  },
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
