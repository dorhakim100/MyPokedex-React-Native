import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native'
import React from 'react'

import Screen from './Screen'
import CustomTextInput from '../cmps/CustomTextInput'
import CustomButton from '../cmps/CustomButton'

import Entypo from '@expo/vector-icons/Entypo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import defaultStyles from '../config/styles'
import { makeId } from '../services/utils'

export default function LoginScreen({ navigation }) {
  const inputs = [
    {
      placeholder: 'Username or Email',
      icon: (
        <AntDesign
          name='profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),
      autoCapitalize: 'none',
    },

    {
      placeholder: 'Password',
      icon: (
        <MaterialIcons
          name='password'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),
      isPassword: true,
      autoCapitalize: 'none',
    },
  ]

  const navigateToAccount = () =>
    navigation.replace('Main', { screen: 'Account' })
  const navigateToSignup = () => navigation.replace('Signup')

  return (
    <Screen style={styles.container}>
      <Image source={require('../imgs/pokeball.png')} style={styles.logo} />

      {inputs.map((input) => {
        return (
          <CustomTextInput
            icon={input.icon}
            key={makeId()}
            isPassword={input.isPassword}
            autoCapitalize={input.autoCapitalize}
          >
            {input.placeholder}
          </CustomTextInput>
        )
      })}
      <View style={styles.buttonContainer}>
        <CustomButton style={styles.button} handlePress={navigateToAccount}>
          Login
        </CustomButton>
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Register first' onPress={navigateToSignup} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},

  logo: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginTop: 50,
    margin: 20,
  },

  buttonContainer: {
    width: 180,
    alignSelf: 'center',
    marginVertical: 10,
  },

  button: {
    alignSelf: 'center',
    textAlign: 'center',
  },
})
