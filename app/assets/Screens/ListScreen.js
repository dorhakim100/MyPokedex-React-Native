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

import { capitalizeFirstLetter, makeId } from '../services/utils'
import { pokemonService } from '../services/pokemon/pokemon.service'
import {
  addPokemon,
  loadPokemon,
  loadPokemons,
  removePokemon,
} from '../store/actions/pokemon.actions'
import colors from '../config/color'
import paths from '../navigation/routes'
import CustomText from '../cmps/CustomText'
import CustomLottieAnimation from '../cmps/CustomLottieAnimation'
import Screen from './Screen'

import loader from '../animation/loader/loader.json'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function ListScreen({ navigation }) {
  const headerHeight = useHeaderHeight()

  const pokemons = useSelector(
    (stateSelector) => stateSelector.pokemonModule.pokemons
  )

  const [error, setError] = useState(false)

  const [filter, setFilter] = useState(pokemonService.getDefaultFilter())

  const [isRefreshing, setIsRefreshing] = useState(false)

  const swipeableRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)

  const navigateToAdd = () => navigation.navigate(paths.ADD)

  const swipeable = {
    backgroundColor: colors.addGreen,
    icon: <Entypo name='add-to-list' size={24} color={colors.strongWhite} />,
  }

  const categories = [
    { label: 'All', value: 1, onPress: (region) => handleRegionChange(region) },
    {
      label: 'Kanto',
      value: 2,
      onPress: (region) => handleRegionChange(region),
    },
    {
      label: 'Johto',
      value: 3,
      onPress: (region) => handleRegionChange(region),
    },
  ]

  const setPokemons = async (filter) => {
    const res = await loadPokemons(filter)

    if (res.problem) {
      setError(true)
      return
    }
  }

  function handleRegionChange(region) {
    setFilter({ ...filter, region })
  }

  function onItemPickerPress(item) {
    item.onPress(item.label.toLowerCase())
    setIsModal(false)
  }

  useEffect(() => {
    setIsLoading(true)
    setPokemons(filter)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [filter])

  const handleSearchSubmit = (query) => {
    const filterBy = { ...filter, txt: query }
    setFilter(filterBy)
  }
  const [keyboardOffset, setKeyboardOffset] = useState(0)

  const setPokemon = async (pokemonId) => {
    await loadPokemon(pokemonId)
    navigation.navigate(paths.DETAILS)
  }

  const handleAdd = async (pokemon, swipeableRef) => {
    swipeableRef?.current.close()
    swipeableRef.current = null
    const pokemonId = pokemon._id

    await addPokemon(pokemonId)
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
        {error && (
          <>
            <CustomText>Couldn't load Pokemons</CustomText>
            <CustomButton onPress={() => setPokemons(filter)}>
              Retry
            </CustomButton>
          </>
        )}
        <CustomPicker
          placeholder={'Region'}
          value={
            filter.region !== 'all'
              ? capitalizeFirstLetter(filter.region)
              : 'Region'
          }
          icon={'apps'}
          items={categories}
          onPress={onItemPickerPress}
        />
        <SearchInput onSubmit={handleSearchSubmit} />
        <View style={styles.buttonContainer}>
          <CustomButton style={styles.addButton} handlePress={navigateToAdd}>
            Add
          </CustomButton>
        </View>
        {(isLoading && (
          <CustomLottieAnimation animation={loader} visible={isLoading} />
        )) || (
          <PokemonList
            pokemons={pokemons}
            setPokemon={setPokemon}
            isRefreshing={isRefreshing}
            onSwipePress={handleAdd}
            swipeable={swipeable}
          />
        )}
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // padding: 5,
  },

  buttonContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },

  addButton: {
    textAlign: 'center',
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

// const dismissKeyboard = () => {
//   Keyboard.dismiss()
// }

// const DismissKeyboardView = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// )

export default ListScreen
