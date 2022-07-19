import React, { useState } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { useAsyncStorage }  from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function UselessTextInput({navigation}) {

    const [date, setDate] = useState(new Date());
    const [titulo, setTitulo] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = React.useState('despesa');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
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
              tipo,
              date
            }
    
          const response = await getItem();
          const previousData = response ? JSON.parse(response) : [];
    
          const data = [...previousData, newData];
          
          await setItem(JSON.stringify(data));
          Toast.show({
            type: "success",
            text1: "Cadastrado com sucesso!"
          });
          navigation.navigate("Home")
        }catch(error){
            Toast.show({
                type: "error",
                text1: "Erro ao Cadatrar!"
            });
            console.log(error);
        }
      }
    
 return (
     <View style={styles.container}>
        <Toast position='bottom'/>
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

            <View style={styles.radios}>
                <View style={styles.radio}>    
                    <Text style={styles.radioText}>Despesa:</Text>
                    <RadioButton
                        value="despesa"
                        color="#e74c3c"
                        status={ tipo === 'despesa' ? 'checked' : 'unchecked' }
                        onPress={() => setTipo('despesa')}
                        />
                </View>
                <View style={styles.radio}>    
                    <Text style={styles.radioText}>Receita:</Text>
                    <RadioButton
                        value="receita"
                        color="#2ecc71"
                        status={ tipo === 'receita' ? 'checked' : 'unchecked' }
                        onPress={() => setTipo('receita')}
                        />
                </View>
            </View>

            <View style={styles.calendar}>
                <View>
                <TouchableOpacity 
                    onPress={showDatepicker}
                    style={styles.buttonData}
                    >
                        <Feather  name='calendar' size={25} color='#fff'/>
                        <Text style={styles.textoData}> Selecionar Data</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.tituloData}>Data: {date.toDateString()} </Text>
                {show && (
                    <DateTimePicker
                    testID="DateTimePicker"
                    value={date}
                    onChange={onChange}
                />
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleNew} //Funcao save
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
    calendar:{
        alignItems: 'center',
    },
    button:{
        height: 45,
        width: '40%',
        margin: 12,
        paddingTop: 10,
        backgroundColor: '#8000ff',
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 50
    },
    radioText:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    radio:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    radios:{
        alignItems: 'center',
        flexDirection: 'column'
    },
    texto:{
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonData:{
        width: '50%',
        flexDirection: 'row',
        backgroundColor: '#8000ff',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
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