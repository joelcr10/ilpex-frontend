import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import InputField from "../../components/InputField";
import CalenderModal from "../../components/CalenderModal";
import ilpex from "../../utils/ilpexUI";
import DateSelector from "../../components/DateSelector";
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import { createBatch } from "./CreateBatchHook";
import FileUploadField from "../../components/FileUploadField";
import Button from "../../components/Button";
const CreateBatchScreen = () => {

    const [batchName, setBatchName] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [fileUploadStatus, setFileUploadStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileStorage, setFileStorage] = useState<DocumentPickerResponse>();
    const today = new Date();
    const januaryFirst = new Date(today.getFullYear(), 0, 1);
    const nextYear = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());

    const handleClose=()=>{
        setModalIsVisible(false);
    }

    const handleDateSelector = () => {
        setModalIsVisible(!modalIsVisible);
    }

    const handleFileUpload = async() => {
        try 
        {
            const user_id = await getItem(Constants.USER_ID);
            const fileUploadResponse = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
            });
            setLoading(true);
            setFileUploadStatus('Uploading...');
            setFileStorage(fileUploadResponse);
            console.log(fileUploadResponse.uri)
            console.log('user_id', user_id)
            const formData = new FormData();
            formData.append('user_id', user_id?.toString());
            formData.append('batch_name', batchName);
            formData.append('start_date', startDate?.toISOString());
            formData.append('end_date', endDate?.toISOString());
            formData.append('file', fileUploadResponse);

            const {success, statusCode, errorMessage} = await createBatch(formData);
            console.log("Success - ", success);
            console.log("statusCode - ", statusCode);
            console.log("Error Message - ", errorMessage);
        } catch(error) 
        {
            console.log("Error : ", error);
            // console.log(erroressage);
        }
    }

    return(
        <View style = {styles.pageContainer}>
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FileUploadField/>
            <Button name="Create Batch" onPress={handleFileUpload} buttonPressed={false} />
            {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
            <Text style={{ marginTop: 10 }}>{fileUploadStatus}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : 1000,
    }
})

export default CreateBatchScreen;