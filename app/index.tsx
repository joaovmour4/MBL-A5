import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddParticipante from '@/components/AddParticipante'
import Participante from '@/components/Participante'
import { ParticipanteType } from '@/types/types'
import db from '@/db/db'

export default function index() {
  const [participantes, setParticipantes] = React.useState<Array<ParticipanteType>>()
  
  React.useEffect(() => {
    // Criar a tabela Participante
    db.withTransactionSync(() => {
      db.execSync(
        `CREATE TABLE IF NOT EXISTS Participante (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL
        );`,
      );
    });

   db.getAllAsync('SELECT * FROM Participante')
      .then((response: any) => {
        setParticipantes(response)
      })
  }, [participantes]);

  const adicionarParticipante = async (name: string) => {
    const statement = await db.prepareAsync(
      'INSERT INTO Participante (name) VALUES ($name)'
    )
    try{
      await statement.executeAsync({ $name: name })
    } finally {
      await statement.finalizeAsync()
    }
  };

  const excluirParticipante = async (id: number) => {
    const statement = await db.prepareAsync(
      'DELETE FROM Participante WHERE id = ($id)'
    )
    try{
      const result = await statement.executeAsync({ $id: id })
    } finally {
      await statement.finalizeAsync()
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evento Exemplo</Text>
      <Text style={styles.date}>Sexta, 3 de Novembro de 2024</Text>
      <AddParticipante
        addFn={adicionarParticipante}
      />
      <Text style={styles.subTitle}>
        Participantes
      </Text>
      <ScrollView style={styles.scrollView}>
        {participantes && 
          participantes.map((participante) => {
            return <Participante 
              participante={participante}
              removeFn={excluirParticipante}
              key={participante.id}
            />
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131016',
    flex: 1,
    paddingBlock: 30,
    paddingInline: 20
  },
  title: {
    color: 'white',
    fontSize: 25
  },
  date: {
    color: '#6B6B6B',
    fontSize: 15
  },
  subTitle: {
    color: 'white',
    fontSize: 20,
    paddingBlockEnd: 25
  },
  scrollView: {

  }
})