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

const ManageTraineeScreen = () => {
  const route = useRoute();
  const [traineeName, setTraineeName] = useState("");
  const [traineeBatch, setTraineeBatch] = useState("");
  const [traineeEmail, setTraineeEmail] = useState("");
  const [percepioEmail, setPercepioEmail] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getTraineeDetails = async () => {
      try {
      //   const user_id = route.params["user_id"];
      //   const { responseData, errorMessage } = await getHook(`/api/v3/profile/${user_id}`);
        const { responseData, errorMessage } = await getHook(`/api/v3/profile/6`);

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
// });


  const [activateButtonPressed, setActivateButtonPressed] = useState(false);
  const [deactivateButtonPressed, setDeactivateButtonPressed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    setActivateButtonPressed(false);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const activateTrainee = () => {
    if (!isActive) {
      setActivateButtonPressed(true);
      showModal();
      handleManageTrainee();
    }
  };

  const deactivateTrainee = () => {
    if (isActive) {
      setDeactivateButtonPressed(true);
      showModal();
      handleManageTrainee();
    }
  };

  const handleManageTrainee = async () => {
    setDeactivateButtonPressed(false);
    const user_idString = await getItem(Constants.USER_ID);
    const user_id = user_idString ? parseInt(user_idString) : 0;
    
    if (activateButtonPressed) {
      await UpdateTraineeStatus({ user_id, status: 1 }); 
    }
    if(deactivateButtonPressed) {
        await UpdateTraineeStatus({ user_id, status: 0 }); 
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
        ) : null}
          {!isActive ? (
              <Button
                name={"Activate"}
                onPress={activateTrainee}
                buttonPressed={activateButtonPressed}
              />
                      ) : null}
      </View>
      <ModalComponent
        isVisible={isModalVisible}
        closeModal={hideModal}
        setMessageVisible={setModalVisible}
        successText={"This Account has been activated"}
        failureText={"This account cannot be deactivated"}
      />
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
