import React, { useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import InputField from "../../components/InputField";
import Button from "../../components/Button";



const CreateUserScreen = ()=> {

    const [userName, setUserName]= useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [buttonpressed, setButtonpressed] = useState(false);


    const handlecreateUser = ()=>{
        setButtonpressed(true)
            console.log("user created");
    }

    return(
        <View>
            <TopBlackHeading heading={"Create User"}/>
            <InputField 
                label={"User Name"} 
                isPassword={false} 
                value={userName} 
                onChangeText={setUserName}
            />
            <InputField 
                label={"Email"} 
                isPassword={false} 
                value={email} 
                onChangeText={setEmail}
            />
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
                onChangeText={setConfirmPassword}
            />
            <Button 
                name="Create" 
                onPress={handlecreateUser}
                buttonPressed={buttonpressed}
            />
        </View>
    )

}

const styles = StyleSheet.create({

});

export default CreateUserScreen;