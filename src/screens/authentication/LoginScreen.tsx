import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './AuthenticationHook';
import { getItem, setStringItem } from '../../utils/utils';
import Constants from '../../utils/Constants';
import { userLogin } from '../../context/userSlice';
import { useState } from 'react';
import BlackHeading from '../../components/BlackHeading';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { userDetails } from '../../context/userDetailsSlice';

const LoginScreen = () => {

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


          dispatch(userDetails(loginResp));
          console.log(loginResp);

          setStringItem(Constants.TOKEN, loginResp.token);
          const token = await getItem(Constants.TOKEN);
          console.log("token is",token);


          setStringItem(Constants.USER_ID, loginResp.user_id);
          const user_id = await getItem(Constants.USER_ID);
          console.log(`user id is`,user_id);


          setStringItem(Constants.ROLE_ID,loginResp.role_id);
          const role_id = await getItem(Constants.ROLE_ID)
          console.log('role id is',role_id);

          setStringItem(Constants.TRAINEE_ID,loginResp.trainee_id);
          const trainee_id = await getItem(Constants.TRAINEE_ID);
          console.log('trainee id is',trainee_id);

          
           const userTokenString = await getItem(Constants.TOKEN)
           console.log(`token as string`,userTokenString);
  
           if (userTokenString) {
            console.log('User details stored.');
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