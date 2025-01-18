import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button } from 'react-native'

const SearchInput = ({ onSubmit }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    // Call the passed onSubmit function with the current query
    onSubmit(query)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder='Search here...'
        returnKeyType='search'
        onSubmitEditing={handleSearch}
      />
      <Button title='Search' onPress={handleSearch} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
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
