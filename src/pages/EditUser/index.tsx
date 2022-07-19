import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { useAsyncStorage }  from '@react-native-async-storage/async-storage';

export default function EditUser({navigation}) {
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Feather name='plus' size={30} color='#fff'/>
        </TouchableOpacity>
    )
}