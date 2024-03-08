import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/authentication/LoginScreen";
import { ForgotPasswordScreen } from "../screens/authentication/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/authentication/ResetPasswordScreen";



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
                <Stack.Screen
                    name="Forgot Password"
                    component={ForgotPasswordScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Reset Password"
                    component={ResetPasswordScreen}
                    options={{
                        headerShown: false
                    }}
                />
               
            </Stack.Navigator>
    )
}


export default AuthNavigation;