import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from "../screens/authentication/LoginScreen";
import BatchesScreen from "../screens/admin/BatchesScreen";
import TraineeScreen from "../screens/admin/TraineesScreen";
import TraineeProfile from "../screens/trainee/TraineeProfileScreen";
import CreateAssessment from "../screens/admin/CreateAssessmentScreen";
import UserManagementScreen from '../screens/admin/UserManagementScreen';

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
                name = "Trainees"
                component = {TraineeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) =>{
                        return(
                            <Icon name="users" size={30} color={color}/>
                        )
                    }
                }}
            />
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
            <BottomTab.Screen
                name = "Assessment"
                component = {CreateAssessment}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) =>{
                        return(
                            <Icon name="users" size={30} color={color}/>
                        )
                    }
                }}
            />
               <BottomTab.Screen 
                name="ManageUser"
                component={UserManagementScreen}   
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