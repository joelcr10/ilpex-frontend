import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BatchesScreen from "../screens/admin/BatchesScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import TraineeProfileScreen from "../screens/trainee/TraineeProfileScreen";
import BatchDetailsPage from "../screens/admin/BatchDetailsPage";
import CreateUserScreen from "../screens/admin/CreateUserScreen";
import TraineeProileAnalysisScreen from "../screens/admin/TraineeProfileAnalysisScreen";

const Stack = createNativeStackNavigator();
const AdminNavigation = () =>{
        return(
            <Stack.Navigator>
                
                {/* <Stack.Screen 
                    name="BatchDetails"
                    component={BatchDetailsPage}
                    options={{
                        headerShown: false
                    }}
                /> */}
                <Stack.Screen 
                    name="AdminBottomTab"
                    component={BottomTabNavigation}
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
            </Stack.Navigator>
        )
}

export default AdminNavigation;
