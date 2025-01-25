import React, { useState, useEffect, forwardRef, useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  Platform,
  TouchableHighlight,
} from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable'

import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'

import Types from './Types'

import defaultStyles from '../config/styles'
import { pokemonService } from '../services/pokemon/pokemon.service'

const screenWidth = Dimensions.get('window').width

function PokemonPreview({
  pokemon,
  setPokemon,
  renderRightAction,
  onSwipeableOpen,
}) {
  const pokemonRef = useRef(null)

  return (
    <Swipeable
      renderRightActions={renderRightAction}
      onSwipeableOpen={() => onSwipeableOpen(pokemonRef)}
      ref={pokemonRef}
    >
      <TouchableHighlight
        underlayColor={defaultStyles.colors.blueHighlight}
        onPress={() => setPokemon(pokemon._id)}
        style={styles.preview}
      >
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
      </TouchableHighlight>
    </Swipeable>
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
    shadowColor: 'gray',
    shadowOffset: { width: 1, heigh: 10 },
    shadowOpacity: 0.5,
    backgroundColor: defaultStyles.colors.whiteBackground,
  },

  num: {
    ...defaultStyles.text,
    fontSize: 15,
    width: 50,
  },

  name: {
    ...defaultStyles.text,
    fontWeight: 'bold',
    fontWeight: '600',
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
