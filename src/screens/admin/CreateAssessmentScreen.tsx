import React, { useEffect, useState } from "react";
import { Modal, Pressable, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import BatchCard from "../../components/BatchCard";
import ilpex from "../../utils/ilpexUI";
import ThreeDots from "../../components/ThreeDots";
import { getHook } from "../../network/getHook/getHook";
import CreateButton from "../../components/CreateButton";
import { useNavigation } from "@react-navigation/native";
import BatchCardShimmer from "../../components/loading/BatchCardShimmer";
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import { batch } from "react-redux";
import DropdownComponent from "../../components/DropDown";
import InputField from "../../components/InputField";
import CalendarPicker from "react-native-calendar-picker";
import DateTimePicker from 'react-datetime-picker';
import DatePicker from 'react-native-modern-datepicker';
import {getToday,getFormatedDate} from 'react-native-modern-datepicker';
import Button from "../../components/Button";
import CalenderModal from "../../components/CalenderModal";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

const today : Date = new Date();



const CreateAssessment = ()=>{
    const [assessmentName,setAssessementName] = useState('');
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [isVisible,setIsVisible] = useState(false);
    const [allBatchesName,setBatchesName] = useState<any>([]);
    const [allBatches,setAllBatches] = useState<any>([]);
    const [batch,setBatch] = useState('');
    const handleOpen=()=>{
        setIsVisible(true);
    }
    const handleClose=()=>{
        setIsVisible(false);
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
                        setBatchesName(responseData.batches.map((batch: { batch_id: string; batch_name: string; }) => ({
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
            }
            catch(err){
                console.error('Error', err);
            }
        }
        getBatches();
    },[]);
 return (
    <View style={styles.container}>
            <Text style={styles.text}>Create Assessment</Text>
            <View style={styles.box}>
                <View style={styles.dataContainer}>
                    <InputField label={"Assessment name"} isPassword={false} value={assessmentName} onChangeText={setAssessementName} ></InputField>
                     <DropdownComponent data={allBatchesName} setBatch={setBatch}></DropdownComponent>
                     <Text>{batch}</Text>
            <Button name={"Start Date"} onPress={handleOpen} buttonPressed={false}>
            </Button>
            <CalenderModal minDate={today} maxDate={nextYear} isVisible={isVisible}  setStartDate={setStartDate} setEndDate={setEndDate} closeModal={handleClose}></CalenderModal>
         <Text>{startDate ? `Selected start Dates: ${startDate.toDateString()}` : 'Select Start Date'}</Text>
         <Text>{endDate ? `Selected end Dates: ${endDate.toDateString()}` : 'Select Start Date'}</Text>
                </View>
            </View>
    </View>
 )
}

export default CreateAssessment;

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
        margin : '5%',
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
    }
})