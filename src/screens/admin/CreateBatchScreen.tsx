import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import InputField from "../../components/InputField";
import CalenderModal from "../../components/CalenderModal";
import ilpex from "../../utils/ilpexUI";
import DateSelector from "../../components/DateSelector";
import DocumentPicker from 'react-native-document-picker';
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import { createBatch } from "./CreateBatchHook";
import FileUploadField from "../../components/FileUploadField";
import Button from "../../components/Button";
import DisabledBigButton from "../../components/DisabledBigButton";
import BackButton from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import ToastDemo from "../../components/ToastComponent";
import ConfirmationModal from "../../components/ConfirmationModal";

const CreateBatchScreen = () => {

    const [batchName, setBatchName] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [buttonLoaded, setButtonLoaded] = useState(false);
    const [failure, setFailure] = useState(false);
    
    const today = new Date();
    const januaryFirst = new Date(today.getFullYear(), 0, 1);
    const nextYear = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());

    const handleClose=()=>{
        setModalIsVisible(false);
    }

    const handleDateSelector = () => {
        setModalIsVisible(!modalIsVisible);
    }

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
            });
            setSelectedFile(result);
            console.log("selectedFile is ", selectedFile);
            } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                console.error('Error picking document', err);
            }
        }
    };

    const handleFileUpload = async() => {
        try 
        {
            setButtonLoaded(true);
            const user_id = await getItem(Constants.USER_ID);
            console.log('user_id', user_id)
            const convertedStartDate = startDate?.toISOString().substring(0, 10);
            const convertedEndDate = endDate?.toISOString().substring(0,10);

            const formData = new FormData();
            formData.append('user_id', user_id?.toString());
            formData.append('batch_name', batchName);
            formData.append('start_date', convertedStartDate);
            formData.append('end_date', convertedEndDate);
            formData.append('file', selectedFile);

            const {success, statusCode, errorMessage} = await createBatch(formData);
            if(success)
            {
                setButtonLoaded(false);
                setSuccess(true);
                console.log("statusCode - ", statusCode);
                console.log("Success - ", success);
                setBatchName('');
                setStartDate(null);
                setEndDate(null);
                setSelectedFile(null);
            }
            else
            {
                setButtonLoaded(false);
                setFailure(true);
                console.log("statusCode - ", statusCode);
                console.log("Error Message - ", errorMessage);
            }
        } catch(error) 
        {
            console.log("Error : ", error);
        }
    }

    

    return(
        <View style = {styles.pageContainer}>
            <BackButton color = "black"/>
            <TopBlackHeading 
                heading={"Create Batch"} 
            />
            <InputField 
                label={"Batch Name"} 
                isPassword={false} 
                value={batchName} 
                onChangeText={setBatchName} 
            />
            <DateSelector startDate = {startDate} endDate = {endDate} onPress = {handleDateSelector}></DateSelector>
            <CalenderModal minDate={januaryFirst} maxDate={nextYear} isVisible={modalIsVisible} setStartDate={setStartDate} setEndDate={setEndDate} closeModal={handleClose}></CalenderModal>
            <View style = {styles.fileUploadContainer}>
                <FileUploadField onSelect={pickDocument} selectedFile={selectedFile}/>
            </View>
            {(batchName === '' || startDate === null || endDate === null || selectedFile === null)? (
                <DisabledBigButton name="Create Batch"/>
            ) : (
                <Button name="Create Batch" onPress={handleFileUpload} buttonPressed={buttonLoaded} />
            )
            }
            {success && <ConfirmationModal success = {success} message = "Batch has been created Successfully!" />}
            {failure && <ToastDemo BgColor="red" message="Failed To create Batch" textColor="white"/>}
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : 1000,
    },
    fileUploadContainer : {
        paddingTop : 40
    },
})

export default CreateBatchScreen;