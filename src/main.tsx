/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getItem } from "./utils/utils";
// import constants from "./utils/constants";
import { userLogin } from "./context/userSlice";
import SplashScreen from "./screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import TraineeNavigation from "./navigation/TraineeNavigation";
import AuthNavigation from "./navigation/AuthNavigation";
import AdminNavigation from "./navigation/AdminNavigation";
import TraineeDayScreen from "./screens/trainee/TraineeDayScreen";
import { getItem } from "./utils/utils";
import Constants from "./utils/Constants";



const Main = () =>{

  // dotenv.config();
    const isLoggedIn = useSelector((state: any) => state.userReducer.isLoggedIn);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log('home',process.env.IP_ADDRESS, process.env.BACKEND_PORT)

    const role_id: string = '103' //change this to '103' to navigate to Trainee screen

    useEffect(() => {
        setIsLoading(true);
        (async () => {
          const isLogin = await getItem(Constants.IS_LOGIN);
          // const isLogin = 'true';
    
          if (isLogin === 'true') {
            dispatch(userLogin(true));
          } else {
            dispatch(userLogin(false));
          }
          setIsLoading(false);
        })();
      }, []);
    
    return isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
            {isLoggedIn ? (
                role_id=='103'? 
                <TraineeNavigation /> : <AdminNavigation/>
            )  : <AuthNavigation />}
        </NavigationContainer>
      );
}


export default Main;