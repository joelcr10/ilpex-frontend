import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import InputField from "../../components/InputField";
import CalenderModal from "../../components/CalenderModal";
import ilpex from "../../utils/ilpexUI";
const CreateBatchScreen = () => {

    const [batchName, setBatchName] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isVisible,setIsVisible] = useState(false);
    
    const today = new Date();
    const januaryFirst = new Date(today.getFullYear(), 0, 1);

    const nextYear = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());
    const datePicker =()=>{
        return (
            <View style={{
                zIndex:1
            }}>
            
            </View>
        )
    }

    const formatDate = (date: Date | null): string => {
        if (!date) 
            return '';
        return date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        });
      };

    const handleClose=()=>{
        setIsVisible(false);
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
            <View style = {styles.dateFieldContainer}>
                <Text style = {styles.dateSelectFieldNameLabel}>Start and End Date</Text>
                <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.selectDateField}>
                    {startDate === null && endDate === null ? (
                    <View style = {styles.beforeDateSelectedContainer}>
                        <View style = {styles.beforeDateCaptionContainer}>
                            <Text style={styles.selectDateLabel}>Select start and end date</Text>
                        </View>
                        <View style = {styles.beforeDateIconContainer}>
                            <Image 
                            source = {require('../../../assets/icons/calendar.png')}
                            style = {styles.calendarStyle}
                            />
                        </View>
                    </View>
                    ) : (
                    <View style = {styles.selectedDatesContainer}>
                        <View style = {styles.dateDataContainer}>
                            <Text style = {styles.selectedDatesCaption}>
                                Selected Dates
                            </Text>
                            <Text style = {styles.datesDisplay}>{startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : 'Select start and end date'}</Text>
                        </View>
                        <View style = {styles.afterDateIconContainer}>
                            <Image 
                            source = {require('../../../assets/icons/calendar.png')}
                            style = {styles.calendarStyle}
                            />
                        </View>
                    </View>
                    )}
                </TouchableOpacity>
                <CalenderModal minDate={januaryFirst} maxDate={nextYear} isVisible={isVisible} setStartDate={setStartDate} setEndDate={setEndDate} closeModal={handleClose}></CalenderModal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : 1000,
    },
    selectedDatesContainer : {
        borderWidth : 1,
        marginLeft : '10%',
        marginRight : '10%',
        height : 70,
        flexDirection : 'row',
        paddingTop : 7,
        borderRadius : 10,
    }, 
    selectedDatesCaption : {
        fontFamily : ilpex.fontRegular,
        fontSize : 18
    },
    selectDateField : {

    },
    dateDataContainer : {
        flexDirection : 'column',
        marginLeft : '5%',
        justifyContent : 'center'
    },
    beforeDateSelectedContainer : {
        borderWidth : 1,
        marginLeft : '10%',
        marginRight : '10%',
        height : 40,
        flexDirection : 'row',
        justifyContent : 'center',
        paddingTop : 7,
        borderRadius : 10,
    },
    beforeDateCaptionContainer : {
        flex : 0.9
    },
    selectDateLabel : {
        fontFamily : ilpex.fontRegular,
        fontSize : 17
    },
    beforeDateIconContainer : {
        flexDirection : 'row',
        alignContent : 'flex-end'
    },
    afterDateIconContainer : {
        flexDirection : 'row',
        alignContent : 'flex-end',
        // backgroundColor : 'red',
        marginLeft : 70,
        marginTop : 15,
    },
    calendarStyle : {
        height : 25,
        width : 25,
    },
    dateFieldContainer : {
        marginTop : 15,
    },
    dateSelectFieldNameLabel : {
        fontFamily : ilpex.fontMedium,
        marginLeft : 45,
        marginBottom : 10,
        fontSize : 20,
    },
    datesDisplay : {
        fontFamily : ilpex.fontMedium,
        color : ilpex.black,
        fontSize : 16
    }
})

export default CreateBatchScreen;