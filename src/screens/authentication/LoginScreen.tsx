import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './AuthenticationHook';
import { getItem, setStringItem } from '../../utils/utils';
import Constants from '../../utils/Constants';
import { userLogin } from '../../context/userSlice';
import { useState } from 'react';
import BlackHeading from '../../components/BlackHeading';
import InputField from '../../components/InputField';
import { userDetails } from '../../context/userDetailsSlice';
import { Link } from '@react-navigation/native';
import ilpex from '../../utils/ilpexUI';
import LoginButton from '../../components/loginbutton';

const LoginScreen = () => {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setloginPassword] = useState('');
    const dispatch = useDispatch();
    const [buttonpressed, setButtonpressed] = useState(false);
    const [missingFieldError, setMissingFieldError] = useState("");

    const handleLogin = async () => {
      try {

        if(loginEmail==''||loginPassword==''){
          setMissingFieldError("You need to enter your email and password");
          return;
        }
        
        setButtonpressed(true)
        const { success, statusCode, loginResp, errorMessage } = await loginUser({
          loginEmail,
          loginPassword,
        });
  
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

          setStringItem(Constants.USER_NAME,loginResp.user_name);
          const user_name = await getItem(Constants.USER_NAME);
          console.log('trainee id is',user_name);
          
          const userTokenString = await getItem(Constants.TOKEN)
          console.log(`token as string`,userTokenString);
  
           if (userTokenString) {
            console.log('User details stored.');
            } else {
            console.error('User details not found.');
          }
        } if(!success) {
          setMissingFieldError(`Invalid Credentials`);
          setButtonpressed(false);
          setLoginEmail('');
          setloginPassword('');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    return ( 
        <View style={styles.container}>
          <ImageBackground source={require('../../../assets/images/login.png')} style={styles.backgroundImage}/>
            <View style={styles.inputFieldView}>
              <BlackHeading heading='Login'/>
                <InputField 
                  label='Email' 
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
                  <View style={styles.textView}>
                    <Link to={{screen:'Forgot Password'}} style={styles.textView}>Forgot Password?</Link>
                  </View>
                  {missingFieldError!=='' ? <Text style={styles.errorText}>{missingFieldError}</Text> : null}
                  <View style={styles.buttonView}>
                    <LoginButton 
                      name='Login'
                      onPress={handleLogin}
                      buttonPressed={buttonpressed}
                    />
                  </View>
            </View>
        </View>
     );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  inputFieldView:{
    marginTop:50,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent:'center',
  },
  buttonView:{
      marginTop:10,
      alignSelf:'center',
  },
  textView:{
    color:ilpex.darkGrey,
    alignItems:'center',
    fontFamily:ilpex.fontMedium,
    fontSize:15,
  },
  errorText: {
    color: ilpex.failure,
    fontSize: 14,
    marginTop: 5,
    textAlign:'center'
  },
  
});
 
export default LoginScreen;
