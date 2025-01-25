import { Button, Image, StyleSheet, Text, View } from 'react-native'
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

export default function SignupScreen({ navigation }) {
  const inputs = [
    {
      key: makeId(),
      placeholder: 'Full Name',
      icon: (
        <MaterialCommunityIcons
          name='face-man-profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      autoCapitalize: 'words',
    },
    {
      key: makeId(),
      placeholder: 'Username',
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
      key: makeId(),
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
    {
      key: makeId(),
      placeholder: 'Email',
      icon: (
        <Entypo name='email' size={24} color={defaultStyles.colors.subText} />
      ),
      autoCapitalize: 'none',
      keyboardType: 'email-address',
    },
    {
      key: makeId(),
      placeholder: 'Phone',
      icon: (
        <Entypo name='phone' size={24} color={defaultStyles.colors.subText} />
      ),
      keyboardType: 'phone-pad',
    },
  ]

  const navigateToAccount = () =>
    navigation.replace('Main', { screen: 'Account' })
  const navigateToLogin = () => navigation.replace('Login')

  return (
    <Screen style={styles.container}>
      <Image source={require('../imgs/pokeball.png')} style={styles.logo} />

      {inputs.map((input) => {
        return (
          <CustomTextInput
            icon={input.icon}
            key={input.key}
            isPassword={input.isPassword}
            keyboardType={input.keyboardType}
            autoCapitalize={input.autoCapitalize}
          >
            {input.placeholder}
          </CustomTextInput>
        )
      })}
      <View style={styles.buttonContainer}>
        <CustomButton style={styles.button} handlePress={navigateToAccount}>
          Signup
        </CustomButton>
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Already a member?' onPress={navigateToLogin} />
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
    textAlign: 'center',
  },
})
