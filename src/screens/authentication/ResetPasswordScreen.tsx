import React, { useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import BlackHeading from "../../components/BlackHeading";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ResetPassword } from "./ResetPasswordHook";
import ilpex from "../../utils/ilpexUI";
import ModalComponent from "../../components/ModalComponent";

const ResetPasswordScreen = ()=> {

        const [newPassword,setNewPassword]=useState('');
        const [confirmPassword,setconfirmPassword]=useState('');
        const [buttonPressed,setButtonpressed]=useState(false);
        const [passwordMatchError, setPasswordMatchError] = useState("");
        const [isModalVisible, setModalVisible] = useState(false);
        const [successValue, setSuccessValue] = useState(false);

        const navigation:any = useNavigation();

        const route: any = useRoute();
        const email: string = route.params["email"];

        const showModal = () => {
            setModalVisible(true);
        };
        
        const hideModal = () => {
            setModalVisible(false);
            navigation.navigate('Login');
        };

        const handleResetPassword = async () => {
            setButtonpressed(true);
        
            try {
                // Password validation criteria
                const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
                const capitalRegex = /[A-Z]/;
                const numberRegex = /[0-9]/;

                setButtonpressed(false);
        
                let validationErrorMessage = ""; // Renamed variable
        
                if (!symbolRegex.test(newPassword)) {
                    validationErrorMessage += "Password must contain at least one symbol. ";
                }
                if (!capitalRegex.test(newPassword)) {
                    validationErrorMessage += "Password must contain at least one capital letter. ";
                }
                if (!numberRegex.test(newPassword)) {
                    validationErrorMessage += "Password must contain at least one number. ";
                }
                if (newPassword.length < 12) {
                    validationErrorMessage += "Password must be at least 12 characters long. ";
                }
        
                if (validationErrorMessage !== "") {
                    setPasswordMatchError(validationErrorMessage);
                    return;
                }
        
                if (newPassword !== confirmPassword) {
                    setPasswordMatchError("Passwords don't match");
                    return;
                }
        
                const { success, statusCode, resetPasswordResp, errorMessage } = await ResetPassword({
                    email,
                    newPassword,
                    confirmPassword,
                });
        
                setSuccessValue(success);
        
                if (success) {
                    console.log("Your Password has been changed ", resetPasswordResp.user_name);
                    showModal(); // Show the modal on success
                    setButtonpressed(false);
                } else {
                    showModal(); // Show the modal with failure message
                    setButtonpressed(false);
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
             <View style={styles.buttonview}>
             <Button 
                name={"Save"} 
                onPress={handleResetPassword}
                buttonPressed={buttonPressed}
            />
             </View>
            <ModalComponent
                isVisible={isModalVisible}
                closeModal={hideModal}
                successText={successValue ? "Your Password has been changed" : "Password change failed"}
                failureText={ "Please try again."}
                setMessageVisible={setModalVisible}
            />
        </View>
    );
};

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
      buttonview:{
        alignSelf:'center',
    },
});


export default ResetPasswordScreen;