import React from 'react'
import { View, StyleSheet } from 'react-native'

import { CommonActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, BottomNavigation } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Feather from '@expo/vector-icons/Feather'

import ListScreen from '../Screens/ListScreen'
import HomeScreen from '../Screens/HomeScreen'
import DetailsScreen from '../Screens/DetailsScreen'

import colors from '../config/color'

const Tab = createBottomTabNavigator()

export default function CustomBottomNavigation() {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Icon name='home' size={size} color={color} />
          },
        }}
      />
      <Tab.Screen
        name='List'
        component={ListScreen}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => {
            return <Feather name='list' size={size} color={color} />
          },
        }}
      />
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
})
