import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAsyncStorage }  from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Movements, { MoviProps } from '../../components/Movements';
import Actions from '../../components/Actions';
import { useFocusEffect } from '@react-navigation/native';



export default function Home({navigation}) {
  
  const [data, setData] = useState<MoviProps[]>([]);
  const [saldo, setSaldo] = useState('0');
  const [gasto, setGasto] = useState('');
  
  const { getItem, setItem } = useAsyncStorage("@DespesasRN:Moviments");

  async function handleFetchData() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    setData(data);
    var totalR = 0;
    var totalD = 0;
    data.forEach(function(movi:MoviProps){
      if(movi.tipo == 'receita'){
        totalR += +movi.valor.replace(",", ".");
      }else{
        totalR -= +movi.valor.replace(",", ".");
      }if(movi.tipo == 'despesa'){
        totalD += +movi.valor.replace(",", ".");
      }
      setSaldo(totalR.toFixed(2).toString().replace(".", ","));
      setGasto(totalD.toFixed(2).toString().replace(".", ","));
    });
    console.log(totalR);
    console.log(saldo);
  }

  async function handleRemove(id: string) {
    const response = await getItem();
    const previousData = response ? JSON.parse(response) : [];
    
    const data = previousData.filter((item: MoviProps) => item.id !== id);
    
    setItem(JSON.stringify(data));
    setData(data);
    handleFetchData();
  }

  useFocusEffect(useCallback(() => {
    handleFetchData();
  }, []));


  return (
    <View style={styles.container}>
      <Header name="Oliver Santos"/>
      <Balance saldo={saldo} gastos={'-'+gasto}/>
      <Actions/>
      <Text style={styles.title}>Últimas movimentações</Text>
      <FlatList 
      style={styles.list} 
      data={data} 
      keyExtractor={ (item) => item.id }
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
    bottom: 75,
    backgroundColor: '#8000ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 66/2,
  }
});
