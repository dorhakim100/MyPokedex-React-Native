import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CustomButton from './CustomButton'
import CustomText from './CustomText'
import CustomTextInput from './CustomTextInput'

import defaultStyles from '../config/styles'

export default function CustomFormikForm({
  inputs,
  button,
  validationSchema,
  onSubmit,
}) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={80} // Adds extra scroll room when keyboard appears
      keyboardShouldPersistTaps='handled'
      enableOnAndroid
      scrollEnabled
    >
      <Formik
        initialValues={{
          fullname: '',
          username: '',
          password: '',
          email: '',
          phone: '',
        }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <>
            {inputs.map((input) => (
              <View key={input.name} style={styles.inputContainer}>
                <CustomTextInput
                  icon={input.icon}
                  keyboardType={input.keyboardType}
                  isPassword={input.isPassword}
                  autoCapitalize={input.autoCapitalize}
                  onChangeText={handleChange(input.name)}
                  name={input.name}
                  value={values[input.name]}
                  onBlur={handleBlur(input.name)}
                  placeholder={input.placeholder}
                >
                  {input.placeholder}
                </CustomTextInput>

                {touched[input.name] && errors[input.name] && (
                  <CustomText style={defaultStyles.error}>
                    {errors[input.name]}
                  </CustomText>
                )}
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <CustomButton style={styles.button} handlePress={handleSubmit}>
                {button}
              </CustomButton>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensure content fills the scrollview
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    width: 180,
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    textAlign: 'center',
  },
})
