import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import ilpex from "../../../utils/ilpexUI";
import { getHook } from "../../../network/getHook/getHook";
import { getItem } from "../../../utils/utils";
import Constants from "../../../utils/Constants";
import DropdownComponent from "../../../components/DropDown";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import CalenderModal from "../../../components/CalenderModal";
import DateSelector from "../../../components/DateSelector";
import { createAssessmentAPI } from "./createAssessmentHook";
import BackButton from "../../../components/BackButton";
import DocumentPicker from 'react-native-document-picker';
import FileUploadField from "../../../components/FileUploadField";
import DisabledBigButton from "../../../components/DisabledBigButton";
import ToastDemo from "../../../components/ToastComponent";
import ConfirmationModal from "../../../components/ConfirmationModal";

const CreateAssessmentScreen = ()=>{
    const [assessmentName,setAssessementName] = useState('');
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [isVisible,setIsVisible] = useState(false);
    const [allBatchesName,setBatchesName] = useState<any>([]);
    const [allBatches,setAllBatches] = useState<any>([]);
    const [selectedBatch,setBatch] = useState('');
    const [missingAssessmentName,setMissingAssessmentName] = useState('');
    const [missingBatchName,setMissingBatchName] = useState('');
    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [success, setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);
    const [errorText, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const handleOpen=()=>{
        setIsVisible(true);
    }
    const handleClose=()=>{
        setIsVisible(false);
    }
    const handleInputs=()=>{
        handleAssessmentName();
        handleBatchName();
    }
    const handleAssessmentName=()=>{
        if(assessmentName==''){
            setMissingAssessmentName("You need to enter the Assessment Name");
        }
    }
    const handleBatchName=()=>{
        if(selectedBatch==''){
            setMissingBatchName("You need to select the batch name");
        }
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


    const today = new Date();
    useEffect(()=>{
        const getBatches = async()=>{
            try{
                const { success,statusCode,responseData,errorMessage} = await getHook('/api/v2/batch');
                console.log(success,statusCode);
                if(success){
                    if(responseData){
                        setAllBatches(responseData.batches)
                        console.log("allBatches",allBatches)
                        setBatchesName(responseData.batches.map((batch: { batch_id: number; batch_name: string; }) => ({
                            label: batch.batch_name,
                            value: batch.batch_name 
                          }))); 
                        console.log('allBatches',allBatchesName);
                    }
                    else
                    {
                        setFailure(true);
                    }
                }
                const tid = await getItem(Constants.TRAINEE_ID);
                console.log("tid: ",tid);
                const uid = await getItem(Constants.USER_ID);
                console.log("uid:" ,uid);
            }
            catch(err){
                console.error('Error', err);
            }
        }
        getBatches();
    },[]);
    const getBatchId = (selectedBatch : string) => {
        for (const batch of allBatches) {
            if (batch.batch_name === selectedBatch) {
              return batch.batch_id;
            }
          }
    }
    const getBatchStartDate = (selectedBatch : string) => {
        for (const batch of allBatches) {
            if (batch.batch_name === selectedBatch) {
                const batch_startDate = new Date(batch.start_date);
                if(batch_startDate!=null){
                    if(batch_startDate>today){
                        return batch_startDate;
                  }
                  else{
                    return today;
                  }
                }
            }
            else{
                return today;
            }
          }
    }
    const getBatchEndDate = (selectedBatch : string) => {
        for (const batch of allBatches) {
            if (batch.batch_name === selectedBatch) {
              return batch.end_date;
            }
          }
    }

    const batch_id = getBatchId(selectedBatch);
    const start_date = getBatchStartDate(selectedBatch);
    const end_date = getBatchEndDate(selectedBatch);
    const createAssessment=async ()=>{
        try{
            setIsLoading(true);
            const user_id = await getItem(Constants.USER_ID);
            console.log('user_id', user_id)
            const formData = new FormData();
            formData.append('user_id', user_id?.toString());
            formData.append('batch_id', batch_id.toString());
            formData.append('assessment_name', assessmentName);
            formData.append('start_date', startDate.toISOString());
            formData.append('end_date', endDate.toISOString());
            formData.append('file', selectedFile);
        handleInputs();
        if(missingAssessmentName==''){
        console.log("Form Data is-------> ", formData);
        const {success, responseData, statusCode,errorMessage} = await createAssessmentAPI(formData);
        if(success){
            console.log(responseData);
            setBatch('');
            setAssessementName('');
            setStartDate(today);
            setEndDate(today);
            setSelectedFile(null);
            setIsLoading(false);
            setSuccess(true);
        }
        else{
            console.log(errorMessage);
            setError(errorMessage);
            console.log(errorText);
            setFailure(true);
            setIsLoading(false);
            setBatch('');
            setAssessementName('');
            setStartDate(today);
            setEndDate(today);
            setSelectedFile(null);
        }
        }
        }
        catch(err){
            console.log("Error",err);
        }
    }
 return (
    <View style={styles.container}>
        <BackButton color={"white"}></BackButton>
        <Text style={styles.text}>Create Assessment</Text>
        <View style={styles.box}>
            <View style={styles.dataContainer}>
                <View style={{
                        margin:'3%'
                    }}>
                    <InputField label={"Assessment name"} isPassword={false} value={assessmentName} onChangeText={setAssessementName} ></InputField>
                    {missingAssessmentName!=='' ? <Text style={styles.errorText}>{missingAssessmentName}</Text> : null}
                    <DropdownComponent placeholder="Select Batch" data={allBatchesName} setBatch={setBatch}></DropdownComponent>
                    {missingBatchName!=='' ? <Text style={styles.errorText}>{missingBatchName}</Text> : null}
                </View>
                <View style= {styles.dateSelector}>
                    <DateSelector startDate={startDate} endDate={endDate} onPress={handleOpen}></DateSelector>
                </View>
                <CalenderModal minDate={start_date} maxDate={end_date} isVisible={isVisible}  setStartDate={setStartDate} setEndDate={setEndDate} closeModal={handleClose}></CalenderModal>
                <View style = {styles.fileUploadContainer}>
                    <FileUploadField onSelect={pickDocument} selectedFile={selectedFile}/>
                    {(assessmentName === '' || startDate === null || endDate === null || selectedFile === null)? (
                    <DisabledBigButton name="Create Assessment"/>
                    ) : (
                    <View>
                    <Button name="Create Assessment" onPress={createAssessment} buttonPressed={isloading} /> 
                    </View>
                    )
                    }
                </View>
                {success && <ConfirmationModal success={true} message={"Assessment created successfully"}></ConfirmationModal>}
                {failure && <ToastDemo BgColor={ilpex.failure} message={errorText} textColor={ilpex.white}></ToastDemo>}
            </View>
        </View>
    </View>
 )
}


const styles = StyleSheet.create ({
    container : {
        backgroundColor:ilpex.main,
        height : '100%',
    },
    text:{
        textAlign:'center',
        fontSize:30,
        color: "white",
        marginTop:'17%',
        fontFamily: ilpex.fontSemiBold
    },
    box :{
        backgroundColor:"white",
        height : "100%",
        marginTop: '5%',
        borderTopEndRadius : 30,
        borderTopStartRadius : 30,
    },
    dataContainer : {
        margin : '0.5%',
    },
    modalContainer : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:22
    },
    modalView : {
        margin : 20,
        backgroundColor:ilpex.white,
        borderRadius : 20,
        width : '90%',
        padding : 25,
        alignItems : 'center',
        shadowColor : ilpex.black,
        shadowOffset:{
            width : 0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius : 4,
        elevation : 5
    },
    startDate : {
        width : 200,
        height:100
    },
    dateSelector : {
        marginTop : '-5%'
    },
    errorText: {
        color: ilpex.failure,
        fontSize: 14,
        marginTop: 5,
        textAlign:'center'
      },   
      fileUploadContainer : {
        paddingTop : 40
    } 
})

export default CreateAssessmentScreen;