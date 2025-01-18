import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'

import Types from './Types'

import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'

const screenWidth = Dimensions.get('window').width

const PokemonContainer = ({ currPokemon, onPress }) => {
  console.log(currPokemon)
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: currPokemon.sprites.picture }}
          style={styles.spriteImg}
        ></Image>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{getFormattedNum(currPokemon.num)}</Text>
          <Text style={styles.name}>
            {capitalizeFirstLetter(currPokemon.name)}
          </Text>
        </View>
        <Types types={currPokemon.types} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    // gap: 5,
    alignItems: 'center',
    width: screenWidth,
  },

  nameContainer: {
    flexDirection: 'row',
    gap: 5,
  },

  spriteImg: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
})

export default PokemonContainer
