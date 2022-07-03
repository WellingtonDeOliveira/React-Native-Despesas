import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DataPicker() {
    const [date, setDate] = useState(new Date());
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
  
    return (
      <View>
        <View>
          <TouchableOpacity 
            onPress={showDatepicker}
            style={styles.button}
            >
                <Text style={styles.texto}>Selecionar Data</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.titulo}>Data: {date.toDateString()} </Text>
        {show && (
          <DateTimePicker
            testID="DateTimePicker"
            value={date}
            mode={mode}
            onChange={onChange}
          />
        )}
      </View>
    );
}    

const styles = StyleSheet.create({
    button:{
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
    texto:{
        color: '#fff',
        fontSize: 18,
    },
    titulo:{
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    }
})