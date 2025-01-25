import Constants from 'expo-constants'
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'

function Screen({ children }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1, // Ensure the SafeAreaView takes up the full screen
  },
})

export default Screen
