import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  SafeAreaView,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
  TouchableHighlight,
} from 'react-native'

import { LinearGradient } from 'react-native-svg'
import Entypo from '@expo/vector-icons/Entypo'

import { useHeaderHeight } from '@react-navigation/elements'

import SearchInput from '../cmps/SearchInput'
import PokemonContainer from '../cmps/PokemonContainer'
import PokemonPreview from '../cmps/PokemonPreview'
import CustomButton from '../cmps/CustomButton'
import ListItemSeparator from '../cmps/ListItemSeparator'
import ListItemSwipeAction from '../cmps/ListItemSwipeAction'
import PokemonList from '../cmps/PokemonList'
import CustomPicker from '../cmps/CustomPicker'

import { makeId } from '../services/utils'
import { pokemonService } from '../services/pokemon/pokemon.service'
import {
  addPokemon,
  loadPokemon,
  loadPokemons,
  removePokemon,
} from '../store/actions/pokemon.actions'
import colors from '../config/color'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function ListScreen({ navigation }) {
  const headerHeight = useHeaderHeight()

  const pokemons = useSelector(
    (stateSelector) => stateSelector.pokemonModule.pokemons
  )

  const [filter, setFilter] = useState(pokemonService.getDefaultFilter())

  const [isRefreshing, setIsRefreshing] = useState(false)

  const swipeableRef = useRef(null)

  const swipeable = {
    backgroundColor: colors.addGreen,
    icon: <Entypo name='add-to-list' size={24} color={colors.strongWhite} />,
  }

  useEffect(() => {
    loadPokemons(filter)
  }, [filter])

  const handleSearchSubmit = (query) => {
    const filterBy = { ...filter, txt: query }
    setFilter(filterBy)
  }
  const [keyboardOffset, setKeyboardOffset] = useState(0)

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardOffset(400) // Or any additional calculation based on your UI
      }
    )
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0) // Reset offset when keyboard is dismissed
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const setPokemon = (pokemonId) => {
    loadPokemon(pokemonId)
    navigation.navigate('Details')
  }

  const handleAdd = async (pokemon, swipeableRef) => {
    swipeableRef?.current.close()
    swipeableRef.current = null
    const pokemonId = pokemon._id
    await addPokemon(pokemonId)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
        <CustomPicker placeholder={'Category'} icon={'apps'} />
        <SearchInput onSubmit={handleSearchSubmit} />
        <PokemonList
          pokemons={pokemons}
          setPokemon={setPokemon}
          isRefreshing={isRefreshing}
          onSwipePress={handleAdd}
          swipeable={swipeable}
        />
        {/* <ScrollView style={styles.scrollView}>
          {pokemons.map((pokemon) => {
            return (
              <TouchableOpacity
                key={pokemon.num}
                onPress={() => setPokemon(pokemon._id)}
                style={styles.preview}
              >
                <PokemonPreview pokemon={pokemon} />
              </TouchableOpacity>
            )
          })}
        </ScrollView> */}
        {/* or using FlatList */}
        {/* <FlatList
          data={pokemons}
          keyExtractor={(item) => item._id.toString()} // Ensure unique IDs
          refreshing={isRefreshing}
          onRefresh={() => {
            loadPokemons(pokemonService.getDefaultFilter())
          }}
          renderItem={({ item }) => (
            <PokemonPreview
              pokemon={item}
              renderRightAction={() => (
                <ListItemSwipeAction
                  onPress={() => handleDelete(item)}
                  backgroundColor={colors.addGreen}
                  icon={
                    <Entypo
                      name='add-to-list'
                      size={24}
                      color={colors.strongWhite}
                    />
                  }
                />
              )} // sending a function, not cmp
              setPokemon={setPokemon}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={
            <ListItemSeparator color={colors.secondaryBlueLight} />
          }
        /> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignPokemons: 'center',
  },
  prevNextButtons: {
    padding: 5,
    flexDirection: 'row',
    // paddingTop: 10,
    justifyContent: 'space-around',
    width: screenWidth,
  },
  scrollView: {
    // width: screenWidth,
    width: '100%',

    flex: 1,
    // paddingBottom: 20,
  },

  preview: {
    // borderBottomWidth: 0.3,
    // borderColor: 'dodgerblue',
  },
})

const dismissKeyboard = () => {
  Keyboard.dismiss()
}

const DismissKeyboardView = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default ListScreen
