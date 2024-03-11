import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from "../screens/authentication/LoginScreen";
import BatchesScreen from "../screens/admin/BatchesScreen";
import TraineeScreen from "../screens/admin/TraineesScreen";
import TraineeProfile from "../screens/trainee/TraineeProfileScreen";
import CreateAssessment from "../screens/admin/CreateAssessment/CreateAssessmentScreen";
import UserManagementScreen from '../screens/admin/UserManagementScreen';
import IncompleteTraineesScreen from "../screens/admin/IncompleteTraineesScreen";
import UpdateAssessmentScreen from "../screens/admin/UpdateAssessment/UpdateAssessmentScreen";

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
                name = "Profile"
                component = {TraineeProfile}
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
                name = "Update"
                component = {UpdateAssessmentScreen}
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
                name = "Incomplete"
                component = {IncompleteTraineesScreen}
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