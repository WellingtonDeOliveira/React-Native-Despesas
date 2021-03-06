import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MotiView, AnimatePresence, MotiText } from 'moti';
import { MaterialIcons } from '@expo/vector-icons';

import { DateContext } from '../../context/auth';

export type MoviProps = {
    id: string;
    titulo: string;
    valor: string;
    date: string;
    tipo: string;
}

type Props = {
    data: MoviProps;
    onPress: () => void;
}

export default function Movements({data, onPress}:Props){
    const {date} = useContext(DateContext);
    const [showValue, setShowValue] = useState(false);
    const time = new Date(data.date);
    var valorT = parseFloat(data.valor.replace(',','.')).toFixed(2).toString();

    if(time.getMonth()+1+'/'+time.getFullYear() == date.mes+'/'+date.ano){
    return (
        <View style={styles.master}>
            <TouchableOpacity style={styles.container} onPress={ () => setShowValue(!showValue)}>
                <Text style={styles.date}>{time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()}</Text>
                
                <View style={styles.content}>
                    <Text style={styles.label}>{data.titulo}</Text>

                    { showValue ? (
                        <AnimatePresence exitBeforeEnter>
                            <MotiText
                            style={data.tipo == 'receita' ? styles.value : styles.expense}
                            from={{
                                translateX:100,
                            }}
                            animate={{
                                translateX: 0
                            }}
                            transition={{
                                type: 'timing',
                                duration: 300,
                            }}
                            >
                            {data.tipo == 'receita' ? `R$ ${valorT.replace(".", ",")}` : `R$ -${valorT.replace(".", ",")}`}
                            </MotiText>
                        </AnimatePresence>
                        ) : (
                        <AnimatePresence exitBeforeEnter>
                            <MotiView 
                                style={styles.skeleton}
                                from={{opacity:0}}
                                animate={{opacity:1}}
                                transition={{type:'timing'}}
                            >
                            </MotiView>
                        </AnimatePresence>
                    )

                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <MaterialIcons
                name="delete"
                size={25}
                color="#f65"
                />
            </TouchableOpacity>
        </View>
    );
}
else{
    return(null);
}
}

const styles = StyleSheet.create({
    master:{
        flex: 1,
        height: 60,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dadada',
        flexDirection: 'row',
    },
    container:{
        flex: 1,
    },
    content:{
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 8,
        justifyContent: 'space-between',
        paddingRight: 20
    },
    date:{
        marginTop: 5,
        color: '#bababa',
        fontWeight: 'bold',
        paddingBottom: 5
    },
    label:{
        fontWeight: 'bold',
        fontSize: 16,
        paddingRight: '10%'
    },
    value:{
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold',
    },
    expense:{
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    skeleton:{
        marginTop: 6,
        width: 90,
        height: 10,
        backgroundColor: '#dadada',
        borderRadius: 8,
    }, 
    button:{
        width: '10%',
        borderLeftWidth: 0.5,
        borderLeftColor: '#dadada',
        paddingLeft: 10,
        alignSelf: 'center'
    }
})