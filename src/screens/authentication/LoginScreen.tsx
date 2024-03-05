import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './AuthenticationHook';
import { getItem, setStringItem } from '../../utils/utils';
import Constants from '../../utils/Constants';
import { userLogin } from '../../context/userSlice';
import { userToken } from '../../context/tokenSlice';
import { useState } from 'react';
import BlackHeading from '../../components/BlackHeading';
import InputField from '../../components/InputField';
import Daywise from '../../components/DaywiseCard';
import Button from '../../components/Button';

const LoginScreen = () => {

    const navigation = useNavigation();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setloginPassword] = useState('');
    const dispatch = useDispatch();
    const [buttonpressed, setButtonpressed] = useState(false);
  
    const handleLogin = async () => {
      try {

        setButtonpressed(true)
        
        const { success, statusCode, loginResp, errorMessage } = await loginUser({
          loginEmail,
          loginPassword,
        });
  
        console.log(loginResp.user_id);
  
        if (success) {
          setStringItem(Constants.IS_LOGIN,'true')
          dispatch(userLogin(true));
          setStringItem(Constants.TOKEN, loginResp.token);
  
          setStringItem(Constants.TOKEN, JSON.stringify(loginResp));
          console.log(`token to string`+ JSON.stringify(loginResp))
          dispatch(userToken(loginResp));
           const userTokenString = await getItem(Constants.TOKEN)
           console.log(`token as string`,userTokenString);
  
           if (userTokenString) {
            const userToken= JSON.parse(userTokenString);
            console.log(`user token`+userToken);
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
        <View >
            <BlackHeading heading='Login'/>
            <View style={styles.inputfieldview}>
                <InputField 
                  label='User' 
                  isPassword={false} 
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                  />
                  <InputField
                    label='Password'
                    isPassword={true}
                    value={loginPassword}
                    onChangeText={setloginPassword}
                  />
                  <View style={styles.buttonview}>
                    <Button 
                      name='Login'
                      onPress={handleLogin}
                      buttonPressed={buttonpressed}
                    />
                  </View>
                  
            </View>
            
        </View>
     );
}

const styles = StyleSheet.create({
  inputfieldview:{
    top:250,
  },
  buttonview:{
      top:50,
  }
  
})
 
export default LoginScreen;