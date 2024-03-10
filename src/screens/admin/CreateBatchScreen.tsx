import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import InputField from "../../components/InputField";
import CalenderModal from "../../components/CalenderModal";
import ilpex from "../../utils/ilpexUI";
import DateSelector from "../../components/DateSelector";

const CreateBatchScreen = () => {

    const [batchName, setBatchName] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const today = new Date();
    const januaryFirst = new Date(today.getFullYear(), 0, 1);
    const nextYear = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());

    const handleClose=()=>{
        setModalIsVisible(false);
    }

    const handleDateSelector = () => {
        setModalIsVisible(!modalIsVisible);
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