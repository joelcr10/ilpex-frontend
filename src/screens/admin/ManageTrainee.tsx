import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ilpex from "../../utils/ilpexUI";
import TopBlackHeading from "../../components/TopBlackHeading";
import Button from "../../components/Button";
import ModalComponent from "../../components/ModalComponent";
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import { getHook } from "../../network/getHook/getHook";
import { useRoute } from "@react-navigation/native";
import { UpdateTraineeStatus } from "./ManageTraineeHook";
import BackButton from "../../components/BackButton";

const ManageTraineeScreen = () => {
  const route: any = useRoute();
  const user_id = route.params?.user_id;

  const [traineeName, setTraineeName] = useState("");
  const [traineeBatch, setTraineeBatch] = useState("");
  const [traineeEmail, setTraineeEmail] = useState("");
  const [percepioEmail, setPercepioEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [activateButtonPressed, setActivateButtonPressed] = useState(false);
  const [deactivateButtonPressed, setDeactivateButtonPressed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [failureText, setFailureText] = useState("");

  useEffect(() => {
    const getTraineeDetails = async () => {
      try {
        const { responseData, errorMessage } = await getHook(`/api/v3/profile/${user_id}`);

        if (responseData) {
          setTraineeName(responseData.data.user_name);
          setTraineeBatch(responseData.data.trainee.batch.batch_name);
          setTraineeEmail(responseData.data.email);
          setPercepioEmail(responseData.data.percipio_email);
          setIsActive(responseData.data.trainee.isActive);
          console.log("batch id set", responseData.data);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    const traineeDetailsLoader = async () => {
      await getTraineeDetails();
    };

    traineeDetailsLoader();
  }, [route.params]);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSuccessText("");
    setFailureText("");
  };

  const activateTrainee = () => {
    if (!isActive) {
      setActivateButtonPressed(true);
      handleManageTrainee(1);
    }
  };

  const deactivateTrainee = () => {
    if (isActive) {
      setDeactivateButtonPressed(true);
      handleManageTrainee(0);
    }
  };

  const handleManageTrainee = async (status:number) => {
    const user_name = traineeName;
    const email = traineeEmail;
    setActivateButtonPressed(false);
    setDeactivateButtonPressed(false);
    console.log(user_id);
    const JWT_token = (await getItem(Constants.TOKEN)) || ''; 

    try {
      
      if (activateButtonPressed) {
        const {success, statusCode, manageTraineeResp, errorMessage} = await UpdateTraineeStatus({ user_id,status,user_name,email,JWT_token});

        // Check the response and update the state accordingly
        console.log(manageTraineeResp);
        if (success) {
          setIsActive(true);
          setActivateButtonPressed(false);
        }
      }
  
      if (deactivateButtonPressed) {
        const {success, statusCode, manageTraineeResp, errorMessage} = await UpdateTraineeStatus({ user_id,status,user_name,email,JWT_token});
        // Check the response and update the state accordingly
        console.log(manageTraineeResp);
        if (success) {
          setIsActive(false);
          setDeactivateButtonPressed(false);
        }
      }
  
      // Set the success and failure texts based on the isActive state
      const successText = isActive ? "This Account has been deactivated" : "";
      const failureText = isActive ? "" : "This account cannot be activated";
  
      // Show the modal with the appropriate texts
      setSuccessText(successText);
      setFailureText(failureText);
      showModal();
    } catch (error) {
      console.log('Error updating trainee status:', error);
    }
  };
  

  return (
    <View>
      <TopBlackHeading heading={"Manage Trainee"} />
      <View style={styles.detailsView}>
        <Text style={styles.title}>Trainee Name</Text>
        <Text style={styles.props}>{traineeName}</Text>
        <Text style={styles.title}>Batch Name</Text>
        <Text style={styles.props}>{traineeBatch}</Text>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.props}>{traineeEmail}</Text>
        <Text style={styles.title}>Percepio Mail</Text>
        <Text style={styles.props}>{percepioEmail}</Text>
      </View>
      <View>
        {isActive ? (
          <Button
            name={"Deactivate"}
            onPress={deactivateTrainee}
            buttonPressed={deactivateButtonPressed}
          />
        ) : (
          <Button
            name={"Activate"}
            onPress={activateTrainee}
            buttonPressed={activateButtonPressed}
          />
        )}
      </View>
      <ModalComponent
        isVisible={isModalVisible}
        closeModal={hideModal}
        setMessageVisible={setModalVisible}
        successText={successText}
        failureText={failureText}
      />
      <BackButton color={"black"} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: ilpex.fontRegular,
    fontSize: 20,
  },
  props: {
    fontFamily: ilpex.fontRegular,
    fontSize: 20,
    color: ilpex.black,
  },
  detailsView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 30,
  },
});

export default ManageTraineeScreen;
