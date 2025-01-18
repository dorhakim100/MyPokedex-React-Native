import React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native'

import { StatusBar } from 'react-native'

import { StyleSheet } from 'react-native'

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../imgs/pokeball.png')}
            style={styles.logo}
          ></Image>
          <Text style={styles.logoText}>MyPokedex</Text>
        </View>
      </TouchableOpacity>

      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    gap: 5,
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  logoText: {
    alignSelf: 'center',
    fontFamily: 'pokefont',
    fontSize: '30',
  },
})

export default HomeScreen
