import 'react-native-gesture-handler';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TraineeProfileScreen from "../screens/trainee/TraineeProfileScreen";
import BatchDetailsPage from "../screens/admin/BatchDetailsPage";
import CreateUserScreen from "../screens/admin/CreateUserScreen";
import TraineeProileAnalysisScreen from "../screens/admin/TraineeProfileAnalysisScreen";
import DrawerNavigation from "./DrawerNavigation";
import ManageTraineeScreen from '../screens/admin/ManageTrainee';
import DayWiseDetailsPage from "../screens/admin/DayDetailsScreen";
import IncompleteTraineesScreen from '../screens/admin/IncompleteTraineesScreen';
import UpdateAssessmentScreen from '../screens/admin/UpdateAssessment/UpdateAssessmentScreen';
import NotWatchedScreen from '../screens/admin/NotWatchedScreen';
import OnePointFiveTimesSpeed from '../screens/admin/OnePointFiveTimesSpeedScreen';
import OneTimesWatchSpeedScreen from '../screens/admin/OneTimesWatchSpeedScreen';
import TwoTimesWatchSpeedScreen from '../screens/admin/TwoTimesWatchSpeedScreen';
import LessThanOneTimesWatchSpeedScreen from '../screens/admin/LessThanOneTimesWatchSpeedScreen';
import BatchIncompleteTraineesScreen from '../screens/admin/BatchIncompleteTraineesScreen';
import PercipioAssessmentTraineeList from '../screens/admin/PercipioAssessmentTraineeListScreen';
import AssessmentTraineeList from '../screens/admin/AssessmentTraineeList';

const Stack = createNativeStackNavigator();
const AdminNavigation = () =>{
        return(
            <Stack.Navigator>
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
                <Stack.Screen 
                    name="NotWatchedScreen"
                    component={NotWatchedScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="OnePointFiveTimesSpeed"
                    component={OnePointFiveTimesSpeed}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="OneTimesWatchSpeedScreen"
                    component={OneTimesWatchSpeedScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="TwoTimesWatchSpeedScreen"
                    component={TwoTimesWatchSpeedScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="LessThanOneTimesWatchSpeedScreen"
                    component={LessThanOneTimesWatchSpeedScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="BatchIncompleteTraineesScreen"
                    component={BatchIncompleteTraineesScreen}
                    options={{
                        headerShown: false
                    }}
                />
                 <Stack.Screen 
                    name="PercipioAssessmentTraineeList"
                    component={PercipioAssessmentTraineeList}
                    options={{
                        headerShown: false
                    }}
                />
                 <Stack.Screen 
                    name="AssessmentTraineeList"
                    component={AssessmentTraineeList}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        )
}

export default AdminNavigation;
