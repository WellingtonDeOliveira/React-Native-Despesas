import React, { useCallback, useState, useContext} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAsyncStorage }  from '@react-native-async-storage/async-storage'; 

import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Movements, { MoviProps } from '../../components/Movements';
import Actions from '../../components/Actions';
import { useFocusEffect } from '@react-navigation/native';
import { DateContext } from '../../context/auth';


export default function Home({navigation}) {
  
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const { armazenarData } = useContext(DateContext);
  const [atualizando, setAtualizando] = useState(false);
  
  const [data, setData] = useState<MoviProps[]>([]);
  const [saldo, setSaldo] = useState('');
  const [gasto, setGasto] = useState('');
  
  const { getItem, setItem } = useAsyncStorage("@DespesasRN:Moviments");
  
  const reload=(metodo:string='0')=>{
    setAtualizando(true);
    if(metodo == '+'){
      calcBalanceMais();
    }else if(metodo == '-'){
      calcBalanceMenos();
    }else{
      calcBalance();
    }
    setAtualizando(false);
  }

  function handleDate(){
      armazenarData(month, year);
  }

  function handleDateMais(){
    if(month == 12){
      armazenarData(month-11, year+1);
    }else{
      armazenarData(month+1, year);
    }
    reload('+');
  }

  function handleDateMenos(){
    if(month == 1){
      armazenarData(month+11, year-1);
    }else{
      armazenarData(month-1, year);
    }
    reload('-');
  }

  async function handleFetchData() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    setData(data);
    handleDate();
    reload();
  }

  function calcBalance(){
    var totalR = 0, totalD = 0, saldoR = 0;
    data.forEach(function(movi:MoviProps){
      const time = new Date(movi.date);
      if(time.getMonth()+1+'/'+time.getFullYear() == month+'/'+year){
        if(movi.tipo == 'receita'){
          totalR += +movi.valor.replace(",", ".");
          saldoR += +movi.valor.replace(",", ".");
        }else{
          totalR -= +movi.valor.replace(",", ".");
        }if(movi.tipo == 'despesa'){
          totalD += +movi.valor.replace(",", ".");
        }
      }
      if(saldoR < totalD){
        setSaldo('-')
        setGasto(totalD.toFixed(2).toString().replace(".", ","));
      }else{
        setSaldo(totalR.toFixed(2).toString().replace(".", ","));
        setGasto(totalD.toFixed(2).toString().replace(".", ","));
      }
    });
  }

  function calcBalanceMais(){
    var totalR = 0, totalD = 0, saldoR = 0;
    data.forEach(function(movi:MoviProps){
      const time = new Date(movi.date);
      if(month == 12){
        if(time.getMonth()+1+'/'+time.getFullYear() == month-11+'/'+year+1){
          if(movi.tipo == 'receita'){
            totalR += +movi.valor.replace(",", ".");
            saldoR += +movi.valor.replace(",", ".");
          }else{
            totalR -= +movi.valor.replace(",", ".");
          }if(movi.tipo == 'despesa'){
            totalD += +movi.valor.replace(",", ".");
          }
        }
      }else{
        if(time.getMonth()+1+'/'+time.getFullYear() == month+1+'/'+year){
          if(movi.tipo == 'receita'){
            totalR += +movi.valor.replace(",", ".");
            saldoR += +movi.valor.replace(",", ".");
          }else{
            totalR -= +movi.valor.replace(",", ".");
          }if(movi.tipo == 'despesa'){
            totalD += +movi.valor.replace(",", ".");
          }
        }
      }
      if(saldoR < totalD){
        setSaldo('-')
        setGasto(totalD.toFixed(2).toString().replace(".", ","));
      }else{
        setSaldo(totalR.toFixed(2).toString().replace(".", ","));
        setGasto(totalD.toFixed(2).toString().replace(".", ","));
      }
    });
  }

  function calcBalanceMenos(){
    var totalR = 0, totalD = 0, saldoR = 0;
    data.forEach(function(movi:MoviProps){
      const time = new Date(movi.date);
      if(month == 1){
        if(time.getMonth()+1+'/'+time.getFullYear() == (month+11)+'/'+(year-1)){
          if(movi.tipo == 'receita'){
            totalR += +movi.valor.replace(",", ".");
            saldoR += +movi.valor.replace(",", ".");
          }else{
            totalR -= +movi.valor.replace(",", ".");
          }if(movi.tipo == 'despesa'){
            totalD += +movi.valor.replace(",", ".");
          }
        }
      }else{
        if(time.getMonth()+1+'/'+time.getFullYear() == (month-1)+'/'+(year)){
          if(movi.tipo == 'receita'){
            totalR += +movi.valor.replace(",", ".");
            saldoR += +movi.valor.replace(",", ".");
          }else{
            totalR -= +movi.valor.replace(",", ".");
          }if(movi.tipo == 'despesa'){
            totalD += +movi.valor.replace(",", ".");
          }
        }
      }
      if(saldoR < totalD){
        setSaldo('-')
        setGasto(totalD.toFixed(2).toString().replace(".", ","));
      }else{
        setSaldo(totalR.toFixed(2).toString().replace(".", ","));
        setGasto(totalD.toFixed(2).toString().replace(".", ","));
      }
    });
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

  const buttonMais = () => {
    if(month == 12){
      setYear(year + 1);
      setMonth(1);
    }else{
      setMonth(month + 1);
    }
    handleDateMais();
  }
  
  const buttonMenos = () => {
    if(month == 1){
      setYear(year - 1);
      setMonth(12);
    }else{
      setMonth(month - 1);
    }
    handleDateMenos();
  }

  return (
    <View style={styles.container}>
      <Header name="Oliver Santos"/>
        <Balance saldo={saldo} gastos={'-'+gasto}/>
      <Actions/>
      <View style={styles.moviments}>
        <TouchableOpacity onPress={buttonMenos}> 
          <Feather name='arrow-left' size={40} color='#000'/>
        </TouchableOpacity>
        <View style={styles.moviments_title}>
          <Text style={styles.title}>Últimas movimentações</Text>
          <Text style={styles.title}>{month+'/'+year}</Text>
        </View>
        <TouchableOpacity onPress={buttonMais}>
          <Feather name='arrow-right' size={40} color='#000'/>
        </TouchableOpacity>
      </View>
      <FlatList 
      style={styles.list} 
      data={data}
      keyExtractor={ (item) => item.id }
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={atualizando}
          onRefresh={reload}
        />
      }
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
          <Feather name='plus' size={30} color='#fff'/>
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
  },
  moviments_title:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  moviments:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonCenter:{
    height: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  buttonPlus:{
    width: 50,
    height: 50,
    bottom: 75,
    backgroundColor: '#8000ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 66/2,
  },
  list:{
    marginLeft: 14,
    marginRight: 14,
  },
});
