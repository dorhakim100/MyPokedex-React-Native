import { Platform } from 'react-native'

import colors from './color'

export default {
  colors, // for accessing everything from one object
  text: {
    color: colors.darkGray,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
}
