import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import BlackHeading from "../../components/BlackHeading";
import ilpex from "../../utils/ilpexUI";
import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { verification } from "./VerificationHook";

const VerificationScreen = () => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [enteredOtp, setenteredOtp] = useState("");
  const navigation:any = useNavigation();
  const route = useRoute();
  const email = (route.params as { email?: string })?.email || "";

  const handleVerification = async () => {
    try {

       const {success, statusCode, verificationResp, errorMessage} = await verification({email,enteredOtp,})

      if (success) {
        // OTP verification successful, navigate to the reset password screen
        navigation.navigate("Reset Password", { email: email });
      } else {
        Alert.alert("Invalid OTP", "Please enter the correct OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    }
  };

  const handleInputChange = (enteredOtp: React.SetStateAction<string>) => {
    setenteredOtp(enteredOtp);
  };

  return (
    <View style={styles.mainView}>
      <BlackHeading heading={"Verification"} />
      <Text style={styles.text}>
        Please enter the 4-digit code sent to your email address to complete the
        verification process.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        onChangeText={handleInputChange}
        value={enteredOtp}
      />
      <View style={{alignSelf:'center'}}>
        <Button
          name={"Verify"}
          onPress={handleVerification}
          buttonPressed={buttonPressed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
  },
  text: {
    marginTop: 30,
    color: ilpex.darkGrey,
    fontFamily: ilpex.fontMedium,
    fontSize: 17,
    textAlign: "center",
    marginLeft: 30,
    maxWidth: 350,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    paddingLeft: 10,
  },
});

export default VerificationScreen;
