import React, { useState } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import uuid from 'uuid';
import { useAsyncStorage }  from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';


const UselessTextInput = ({navigation}) => {

    const [date, setDate] = useState(new Date());
    const [titulo, setTitulo] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const teste = () => {Toast.show({ type: "error", text1: "Erro ao Cadatrar!" });}
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    const { getItem, setItem } = useAsyncStorage("@DespesasRN:Moviments");

    async function handleNew(){
        try{
            const id = uuid.v4();
            
            const newData = {
              id,
              titulo,
              valor,
              tipo
            }
    
          const response = await getItem();
          const previousData = response ? JSON.parse(response) : [];
    
          const data = [...previousData, newData];
          
          await setItem(JSON.stringify(data));
          Toast.show({
            type: "success",
            text1: "Cadastrado com sucesso!"
          });
          console.log(data);
        }catch(error){
          Toast.show({
            type: "error",
            text1: "Erro ao Cadatrar!"
          });
        }
      }
    
 return (
    <View style={styles.container}>
        <SafeAreaView style={styles.content}>
            <Text style={styles.titulo}>Cadastrar Movimento</Text>
            <TextInput
                placeholder='Titulo'
                onChangeText={setTitulo}
                keyboardType="default"
                style={styles.input}
                />
            <TextInput
                placeholder='Valor'
                onChangeText={setValor}
                keyboardType="decimal-pad"
                style={styles.input}
                />

            <TextInput
                placeholder='Tipo'
                onChangeText={setTipo}
                keyboardType="decimal-pad"
                style={styles.input}
                />

            <View>
                <View>
                <TouchableOpacity 
                    onPress={showDatepicker}
                    style={styles.buttonData}
                    >
                        <Text style={styles.textoData}>Selecionar Data</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.tituloData}>Data: {date.toDateString()} </Text>
                {show && (
                    <DateTimePicker
                    testID="DateTimePicker"
                    value={date}
                    mode={mode}
                    onChange={onChange}
                />
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={teste}
            >
                <Feather  name='check' size={25} color='#fff'/>
                <Text style={styles.texto}> Salvar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </View>
 );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    content:{
        top: 80,
        width: '100%',
        alignItems: 'center',
    },
    titulo:{
        fontSize: 25,
        fontWeight: 'bold',
        bottom: 20,
    },
    input: {
        height: 40,
        width: '70%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button:{
        height: 40,
        width: '40%',
        margin: 12,
        padding: 10,
        backgroundColor: '#8000ff',
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'center',
        padding: 5,
        marginTop: 50
    },
    texto:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonData:{
        width: '120%',
        marginLeft: '-10%',
        backgroundColor: '#8000ff',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginBottom: 10,
        marginTop: 10
    },
    textoData:{
        color: '#fff',
        fontSize: 18,
    },
    tituloData:{
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default UselessTextInput;