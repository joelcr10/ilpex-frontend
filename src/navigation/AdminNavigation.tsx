import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BatchesScreen from "../screens/admin/BatchesScreen/BatchesScreen";
import BottomTabNavigation from "./BottomTabNavigation";

const Stack = createNativeStackNavigator();
const AdminNavigation = () =>{
        return(
            <Stack.Navigator>
                <Stack.Screen 
                    name="AdminBottomTab"
                    component={BottomTabNavigation}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        )
}

export default AdminNavigation;
