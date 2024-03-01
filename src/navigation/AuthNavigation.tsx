import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/authentication/LoginScreen";



const Stack = createNativeStackNavigator();

const AuthNavigation = () =>{
    return(
        <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />
               
            </Stack.Navigator>
    )
}


export default AuthNavigation;