import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { ParticipanteType } from '@/types/types'

interface props {
    participante: ParticipanteType
    removeFn: (id: number) => void
}

export default function Participante(props: props) {

    const remove = () => {
        Alert.alert(
            'Excluir Participante',
            `Tem certeza que deseja excluir o participante ${props.participante.name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                text: 'Excluir',
                onPress: () => {
                    // Lógica de exclusão
                    props.removeFn(props.participante.id)
                },
                style: 'destructive', // Estilo para ações perigosas (apenas iOS)
                },
            ]
        )
    }

    return (
        <View style={styles.container}>
        <Text style={styles.text}>{props.participante.name}</Text>
        <TouchableOpacity style={styles.button} onPress={remove}>
            <Ionicons name='remove' size={25} color='white' />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        marginBlockEnd: 10
    },
    text: {
        backgroundColor: '#1F1E25',
        marginInlineEnd: 10,
        paddingInlineStart: 20,
        color: 'white',
        textAlignVertical: 'center',
        flex: 1,
        borderRadius: 4
    },
    button: {
        backgroundColor: 'red',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
})