import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const CreateBatchScreen = () => {

    const [batchName, setBatchName] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [fileUploadStatus, setFileUploadStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonLoaded, setButtonLoaded] = useState(false);
    const today = new Date();
    const januaryFirst = new Date(today.getFullYear(), 0, 1);
    const nextYear = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());

    console.log("hi");
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
            const formData = new FormData();
            formData.append('user_id', user_id?.toString());
            formData.append('batch_name', batchName);
            formData.append('start_date', startDate?.toISOString());
            formData.append('end_date', endDate?.toISOString());
            formData.append('file', selectedFile);

            const {success, statusCode, errorMessage} = await createBatch(formData);
            if(success || !success)
                setButtonLoaded(false);
            console.log("Success - ", success);
            console.log("statusCode - ", statusCode);
            console.log("Error Message - ", errorMessage);
        } catch(error) 
        {
            console.log("Error : ", error);
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
            <View style = {styles.fileUploadContainer}>
                <FileUploadField onSelect={pickDocument} selectedFile={selectedFile}/>
            </View>
            <Button name="Create Batch" onPress={handleFileUpload} buttonPressed={buttonLoaded} />
            {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
            <Text style={{ marginTop: 10 }}>{fileUploadStatus}</Text>
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
    }
})

export default CreateBatchScreen;