
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
import { UpdateTraineeStatus, ManageTraineeProp, ManageTraineeResponse } from "./ManageTraineeHook";
import BackButton from "../../components/BackButton";

const ManageTraineeScreen = () => {
  const route: any = useRoute();
  const user_id = route.params?.user_id;

  const [traineeName, setTraineeName] = useState("");
  const [traineeBatch, setTraineeBatch] = useState("");
  const [traineeEmail, setTraineeEmail] = useState("");
  const [percepioEmail, setPercepioEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [failureText, setFailureText] = useState("");
  const [response, setResponse] = useState<ManageTraineeResponse>({
    success: false,
    errorMessage: '',
    statusCode: '',
    manageTraineeResp: null
  });

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
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    getTraineeDetails();
  }, [user_id]);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSuccessText("");
    setFailureText("");
  };

  const handleManageTrainee = async (status: number) => {
    const user_name = traineeName;
    const email = traineeEmail;
    const JWT_token = await getItem(Constants.TOKEN) || ''; 

    try {
        const result = await UpdateTraineeStatus({ user_id, status, user_name, email, JWT_token });
        setResponse(result);
        
        if (result.success) {
            setIsActive(status === 1 ? true : false); // Adjusted this line
            const successText = status === 1 ? "This Account has been activated" : "This Account has been deactivated";
            const failureText = status === 1 ? "This account cannot be activated" : "This account cannot be deactivated";
            setSuccessText(successText);
            setFailureText(failureText);
            showModal();
        }
    } catch (error) {
        console.log('Error updating trainee status:', error);
    }
};


  const activateTrainee = () => {
      handleManageTrainee(1); 
  };
  
  const deactivateTrainee = () => {
      handleManageTrainee(0); 
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
      <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
        {isActive ? (
          <Button
            name={"Deactivate"}
            onPress={deactivateTrainee}
            buttonPressed={false}
          />
        ) : (
          <Button
            name={"Activate"}
            onPress={activateTrainee}
            buttonPressed={false}
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
    color: ilpex.darkGrey,
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
