import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TraineeHomeScreen from "../screens/trainee/TraineeHomeScreen";
import AssessmentScreen from "../screens/trainee/AssessmentScreen";
import TraineeDayScreen from "../screens/trainee/TraineeDayScreen";


const Stack = createNativeStackNavigator();
const TraineeNavigation = () =>{
        return(
            <Stack.Navigator>
                <Stack.Screen 
                    name="TraineeHome"
                    component={TraineeHomeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="Assessment"
                    component={AssessmentScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="Day"
                    component={TraineeDayScreen}
                    options={{
                        headerShown: false
                    }}
                />

            </Stack.Navigator>
        )
}

export default TraineeNavigation;
