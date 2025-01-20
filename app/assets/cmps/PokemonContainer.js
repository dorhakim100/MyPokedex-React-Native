import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'

import Types from './Types'

import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'
import { LinearGradient } from 'react-native-svg'

const screenWidth = Dimensions.get('window').width

const PokemonContainer = ({ currPokemon, onPress }) => {
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
    shadowColor: 'gray',
    shadowOffset: { width: 10, heigh: 10 },
    shadowOpacity: 0.5,
    elevation: 20, // shadow for android users
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
    // fontFamily: 'Courier', // for ios only
    // fontFamily: 'Roboto', // for android only
    // fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
    // or using a dedicated props
    ...Platform.select({
      ios: {
        fontFamily: 'Avenir',
        // color: 'crimson',
      },
      android: {
        fontFamily: 'Roboto',

        // color: 'royalblue',
      },
    }),
  },
})

export default PokemonContainer
