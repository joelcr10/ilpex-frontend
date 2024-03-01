import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TraineeHomeScreen from "../screens/trainee/TraineeHomeScreen";




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
            </Stack.Navigator>
        )
}

export default TraineeNavigation;
