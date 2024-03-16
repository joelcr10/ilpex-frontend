import { StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import BackButton from "../../../components/BackButton"
import DropdownComponent from "../../../components/DropDown"
import DateSelector from "../../../components/DateSelector"
import CalenderModal from "../../../components/CalenderModal"
import Button from "../../../components/Button"
import ilpex from "../../../utils/ilpexUI"
import { useNavigation, useRoute } from "@react-navigation/native"
import { getHook } from "../../../network/getHook/getHook"
import { getItem } from "../../../utils/utils"
import Constants from "../../../utils/Constants"
import UpdateAssessmentAPIHook from "./UpdateAssessmentAPIHook"
import ConfirmationModal from "../../../components/ConfirmationModal"
import ToastDemo from "../../../components/ToastComponent"
import DisabledBigButton from "../../../components/DisabledBigButton"

const UpdateAssessmentScreen=()=>{
    const navigation = useNavigation();
    const route:any = useRoute();
    const assessment_id = route.params.assessment_id;
    const assessment_name = route.params.assessment_name;
    // const batch_name = route.params.batch_name;
    // const assessment_start_date = route.params.start_date;
    // const assessment_end_date = route.params.end_date;


    const [assessmentName,setAssessementName] = useState('');
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [isVisible,setIsVisible] = useState(false);
    const [allBatches,setAllBatches] = useState<any>([]);
    const [allBatchesName,setAllBatchesName] = useState<any>([]);
    const [selectedBatch,setBatch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const today = new Date();
    const handleOpen=()=>{
        setIsVisible(true);
    }
    const handleClose=()=>{
        setIsVisible(false);
    }
    useEffect(()=>{
        const getBatches = async()=>{
            try{
                setIsLoading(true);
                const { success,statusCode,responseData,errorMessage} = await getHook('/api/v2/batch');
                console.log(success,statusCode);
                if(success){
                    if(responseData){
                        setAllBatches(responseData.batches)
                        console.log("allBatches",allBatches)
                        setAllBatchesName(responseData.batches.map((batch: { batch_id: number; batch_name: string; }) => ({
                            label: batch.batch_name,
                            value: batch.batch_name 
                          })));
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

    const updateAssessment=async()=>{
        try{
            setIsLoading(true);
            const user_id = await getItem(Constants.USER_ID);
            console.log(batch_id,assessment_id,startDate,endDate,user_id);
            const {success,errorMessage,statusCode,responseData} =await UpdateAssessmentAPIHook(batch_id,assessment_id,user_id,startDate,endDate);
            if(success){
                console.log(responseData);
                setSuccess(true);
                setIsLoading(false);
            }
            else{
                console.log(errorMessage);
                setError(errorMessage);
                setFailure(true);
                setIsLoading(false);
            }
        }
    catch(err){
        console.log('Error while updating assessment', err);
    }
}
    return (
        <View style={styles.container}>
            <BackButton color={"white"}></BackButton>
            <Text style={styles.text}>Update Assessment</Text>
            <View style={styles.box}>
                <View style={styles.dataContainer}>
                    <View style={{
                            margin:'3%'
                        }}>
                        <Text style={styles.assessmentName}>{assessment_name}</Text>
                        <DropdownComponent placeholder={'batch_name'} data={allBatchesName} setBatch={setBatch}></DropdownComponent>
                    </View>
                    <View style= {styles.dateSelector}>
                        <DateSelector startDate={startDate} endDate={endDate} onPress={handleOpen}></DateSelector>
                    </View>
                    <CalenderModal minDate={start_date} maxDate={end_date} isVisible={isVisible}  setStartDate={setStartDate} setEndDate={setEndDate} closeModal={handleClose}></CalenderModal>
                    {(startDate === null || endDate === null || selectedBatch === '')? (
                        <View style={styles.button}>
                        <DisabledBigButton name="Save Changes"/>
                        </View>
                            ) : (
                        <View style={styles.button}>
                            <Button name={'Save Changes'} onPress={updateAssessment} buttonPressed={false}></Button>
                        </View>
                        )
                    }
                    {success && <ConfirmationModal success={true} message={"Assessment updated successfully"}></ConfirmationModal>}
                    {failure && <ToastDemo BgColor={ilpex.failure} message={error} textColor={ilpex.white}></ToastDemo>}
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
    assessmentName : {
        marginTop:20,
        marginBottom:40,
        fontFamily:ilpex.fontSemiBold,
        fontSize:30,
        textAlign:'center',
        color : ilpex.black
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
        marginTop : '30%',
        alignSelf : 'center'
    },
    errorText: {
        color: ilpex.failure,
        fontSize: 14,
        marginTop: 5,
        textAlign:'center'
      },    
})

export default UpdateAssessmentScreen;