import { Text, View } from 'react-native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './AuthenticationHook';
import { getItem, setStringItem } from '../../utils/utils';
import Constants from '../../utils/Constants';
import { userLogin } from '../../context/userSlice';
import { userToken } from '../../context/tokenSlice';
import { useState } from 'react';

const LoginScreen = () => {

    const navigation = useNavigation();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setloginPassword] = useState('');
    const dispatch = useDispatch();
  
    const handleLogin = async () => {
      try {
        
        const { success, statusCode, loginResp, errorMessage } = await loginUser({
          loginEmail,
          loginPassword,
        });
  
        // console.log(loginResp.user_id);
  
        if (success) {
          setStringItem(Constants.IS_LOGIN,'true')
          dispatch(userLogin(true));
          setStringItem(Constants.TOKEN, loginResp.token);
  
          setStringItem(Constants.TOKEN, JSON.stringify(loginResp));
        //   console.log(`token to string`+ JSON.stringify(loginResp))
          dispatch(userToken(loginResp));
           const userTokenString = await getItem(Constants.TOKEN)
        //    console.log(`token as string`,userTokenString);
  
           if (userTokenString) {
            const userToken= JSON.parse(userTokenString);
            // console.log(`user token`+userToken);
          } else {
            console.error('User details not found.');
          }
        } else {
          console.error('Login failed:', errorMessage);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
    return ( 
        <View>
            <Text>Login screen</Text>
        </View>
     );
}
 
export default LoginScreen;