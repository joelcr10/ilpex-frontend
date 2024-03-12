import 'react-native-gesture-handler';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BatchesScreen from "../screens/admin/BatchesScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import TraineeProfileScreen from "../screens/trainee/TraineeProfileScreen";
import BatchDetailsPage from "../screens/admin/BatchDetailsPage";
import CreateUserScreen from "../screens/admin/CreateUserScreen";
import TraineeProileAnalysisScreen from "../screens/admin/TraineeProfileAnalysisScreen";
import DrawerNavigation from "./DrawerNavigation";
import ManageTraineeScreen from '../screens/admin/ManageTrainee';
import DayWiseDetailsPage from "../screens/admin/DayDetailsScreen";
import IncompleteTraineesScreen from '../screens/admin/IncompleteTraineesScreen';
import UpdateAssessmentScreen from '../screens/admin/UpdateAssessment/UpdateAssessmentScreen';
const Stack = createNativeStackNavigator();
const AdminNavigation = () =>{
        return(
            <Stack.Navigator>
                
                
                {/* <Stack.Screen 
                    name="AdminBottomTab"
                    component={BottomTabNavigation}
                    options={{
                        headerShown: false
                    }}
                /> */}
                <Stack.Screen 
                    name="SideDrawerNav"
                    component={DrawerNavigation}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="TraineeProfile"
                    component={TraineeProfileScreen}
                    options={{
                        headerShown: false
                }}
                />
                 {/* <Stack.Screen 
                    name="TraineeProfile"
                    component={TraineeProfile}
                    options={{
                        headerShown: false
                }}
                /> */}
                 <Stack.Screen 
                    name="BatchDetails"
                    component={BatchDetailsPage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="Create User"
                    component={CreateUserScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name = "TraineeProileAnalysisScreen"
                    component = {TraineeProileAnalysisScreen}
                    options = {{
                        headerShown : false
                    }}
                />
                <Stack.Screen
                    name = "ManageTrainee"
                    component = {ManageTraineeScreen}
                    options = {{
                        headerShown : false
                    }}
                />
                <Stack.Screen 
                    name="batchDayWiswDetails"
                    component={DayWiseDetailsPage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="incompleteTraineScreen"
                    component={IncompleteTraineesScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="updateAssesments"
                    component={UpdateAssessmentScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        )
}

export default AdminNavigation;
