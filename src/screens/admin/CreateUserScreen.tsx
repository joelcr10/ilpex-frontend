import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { createUser } from "./CreateUserHook";
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import ilpex from "../../utils/ilpexUI";

const CreateUserScreen = () => {
  const [createUserName, setcreateUserName] = useState("");
  const [createEmail, setcreateEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createPassword, setcreatePassword] = useState("");
  const [buttonpressed, setButtonpressed] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handlecreateUser = async () => {
    setButtonpressed(true);
    const JWT_token = (await getItem(Constants.TOKEN)) || ''; 
  
    try {
      if (password !== createPassword) {
        setPasswordMatchError("Passwords don't match");
        return;
      }
  
      const { success, statusCode, createUserResp, errorMessage } = await createUser({
        createEmail,
        createUserName,
        createPassword,
        JWT_token,
      });
  
      if (success) {
        console.log("New L&D user created with user id:", createUserResp.user_id);
      }
    } catch (error) {
      console.error("Error during user creation:", error);
    }
  };
  

  return (
    <View>
      <TopBlackHeading 
        heading={"Create User"} 
        />
      <InputField 
        label={"User Name"} 
        isPassword={false} 
        value={createUserName} 
        onChangeText={setcreateUserName} 
        />
      <InputField 
        label={"Email"} 
        isPassword={false} 
        value={createEmail} 
        onChangeText={setcreateEmail} 
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
      value={createPassword} 
      onChangeText={setcreatePassword} 
      />
      {passwordMatchError ? <Text style={styles.errorText}>{passwordMatchError}</Text> : null}
      <Button 
        name="Create" 
        onPress={handlecreateUser} 
        buttonPressed={buttonpressed} 
        />
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: ilpex.failure,
    fontSize: 14,
    marginTop: 5,
    textAlign:'center'
  },
});

export default CreateUserScreen;
