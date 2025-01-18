import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Button, Dimensions } from 'react-native'
import { capitalizeFirstLetter } from '../services/utils'

import Types from './Types'

const screenWidth = Dimensions.get('window').width

function PokemonPreview({ pokemon }) {
  const getFormatted = (num) => {
    num += ''
    if (num.length === 1) {
      return `#000${num}`
    } else if (num.length === 2) {
      return `#00${num}`
    } else if (num.length === 3) {
      return `#0${num}`
    } else return `#${num}`
  }
  return (
    <View style={styles.container}>
      <Text style={styles.num}>{getFormatted(pokemon.num)}</Text>

      <Image
        source={{ uri: pokemon.sprites.pixel }}
        style={styles.sprite}
      ></Image>

      <Text>{pokemon.name}</Text>

      <View style={styles.types}>
        <Types types={pokemon.types} isSprite={true} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },

  num: {},

  sprite: {
    height: 30,
    width: 30,
  },
})

export default PokemonPreview
