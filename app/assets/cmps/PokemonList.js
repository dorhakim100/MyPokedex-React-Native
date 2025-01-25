import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react'

import Entypo from '@expo/vector-icons/Entypo'

import PokemonPreview from './PokemonPreview'
import ListItemSeparator from './ListItemSeparator'
import ListItemSwipeAction from './ListItemSwipeAction'

import { loadPokemons, loadPokemon } from '../store/actions/pokemon.actions'
import { pokemonService } from '../services/pokemon/pokemon.service'

import colors from '../config/color'
import { useSelector } from 'react-redux'

function PokemonList({
  pokemons,
  setPokemon,
  isRefreshing,
  onSwipePress,
  swipeable,
}) {
  const swipeableRef = useRef(null)

  const handleSwipeableOpen = (currentRef) => {
    if (swipeableRef.current) {
      swipeableRef.current.close() // Close the previously open Swipeable if exists
    }
    swipeableRef.current = currentRef.current // Set the new Swipeable as the current one
  }

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item._id.toString()}
      refreshing={isRefreshing}
      onRefresh={() => {
        loadPokemons(pokemonService.getDefaultFilter())
      }}
      renderItem={({ item }) => (
        <PokemonPreview
          onSwipeableOpen={(ref) => handleSwipeableOpen(ref)}
          pokemon={item}
          pokemons={pokemons}
          renderRightAction={() => (
            <ListItemSwipeAction
              onPress={() => onSwipePress(item, swipeableRef)}
              backgroundColor={swipeable.backgroundColor}
              icon={swipeable.icon}
            />
          )} // sending a function, not cmp
          setPokemon={setPokemon}
        />
      )}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={
        <ListItemSeparator color={colors.secondaryBlueLight} />
      }
    />
  )
}

const styles = StyleSheet.create({})

export default PokemonList
