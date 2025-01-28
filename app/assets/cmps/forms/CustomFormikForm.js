import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CustomButton from '../CustomButton'
import CustomText from '../CustomText'
import CustomTextInput from './CustomTextInput'

import defaultStyles from '../../config/styles'
import CustomPicker from '../CustomPicker'

export default function CustomFormikForm({
  inputs,
  button,
  validationSchema,
  onSubmit,
  values = {},
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
        initialValues={values}
        onSubmit={(valuesToSet) => {
          onSubmit(valuesToSet)
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          setValues,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            {inputs.map((input) => {
              if (input.type === 'picker') {
                input.options.map((option) => {
                  const originalFunction = option.onPress
                  delete option.onPress

                  option.onPress = () => {
                    originalFunction()
                    setFieldValue(input.name, option.label)
                  }
                })
              }
              return (
                <View key={input.name} style={styles.inputContainer}>
                  {(input.type === 'text' && (
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
                  )) ||
                    (input.type === 'picker' && (
                      <CustomPicker
                        style={input.style}
                        items={input.options}
                        setValues={setValues}
                        value={values[input.name]}
                        placeholder={input.placeholder}
                      />
                    ))}

                  {touched[input.name] && errors[input.name] && (
                    <CustomText style={defaultStyles.error}>
                      {errors[input.name]}
                    </CustomText>
                  )}
                </View>
              )
            })}
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
