import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import {
  removePokemon,
  loadPokemon,
  loadPokemons,
} from '../store/actions/pokemon.actions'

import Screen from './Screen'
import PokemonList from '../cmps/PokemonList'

import EvilIcons from '@expo/vector-icons/EvilIcons'

import colors from '../config/color'
import { pokemonService } from '../services/pokemon/pokemon.service'
import CustomText from '../cmps/CustomText'

import paths from '../navigation/routes'

function MyList({ navigation }) {
  const myPokemons = useSelector(
    (stateSelector) => stateSelector.pokemonModule.myPokemons
  )

  const [isRefreshing, setIsRefreshing] = useState(false)

  const swipeable = {
    backgroundColor: colors.danger,
    icon: <EvilIcons name='trash' size={34} color={colors.strongWhite} />,
  }

  const setPokemon = async (pokemonId) => {
    await loadPokemons(pokemonService.getDefaultFilter())
    loadPokemon(pokemonId)
    navigation.navigate(paths.DETAILS)
  }

  const handleDelete = (pokemon, swipeableRef) => {
    swipeableRef?.current.close()
    swipeableRef.current = null
    const pokemonId = pokemon._id
    removePokemon(pokemonId)
  }
  return (
    <Screen>
      {(myPokemons.length === 0 && (
        <CustomText style={styles.emptyList}>Add Pokemons first...</CustomText>
      )) || (
        <PokemonList
          pokemons={myPokemons}
          isRefreshing={isRefreshing}
          onSwipePress={handleDelete}
          swipeable={swipeable}
          setPokemon={setPokemon}
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 20,
    fontSize: 30,
  },
})

export default MyList
