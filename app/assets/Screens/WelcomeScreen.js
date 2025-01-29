import React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'

import { StatusBar } from 'react-native'

import { StyleSheet } from 'react-native'

import CustomButton from '../cmps/CustomButton'

import paths from '../navigation/routes'

function WelcomeScreen({ navigation }) {
  const navigateToList = () => navigation.replace(paths.MAIN) // replace for disabling navigation back, navigation.navigate for going back
  const navigateToLogin = () => navigation.navigate(paths.LOGIN)
  const navigateToSignup = () => navigation.navigate(paths.SIGNUP)
  const navigateToAccount = () =>
    navigation.replace(paths.MAIN, { screen: paths.ACCOUNT }) // for navigating to a screen within bottom navigation
  return (
    <View style={styles.container}>
      <ImageBackground
        // resizeMode='contain'
        blurRadius={5}
        source={{
          uri: 'https://i.pinimg.com/originals/6e/52/e0/6e52e0a37e4194b7766ffbde181a0434.jpg',
        }}
        style={styles.backgroundImage}
      >
        <TouchableOpacity onPress={navigateToList}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Form')}> */}

          <View style={styles.logoContainer}>
            <Image
              source={require('../imgs/pokeball.png')}
              style={styles.logo}
            ></Image>
            <Text style={styles.logoText}>MyPokedex</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <CustomButton handlePress={navigateToLogin} style={styles.button}>
            Login
          </CustomButton>
          <CustomButton
            handlePress={navigateToSignup}
            style={styles.button}
            secondaryColor={true}
          >
            Signup
          </CustomButton>
        </View>

        <StatusBar style='auto' />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignPokemons: 'center',
    // justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    // position: 'absolute',
    // width: '100%',
    // height: '100%',
    // resizeMode: 'cover',
  },

  logoContainer: {
    gap: 5,
    marginBottom: 10,
  },
  logo: {
    position: 'absolute',
    top: 170,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  logoText: {
    position: 'absolute',
    top: 380,
    alignSelf: 'center',
    fontFamily: 'pokefont',
    fontWeight: 700,
    fontSize: '30',
  },

  buttonsContainer: {
    // flexDirection: 'row',
    position: 'absolute',
    top: 440,
    width: 100,
    // alignItems: 'center',
    alignSelf: 'center',
    gap: 5,
  },

  button: {
    flex: 1,
    textAlign: 'center',
  },
})

export default WelcomeScreen
