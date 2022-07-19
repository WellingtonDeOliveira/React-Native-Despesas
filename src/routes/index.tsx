import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from '../pages/Home';
import Edit from '../pages/Edit';
import EditUser from '../pages/EditUser';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes(){
    return(
        <Navigator>
            <Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
                />
            <Screen
                name="Edit"
                component={Edit}
                />
        </Navigator>
    )
}