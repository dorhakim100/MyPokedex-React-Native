import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, Dimensions } from 'react-native'

import Types from './Types'

const screenWidth = Dimensions.get('window').width

const PokemonContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../imgs/bulbasaur.jpeg')}
        style={styles.spriteImg}
      ></Image>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>#1</Text>
        <Text style={styles.name}>Bulbasaur</Text>
      </View>
      <Types types={['grass', 'poison']} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
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
    fontSize: '20',
  },
})

export default PokemonContainer
