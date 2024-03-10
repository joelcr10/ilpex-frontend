import React, { useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import BlackHeading from "../../components/BlackHeading";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import { ResetPassword } from "./ResetPasswordHook";
import ilpex from "../../utils/ilpexUI";



const ResetPasswordScreen = ()=> {

        const [newPassword,setNewPassword]=useState('');
        const [confirmPassword,setconfirmPassword]=useState('');
        const [buttonPressed,setButtonpressed]=useState(false);
        const [passwordMatchError, setPasswordMatchError] = useState("");

        const route: any = useRoute();
        const email: string = route.params["email"];



        const handleResetPassword = async() =>{
            setButtonpressed(true);
    
        try {
            if (newPassword !== confirmPassword) {
                setPasswordMatchError("Passwords don't match");
                return;
            }
    
            const { success, statusCode, resetPasswordResp, errorMessage } = await ResetPassword({
                email,
                newPassword,
                confirmPassword,
            });
    
            if (success) {
                console.log("Your Password has been changed ", resetPasswordResp.user_name);
            }
        } catch (error) {
        console.error("Error during password change", error);
        }
    };


    return(
        <View style={styles.mainView}>
            <BlackHeading heading={"Reset Password"}/>
            <Text>{"\n"}{"\n"}{"\n"}</Text>
            <InputField 
                label={"Password"} 
                isPassword={true} 
                value={newPassword} 
                onChangeText={setNewPassword}
                />
            <InputField 
                label={"Confirm Password"} 
                isPassword={true} 
                value={confirmPassword} 
                onChangeText={setconfirmPassword}
                />
            {passwordMatchError ? <Text style={styles.errorText}>{passwordMatchError}</Text> : null}
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
    },
    errorText: {
        color: ilpex.failure,
        fontSize: 14,
        marginTop: 5,
        textAlign:'center'
      },
})


export default ResetPasswordScreen;