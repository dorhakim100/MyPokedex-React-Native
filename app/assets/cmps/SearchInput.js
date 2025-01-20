import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AntDesign from '@expo/vector-icons/AntDesign'

import CustomButton from './CustomButton'

import colors from '../config/color'

const SearchInput = ({ onSubmit }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    // Call the passed onSubmit function with the current query
    onSubmit(query)
  }

  return (
    <View style={styles.container}>
      <MaterialIcons name='catching-pokemon' size={30} color={colors.mainRed} />
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={`Search here...`}
        returnKeyType='search'
        onSubmitEditing={handleSearch}
      />
      {/* <TouchableOpacity style={styles.buttonContainer} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity> */}
      <CustomButton handlePress={handleSearch} secondaryColor={true}>
        Search
      </CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignPokemons: 'center',
    gap: 5,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    borderRadius: 8,
  },
})

export default SearchInput
