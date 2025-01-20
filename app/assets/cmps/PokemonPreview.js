import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  Platform,
} from 'react-native'
import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'

import Types from './Types'

const screenWidth = Dimensions.get('window').width

function PokemonPreview({ pokemon }) {
  return (
    <View style={styles.container}>
      <Text style={styles.num}>{getFormattedNum(pokemon.num)}</Text>

      <Image
        source={{ uri: pokemon.sprites.pixel }}
        style={styles.sprite}
      ></Image>

      <Text style={styles.name}>{pokemon.name}</Text>

      <View style={styles.types}>
        <Types types={pokemon.types} isSprite={true} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'space-between',
    paddingBottom: 15,
    alignPokemons: 'center',
    padding: 5,
    shadowColor: 'gray',
    shadowOffset: { width: 10, heigh: 10 },
    shadowOpacity: 0.5,
    backgroundColor: 'rgba(153, 231, 236, 0.19)',
  },

  num: {
    width: 50,
  },

  name: {
    fontWeight: 'bold',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
  },

  sprite: {
    height: 30,
    width: 30,
  },

  types: {
    // width: 250,
    width: 120,
  },
})

export default PokemonPreview
