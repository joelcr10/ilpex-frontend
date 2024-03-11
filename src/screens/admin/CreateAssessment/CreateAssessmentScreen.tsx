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

async function retrieveUserID() {
    const uid = await getItem(Constants.USER_ID);
    console.log("uid:", uid);
    if(uid!=null){
        return parseInt(uid);
    }
    else{
        return 0;
    }
}
const userId=7;
// const userId = retrieveUserID();
const today : Date = new Date();

const CreateAssessmentScreen = ()=>{
    const [assessmentName,setAssessementName] = useState('');
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [isVisible,setIsVisible] = useState(false);
    const [allBatchesName,setBatchesName] = useState<any>([]);
    const [allBatches,setAllBatches] = useState<any>([]);
    const [selectedBatch,setBatch] = useState('');
    const [missingFieldError,setMissingFieldError] = useState('');
    const handleOpen=()=>{
        setIsVisible(true);
    }
    const handleClose=()=>{
        setIsVisible(false);
    }
    const handleInputs=()=>{
        if(assessmentName==''){
            setMissingFieldError("You need to enter the Assessment Name");
          return;
        }
        if(selectedBatch==''){
            setMissingFieldError("You need to specify the batch");
        }
    }
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
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
                        // setLoading(true); 
                        console.log("->>>>>>>>>>");
                        console.log('allBatches',allBatchesName);
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
                    if(batch_startDate<today){
                        return today;
                  }
                  else{
                    return batch_startDate;
                  }
                }
                else{
                    return today;
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
        handleInputs();
        if(missingFieldError==null){
        console.log(batch_id,assessmentName,userId,startDate,endDate);
        const {success, responseData} = await createAssessmentAPI(batch_id,assessmentName,userId,startDate,endDate);
        if(success){
            console.log(responseData);
        }
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
                    {missingFieldError!=='' ? <Text style={styles.errorText}>{missingFieldError}</Text> : null}
                     <DropdownComponent placeholder="Select Batch" data={allBatchesName} setBatch={setBatch}></DropdownComponent>
                     {/* {missingFieldError!=='' ? <Text style={styles.errorText}>{missingFieldError}</Text> : null} */}
                     </View>
                     <View style= {styles.dateSelector}>
                        <DateSelector startDate={startDate} endDate={endDate} onPress={handleOpen}></DateSelector>
                    </View>
                    <CalenderModal minDate={start_date} maxDate={end_date} isVisible={isVisible}  setStartDate={setStartDate} setEndDate={setEndDate} closeModal={handleClose}></CalenderModal>
                    <View style={styles.button}>
                        <Button name={'Send'} onPress={createAssessment} buttonPressed={false}></Button>
                    </View>
                    <Text></Text>
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
    button : {
        marginTop : '30%'
    },
    errorText: {
        color: ilpex.failure,
        fontSize: 14,
        marginTop: 5,
        textAlign:'center'
      },    
})

export default CreateAssessmentScreen;