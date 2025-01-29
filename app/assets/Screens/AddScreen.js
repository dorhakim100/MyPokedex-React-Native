import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import * as Yup from 'yup'

import Screen from './Screen'
import CustomFormikForm from '../cmps/forms/CustomFormikForm'
import CustomImagePicker from '../cmps/CustomImagePicker.js'

import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import defaultStyles from '../config/styles'
import { addNewPokemon, addPokemon } from '../store/actions/pokemon.actions'
import { pokemonService } from '../services/pokemon/pokemon.service'
import Types from '../cmps/Types'

import paths from '../navigation/routes'

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).label('Name'),
  region: Yup.string().required().label('Region'),
  images: Yup.array().required().min(3).label('Images'),
  types: Yup.array().required().min(1).label('Types'),
})

export default function AddScreen({ navigation }) {
  const [region, setRegion] = useState('')

  const inputs = [
    {
      placeholder: 'Pokemon name',
      icon: (
        <AntDesign
          name='profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'name',
      type: 'text',
    },
    {
      icon: (
        <MaterialCommunityIcons
          name='face-man-profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'images',
      type: 'imagePicker',
    },
    {
      name: 'types',
      type: 'check',

      options: [
        {
          label: 'bug',
          value: 1,
          icon: <Types types={['bug']} />,
        },
        {
          label: 'dark',
          value: 2,
          icon: <Types types={['dark']} />,
        },
        {
          label: 'dragon',
          value: 3,
          icon: <Types types={['dragon']} />,
        },
        {
          label: 'electric',
          value: 4,
          icon: <Types types={['electric']} />,
        },
        {
          label: 'fairy',
          value: 5,
          icon: <Types types={['fairy']} />,
        },
        {
          label: 'fighting',
          value: 6,
          icon: <Types types={['fighting']} />,
        },
        {
          label: 'fire',
          value: 7,
          icon: <Types types={['fire']} />,
        },
        {
          label: 'flying',
          value: 8,
          icon: <Types types={['flying']} />,
        },
        {
          label: 'ghost',
          value: 9,
          icon: <Types types={['ghost']} />,
        },
        {
          label: 'grass',
          value: 10,
          icon: <Types types={['grass']} />,
        },
        {
          label: 'ground',
          value: 11,
          icon: <Types types={['ground']} />,
        },
        {
          label: 'ice',
          value: 12,
          icon: <Types types={['ice']} />,
        },
        {
          label: 'normal',
          value: 13,
          icon: <Types types={['normal']} />,
        },
        {
          label: 'poison',
          value: 14,
          icon: <Types types={['poison']} />,
        },
        {
          label: 'psychic',
          value: 15,
          icon: <Types types={['psychic']} />,
        },
        {
          label: 'rock',
          value: 16,
          icon: <Types types={['rock']} />,
        },
        {
          label: 'steel',
          value: 17,
          icon: <Types types={['steel']} />,
        },
        {
          label: 'water',
          value: 18,
          icon: <Types types={['water']} />,
        },
      ],
    },
    {
      placeholder: 'Region',
      icon: (
        <FontAwesome6
          name='earth-africa'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'region',
      type: 'picker',
      placeholder: 'Region',
      style: {
        backgroundColor: defaultStyles.colors.lightGray,
      },
      options: [
        {
          label: 'Kanto',
          value: 2,
          onPress: (region) => handleRegionChange(region),
        },
        {
          label: 'Johto',
          value: 3,
          onPress: (region) => handleRegionChange(region),
        },
        {
          label: 'Hoenn',
          value: 4,
          onPress: (region) => handleRegionChange(region),
        },
        {
          label: 'Sinnoh',
          value: 5,
          onPress: (region) => handleRegionChange(region),
        },
        {
          label: 'Unova',
          value: 6,
          onPress: (region) => handleRegionChange(region),
        },
        {
          label: 'Kalos',
          value: 7,
          onPress: (region) => handleRegionChange(region),
        },
        {
          label: 'Alola',
          value: 8,
          onPress: (region) => handleRegionChange(region),
        },
        {
          label: 'Galar',
          value: 9,
          onPress: (region) => handleRegionChange(region),
        },
        {
          label: 'Paldea',
          value: 10,
          onPress: (region) => handleRegionChange(region),
        },
      ],
    },
  ]

  const [values, setValues] = useState({
    name: '',
    region: '',
    images: [],
    types: [],
  })

  //   useEffect(() => {
  //     // console.log(values)
  //   }, [values])

  const handleRegionChange = (region) => {
    setValues({ ...values, region })
  }

  async function onSubmit(values) {
    console.log(values)
    const { name, region, images, types } = values
    if (images.length < 3) {
      for (let i = 0; i < 3; i++) {
        if (!images[i]) {
          images[i] = images[0]
        }
      }
    }
    console.log(images)
    const newSprites = {
      artwork: images[0].uri,
      home: images[1].uri,

      pixel: images[2].uri,
    }
    const pokemon = pokemonService.getEmptyPokemon()
    addNewPokemon({ ...pokemon, name, region, sprites: newSprites, types })
    navigateToMain()
  }

  const navigateToMain = () => {
    navigation.replace(paths.MAIN)
  }

  return (
    <Screen>
      <CustomFormikForm
        inputs={inputs}
        button={'Add'}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        values={values}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
