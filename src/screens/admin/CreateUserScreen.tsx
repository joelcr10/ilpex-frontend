import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { createUser } from "./CreateUserHook";
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import ilpex from "../../utils/ilpexUI";
import BackButton from "../../components/BackButton";
import ModalComponent from "../../components/ModalComponent";

const CreateUserScreen = () => {
  const [createUserName, setcreateUserName] = useState("");
  const [createEmail, setcreateEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createPassword, setcreatePassword] = useState("");
  const [buttonpressed, setButtonpressed] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [isCreated, setIsCreated] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [failureText, setFailureText] = useState("");

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSuccessText("");
    setFailureText("");
  };

  const createAdmin = () => {
      setButtonpressed(true);
      handlecreateUser();
  };



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
        setSuccessText("New L&D user created");
        setIsCreated(false);
      } else {
        setFailureText("This user already exists");
        setIsCreated(true);
      }
  
      showModal();
    } catch (error) {
      console.error("Error during user creation:", error);
    } finally {
      setButtonpressed(false);
    }
  };
  
  

  return (
    <View style={styles.mainView}>
      <BackButton color = 'black'/>
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
        onPress={createAdmin} 
        buttonPressed={buttonpressed} 
        />
      <ModalComponent
        isVisible={isModalVisible}
        closeModal={hideModal}
        setMessageVisible={setModalVisible}
        successText={successText}
        failureText={failureText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView:{
    justifyContent:'center',
    alignContent:'center',
    height:'100%'
  },
  errorText: {
    color: ilpex.failure,
    fontSize: 14,
    marginTop: 5,
    textAlign:'center'
  },
});

export default CreateUserScreen;
