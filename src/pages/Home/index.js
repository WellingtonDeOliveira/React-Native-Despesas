import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAsyncStorage }  from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Movements from '../../components/Movements';
import Actions from '../../components/Actions';

const list = [
  {
    id: 1,
    label: 'Boleto',
    value: '580,90',
    date: '17/08/2022',
    type: 0 // Despesas
  },
  {
    id: 2,
    label: 'Pix Recebido',
    value: '2.050,90',
    date: '24/08/2022',
    type: 1 // Receita
  },
  {
    id: 3,
    label: 'Salário',
    value: '6.540,90',
    date: '27/08/2022',
    type: 1 // Receita
  }
]
const { getItem, setItem } = useAsyncStorage("@despesasRN:");

async function handleRemove(id) {
  const response = await getItem();
  const previousData = response ? JSON.parse(response) : [];

  const data = previousData.filter((item => item.id !== id));

  setItem(JSON.stringify(data));
  setData(data);
}

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Header name="Oliver Santos"/>
      <Balance saldo="15.650,00" gastos="-358,90" />
      <Actions/>
      <Text style={styles.title}>Últimas movimentações</Text>
      <FlatList 
      style={styles.list} 
      data={list} 
      keyExtractor={ (item) => String(item.id) }
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => 
      <Movements
        data={item}
        onPress={() => handleRemove(item.id)}
       /> }/>
      <View style={styles.buttonCenter}>
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.buttonPlus} 
          onPress={() =>  navigation.navigate("Edit")}
          >
          <Feather name='plus' size={45} color='#fff'/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  },
  list:{
    marginStart: 14,
    marginEnd: 14,
  },
  buttonCenter:{
    height: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  buttonPlus:{
    width: 66,
    height: 66,
    bottom: 66,
    backgroundColor: '#8000ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 66/2,
  }
});
