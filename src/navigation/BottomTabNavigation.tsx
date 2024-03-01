import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from "../screens/authentication/LoginScreen";
import BatchesScreen from "../screens/admin/BatchesScreen";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () =>{
    return(
        <BottomTab.Navigator
            initialRouteName="Batches"
            screenOptions={{
                tabBarActiveTintColor: '#8518FF', // Color when tab is active
                tabBarInactiveTintColor: 'gray', // Color when tab is inactive
                tabBarHideOnKeyboard: true
            }}
        >
            <BottomTab.Screen 
                name="Batches"
                component={BatchesScreen}   
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) =>{
                        return(
                            <Icon name="users" size={30} color={color}/>
                        )
                    }
                }}
            /> 
            
            
        </BottomTab.Navigator>
    )
}

export default BottomTabNavigation;