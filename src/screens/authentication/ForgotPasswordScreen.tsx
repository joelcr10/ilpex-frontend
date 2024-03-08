import React, { useState } from "react";
import { Text,View,StyleSheet } from "react-native";
import BlackHeading from "../../components/BlackHeading";
import ilpex from "../../utils/ilpexUI";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useNavigation } from '@react-navigation/native';





const ForgotPasswordScreen = ()=>{

    const [email,setEmail] = useState('');
    const [buttonPressed, setButtonpressed] = useState(false);
    const navigation:any = useNavigation();


    const handleForgotPassword=()=>{
        setButtonpressed(true)
        navigation.navigate('Reset Password', { email:email });

    }

   return(
    <View style={styles.mainView}>
        <BlackHeading heading={"Forgot Password?"}/>
        <Text style={styles.text}>
            To initiate the password reset process, kindly provide your email address below.
        </Text>
        <InputField 
            label={"Email"} 
            isPassword={false} 
            value={email} 
            onChangeText={setEmail}
        />
        <Text>{"\n"}{"\n"}</Text>
        <Button 
            name={"Submit"} 
            onPress={handleForgotPassword} 
            buttonPressed={buttonPressed}/>
    </View>
   )


}

const styles = StyleSheet.create({
    mainView:{
        alignContent:'center',
        justifyContent:'center',
        height: '100%',
    },
    text:{
        marginTop:30,
        color: ilpex.darkGrey,
        fontFamily:ilpex.fontMedium,
        fontSize:17,
        textAlign: 'center',
        marginLeft:30,
        maxWidth:350,
        marginBottom:20, 
    }

})

export {ForgotPasswordScreen}