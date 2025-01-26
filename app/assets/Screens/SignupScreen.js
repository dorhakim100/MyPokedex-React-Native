import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Screen from './Screen'
import CustomTextInput from '../cmps/CustomTextInput'
import CustomButton from '../cmps/CustomButton'

import * as Yup from 'yup'
import { Formik } from 'formik'

import Entypo from '@expo/vector-icons/Entypo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import CustomText from '../cmps/CustomText'
import CustomFormikForm from '../cmps/CustomFormikForm'

import defaultStyles from '../config/styles'
import { makeId } from '../services/utils'

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().min(2).label('Fullname'),
  username: Yup.string().required().min(2).label('Username'),
  password: Yup.string().required().min(6).label('Password'),
  email: Yup.string().required().email().label('Email'),
  phone: Yup.string()
    .required('Phone is required')
    .test(
      'is-valid-phone',
      'Phone number is invalid',
      (value) => /^[\d+\-\s()]+$/.test(value) // Allow digits, spaces, (), +, -
    )
    .label('Phone'),
})

export default function SignupScreen({ navigation }) {
  const inputs = [
    {
      key: makeId(),
      name: 'fullname', // Add name property
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
      name: 'username', // Add name property
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
      name: 'password', // Add name property
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
      name: 'email', // Add name property
      placeholder: 'Email',
      icon: (
        <Entypo name='email' size={24} color={defaultStyles.colors.subText} />
      ),
      autoCapitalize: 'none',
      keyboardType: 'email-address',
    },
    {
      key: makeId(),
      name: 'phone', // Add name property
      placeholder: 'Phone',
      icon: (
        <Entypo name='phone' size={24} color={defaultStyles.colors.subText} />
      ),
      keyboardType: 'numeric',
    },
  ]

  const navigateToAccount = () =>
    navigation.replace('Main', { screen: 'Account' })
  const navigateToSignup = () => navigation.replace('Signup')

  function onSubmit(values) {
    console.log(values)
    navigateToAccount()
  }

  return (
    <Screen style={styles.container}>
      <Image source={require('../imgs/pokeball.png')} style={styles.logo} />

      <CustomFormikForm
        inputs={inputs}
        button={'Signup'}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      />
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
})
