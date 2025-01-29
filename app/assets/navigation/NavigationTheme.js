import { DefaultTheme } from '@react-navigation/native'

import defaultStyles from '../config/styles'

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: defaultStyles.colors.mainRed,
    background: defaultStyles.colors.whiteBackground,
  },
}
