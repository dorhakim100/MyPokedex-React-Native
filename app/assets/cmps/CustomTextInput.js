import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import defaultStyles from '../config/styles'

export default function CustomTextInput({
  children,
  keyboardType,
  isPassword,
  autoCapitalize,
  icon,
  ...otherProps
}) {
  const [value, setValue] = useState('')

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        {...otherProps}
        keyboardType={keyboardType ? keyboardType : 'default'}
        autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
        secureTextEntry={isPassword ? true : false}
        clearButtonMode='always'
        autoCorrect={false}
        value={value}
        onChangeText={setValue}
        style={{ ...defaultStyles.text, flex: 1 }}
        placeholder={children}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,

    gap: 5,
    backgroundColor: defaultStyles.colors.lightGray,
    borderRadius: 50,
    width: '100%',
    padding: 15,
    marginVertical: 10,
  },

  iconContainer: {
    marginInlineEnd: 10,
    // padding: 5,
  },
  input: {
    // flex: 1,
    // fontSize: 18,
    // width: '100%',
  },
})
