import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CalendarPicker from "react-native-calendar-picker"
import ilpex from "../utils/ilpexUI";

type CalenderModalProps = {
    minDate : Date,
    maxDate : Date,
    isVisible : boolean,
    setStartDate : (date : Date) =>void,
    setEndDate : (date : Date) =>void,
    closeModal: () => void
}
const CalenderModal = (
    {minDate,
    maxDate,
    isVisible,
    setStartDate,
    setEndDate,
    closeModal} : CalenderModalProps)=>{
    const onDateChange=(date : Date, type : string)=>{
        if(date!=null){
            if (type === "END_DATE") {
                setEndDate(date);
            } else {
              setStartDate(date);
            }
        }
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
                            minDate={minDate}
                            maxDate={maxDate}
                            todayBackgroundColor="#f2e6ff"
                            selectedDayColor={ilpex.main}
                            selectedDayTextColor="#FFFFFF"
                            onDateChange={onDateChange}
                />
            <TouchableOpacity onPress={closeModal}>
                <Text>Select</Text>
            </TouchableOpacity>
            <View>
        </View>
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:22,
        height:500
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
    closeButton : {
        marginTop:50
    }
})

export default CalenderModal;