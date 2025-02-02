import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useState } from 'react'

import * as Yup from 'yup'

import Screen from './Screen'
import CustomTextInput from '../cmps/forms/CustomTextInput'
import CustomButton from '../cmps/CustomButton'
import CustomText from '../cmps/CustomText'
import CustomFormikForm from '../cmps/forms/CustomFormikForm'

import Entypo from '@expo/vector-icons/Entypo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import defaultStyles from '../config/styles'
import { makeId } from '../services/utils'
import paths from '../navigation/routes'
import { login } from '../store/actions/user.actions'

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(2).label('Username'),

  password: Yup.string().required().min(6).label('Password'),
})

export default function LoginScreen({ navigation }) {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const [loginError, setLoginError] = useState(false)

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
      name: 'username',
      type: 'text',
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
      name: 'password',
      type: 'text',
    },
  ]

  const navigateToAccount = () =>
    navigation.replace(paths.MAIN, { screen: paths.ACCOUNT })
  const navigateToSignup = () => navigation.replace(paths.SIGNUP)

  async function onSubmit(values) {
    try {
      const res = await login(values)
      console.log(res)
      if (!res.ok) return setLoginError(true)
      setLoginError(false)
      navigateToAccount()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Screen style={styles.container} hasNavigationBar={true}>
      <Image source={require('../imgs/pokeball.png')} style={styles.logo} />
      <CustomFormikForm
        inputs={inputs}
        button={'Login'}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        values={values}
      />
      {loginError && (
        <CustomText style={defaultStyles.error}>
          {errors[input.name]}
        </CustomText>
      )}
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
