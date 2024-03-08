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
import DayPickerModal from "../../components/DayPickerModal";

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
    const [startDate,setStartDate] = useState('');
    const [isVisible,setIsVisible] = useState(false);
    // const newStartDate=(date : Date)=> {
    // if(date!=null)
    //     setStartDate(date.toString());
    // }
    const handleOpen=()=>{
        setIsVisible(true);
    }
    // const handleClose=()=>{
    //     setIsVisible(false);
    // }
    // const handleDate =(date : Date)=>{
    //     setStartDate(date);
    // }
    // const realStartDate = getFormatedDate(today.setStartDate(today.getDate() + 1),'YYYY/MM/DD')
 return (
    <View style={styles.container}>
            <Text style={styles.text}>Create Assessment</Text>
            <View style={styles.box}>
                <View style={styles.dataContainer}>
                    <InputField label={"Assessment name"} isPassword={false} value={assessmentName} onChangeText={setAssessementName} ></InputField>
                     <DropdownComponent data={data}></DropdownComponent>
                     {/* <Pressable onPress={() => datePicker()}>
                     <TextInput placeholder="Date Of Birth"
                                />
                                </Pressable> */}
                                {/* <CalendarPicker
                                width={300}
                                previousComponent
                                allowRangeSelection
              startFromMonday={true}
              minDate={minDate}
              maxDate={maxDate}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor={ilpex.main}
              selectedDayTextColor="#FFFFFF"
              onDateChange={newStartDate}
            /> */}
            <Button name={"Start Date"} onPress={handleOpen} buttonPressed={false}>
            </Button>
            <DayPickerModal isVisible setIsVisible={setIsVisible}></DayPickerModal>
            {/* <Modal 
            animationType="slide"
            transparent={true}
            visible={isVisible}
            >
                <View style={styles.modalContainer}>
                    <View style = {styles.modalView}>
                    <CalendarPicker
                    allowRangeSelection
                                width={300}
              startFromMonday={true}
            //   minDate={minDate}
            //   maxDate={maxDate}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor={ilpex.main}
              selectedDayTextColor={ilpex.white}
              onDateChange={newStartDate}
            />
            <TouchableOpacity onPress={handleClose}>
                <Text>Close</Text>
            </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
         <Text>{startDate ? `Selected Dates: ${startDate.toString()}` : 'Select Start Date'}</Text>
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
    // modalContainer : {
    //     flex : 1,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     marginTop:22
    // },
    // modalView : {
    //     margin : 20,
    //     backgroundColor:ilpex.white,
    //     borderRadius : 20,
    //     width : '90%',
    //     padding : 25,
    //     alignItems : 'center',
    //     shadowColor : ilpex.black,
    //     shadowOffset:{
    //         width : 0,
    //         height:2
    //     },
    //     shadowOpacity:0.25,
    //     shadowRadius : 4,
    //     elevation : 5
    // },
    startDate : {
        width : 200,
        height:100
    }
})