import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import ilpex from "../utils/ilpexUI";

type DayPickerModalProps = {isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>};

const DayPickerModal=({isVisible,setIsVisible} : DayPickerModalProps)=>{
    const handleNewStartDate=(date : Date)=> {
        // if(date!=null)
        //     setNewStartDate(date.toString());
        // }
    const handleClose=()=>{
        setIsVisible(false);
    }
    return (
        <Modal 
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
          onDateChange={handleNewStartDate}
        />
        <TouchableOpacity onPress={handleClose}>
            <Text>Close</Text>
        </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
}
const styles = StyleSheet.create({
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
})

export default DayPickerModal;