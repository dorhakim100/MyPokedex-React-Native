import React, { useState, useEffect } from 'react'
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
import colors from '../config/color'

const screenWidth = Dimensions.get('window').width

function PokemonPreview({ pokemon, setPokemon, renderRightAction }) {
  return (
    <Swipeable renderRightActions={renderRightAction}>
      <TouchableHighlight
        underlayColor={colors.blueHighlight}
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
    shadowOffset: { width: 10, heigh: 10 },
    shadowOpacity: 0.5,
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
