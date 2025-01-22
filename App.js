import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { store } from './app/assets/store/store.js'
import { AppRegistry } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import HomeScreen from './app/assets/Screens/HomeScreen.js'
import ListScreen from './app/assets/Screens/ListScreen.js'
import DetailsScreen from './app/assets/Screens/DetailsScreen.js'

import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import CustomBottomNavigation from './app/assets/cmps/BottomNavigation.js'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <PaperProvider>
          <NavigationContainer>
            <SafeAreaView>
              {/* <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='List' component={ListScreen} />
            <Stack.Screen name='Details' component={DetailsScreen} />
          </Stack.Navigator> */}
            </SafeAreaView>
            <CustomBottomNavigation />
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
