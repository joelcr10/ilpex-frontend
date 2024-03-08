import React, { useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import BlackHeading from "../../components/BlackHeading";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useRoute } from "@react-navigation/native";



const ResetPasswordScreen = ()=> {

    const [password,setPassword]=useState('');
    const [confirmPassword,setconfirmPassword]=useState('');
    const [buttonPressed,setButtonpressed]=useState(false);

    const route: any = useRoute();
    const email: string = route.params["email"];



    const handleResetPassword = async() =>{

    }


    return(
        <View style={styles.mainView}>
            <BlackHeading heading={"Reset Password"}/>
            <Text>{"\n"}{"\n"}{"\n"}</Text>
            <InputField 
                label={"Password"} 
                isPassword={true} 
                value={password} 
                onChangeText={setPassword}
                />
            <InputField 
                label={"Confirm Password"} 
                isPassword={true} 
                value={confirmPassword} 
                onChangeText={setconfirmPassword}
                />
             <Text>{"\n"}{"\n"}{"\n"}</Text>
            <Button 
                name={"Save"} 
                onPress={handleResetPassword}
                buttonPressed={buttonPressed}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    mainView:{
        justifyContent:'center',
        height:'100%',
    }
})


export default ResetPasswordScreen;