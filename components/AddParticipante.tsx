import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface props {
    addFn: (name: string) => void
}

export default function AddParticipante(props: props) {
    const [name, setName] = React.useState<string>()

    const add = () => {
        name && props.addFn(name)
        setName('')
    }

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Nome do participante' 
        placeholderTextColor={'#6B6B6B'}
        style={styles.input}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={add}>
        <Ionicons name='add' size={25} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        marginBlock: 50
    },
    input: {
        backgroundColor: '#1F1E25',
        marginInlineEnd: 10,
        paddingInlineStart: 20,
        fontSize: 18,
        color: 'white',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 4
    },
    button: {
        backgroundColor: 'green',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
})