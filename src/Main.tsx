/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./context/userSlice";
import SplashScreen from "./screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import TraineeNavigation from "./navigation/TraineeNavigation";
import AuthNavigation from "./navigation/AuthNavigation";
import AdminNavigation from "./navigation/AdminNavigation";
import { getItem } from "./utils/utils";
import Constants from "./utils/Constants";
import { userDetails } from "./context/userDetailsSlice";

const Main =  () =>{

    const isLoggedIn = useSelector((state: any) => state.userReducer.isLoggedIn);
    const role_id = useSelector((state: any) => state.userDetailsReducer.role_id);
    const trainee_id = useSelector((state: any) => state.userDetailsReducer.trainee_id);
    const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);
    const token = useSelector((state: any) => state.userDetailsReducer.token);
    const user_name = useSelector((state: any) => state.userDetailsReducer.user_name);
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        (async () => {

          const isLogin = await getItem(Constants.IS_LOGIN);          
          const token = await getItem(Constants.TOKEN);
          const role_id = await getItem(Constants.ROLE_ID);
          const user_id = await getItem(Constants.USER_ID);
          const trainee_id = await getItem(Constants.TRAINEE_ID);
          const user_name = await getItem(Constants.USER_NAME);

          const loginResp = {
            token: token||'',
            role_id: role_id||'',
            user_id: user_id||'',
            trainee_id:trainee_id||'',
            user_name:user_name||'',
          }
          if (isLogin === 'true') {
            dispatch(userLogin(true));
            dispatch(userDetails(loginResp));
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
