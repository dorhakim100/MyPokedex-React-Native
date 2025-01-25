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
  Switch,
} from 'react-native'

import Types from './Types'

import { capitalizeFirstLetter, getFormattedNum } from '../services/utils'
import { LinearGradient } from 'react-native-svg'
import colors from '../config/color'

const screenWidth = Dimensions.get('window').width

const PokemonContainer = ({ currPokemon, onPress }) => {
  const [isShiny, setIsShiny] = useState(false)
  console.log(currPokemon)
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Switch value={isShiny} onValueChange={(value) => setIsShiny(value)} />
        <Image
          source={{
            uri: isShiny
              ? currPokemon.sprites.picture.shiny
              : currPokemon.sprites.picture.regular,
          }}
          style={styles.spriteImg}
        ></Image>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {capitalizeFirstLetter(currPokemon.name)}
          </Text>
          <Text style={styles.num}>{getFormattedNum(currPokemon.num)}</Text>
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
    shadowOffset: { width: 2, heigh: 0 },
    shadowOpacity: 1,
    elevation: 20, // shadow for android users
    backgroundColor: colors.whiteBackground,
    borderRadius: 15,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    width: screenWidth * 0.9,

    alignSelf: 'center',
  },

  nameContainer: {
    // flexDirection: 'row',
    gap: 5,
  },

  spriteImg: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 25,
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
  num: {
    textAlign: 'center',
    fontSize: 15,
  },
})

export default PokemonContainer
