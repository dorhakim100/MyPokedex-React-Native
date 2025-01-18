import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Button, Dimensions } from 'react-native'
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
    alignItems: 'center',
    padding: 5,
  },

  num: {
    width: 50,
  },

  name: {
    fontWeight: 'bold',
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
