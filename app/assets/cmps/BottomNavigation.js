import React from 'react'
import { View, StyleSheet } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { CommonActions } from '@react-navigation/native'

import { Text, BottomNavigation } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Feather from '@expo/vector-icons/Feather'

import ListScreen from '../Screens/ListScreen'
import WelcomeScreen from '../Screens/WelcomeScreen'
import DetailsScreen from '../Screens/DetailsScreen'
import AccountScreen from '../Screens/AccountScreen'
import LoginScreen from '../Screens/LoginScreen'
import SignupScreen from '../Screens/SignupScreen'

import colors from '../config/color'
import MyList from '../Screens/MyList'
import AddScreen from '../Screens/AddScreen'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function CustomBottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName='Explore'
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (event.defaultPrevented) {
              preventDefault()
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              })
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key]
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 })
            }

            return null
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key]
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title

            return label
          }}
        />
      )}
    >
      {/* <Tab.Screen
        name='Home'
        component={WelcomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon
                name='home'
                size={size}
                color={focused ? colors.mainRed : color}
              />
            )
          },
        }}
      /> */}
      <Tab.Screen
        name='Details'
        component={DetailsScreen}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name='catching-pokemon'
                size={size}
                color={focused ? colors.mainRed : color}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name='Explore'
        component={ListScreen}
        options={{
          tabBarLabel: 'Explore',

          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons
                name='explore'
                size={size}
                color={focused ? colors.mainRed : color}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name='List'
        component={MyList}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Feather
                name='list'
                size={size}
                color={focused ? colors.mainRed : color}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name='account-circle'
                size={size}
                color={focused ? colors.mainRed : color}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

// function SettingsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text variant='headlineMedium'>Settings!</Text>
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreContainer: {
    backgroundColor: 'tomato',
  },
})

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Welcome' // Set the welcome screen as the initial screen
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />

      <Stack.Screen name='Main' component={CustomBottomNavigation} />
      <Stack.Screen name='Add' component={AddScreen} />
    </Stack.Navigator>
  )
}
