import 'react-native-reanimated';
import * as React from 'react';
import 'react-native-gesture-handler';
import Home from './src/pages/Home';
import Edit from './src/pages/Edit';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false
          }}
      />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

