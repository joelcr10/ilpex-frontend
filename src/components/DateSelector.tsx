import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ilpex from "../utils/ilpexUI";

type PropsType = {
    startDate : Date | null,
    endDate: Date | null,
    onPress : () => void,
}

const DateSelector = (props : PropsType) => {

    const {startDate, endDate, onPress} = props;
    const [isVisible,setIsVisible] = useState(false);

    const formatDate = (date: Date | null): string => {
        if (!date) 
            return '';
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
    };

    const handleDateClicker = () => {
        setIsVisible(true);
        onPress();
    }

    return(
        <View style = {styles.dateFieldContainer}>
            <Text style = {styles.dateSelectFieldNameLabel}>Start and End Date</Text>
            <TouchableOpacity onPress={handleDateClicker} style={styles.selectDateField} testID="selectDate">
                {startDate === null && endDate === null ? (
                <View style = {styles.beforeDateSelectedContainer}>
                    <View style = {styles.beforeDateCaptionContainer}>
                        <Text style={styles.selectDateLabel}>Select start and end date</Text>
                    </View>
                    <View style = {styles.beforeDateIconContainer}>
                        <Image 
                        source = {require('../../assets/icons/calendar.png')}
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
                        <Text testID="selectedDateText" style = {styles.datesDisplay}>{startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : 'Select start and end date'}</Text>
                    </View>
                    <View style = {styles.afterDateIconContainer}>
                        <Image 
                        source = {require('../../assets/icons/calendar.png')}
                        style = {styles.calendarStyle}
                        />
                    </View>
                </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : 1000,
    },
    selectedDatesContainer : {
        alignSelf : 'center',
        borderWidth : 1,
        marginLeft : '10%',
        marginRight : '10%',
        width : '90%',
        height : 80,
        flexDirection : 'row',
        paddingTop : 7,
        borderRadius : 10,
    }, 
    selectedDatesCaption : {
        fontFamily : ilpex.fontRegular,
        color : ilpex.black,
        fontSize : 14,
        height : 17,
    },
    selectDateField : {
        width : '80%',
        marginLeft : '10%',
        marginRight : '10%'
    },
    dateDataContainer : {
        flexDirection : 'column',
        marginLeft : '5%',
        justifyContent : 'center',
    },
    beforeDateSelectedContainer : {
        alignSelf : 'center',
        borderWidth : 1,
        height : 40,
        flexDirection : 'row',
        paddingTop : 7,
        borderRadius : 10,
        width : '100%'
    },
    beforeDateCaptionContainer : {
        flex : 0.8,
        alignContent : 'flex-start',
    },
    selectDateLabel : {
        fontFamily : ilpex.fontRegular,
        fontSize : 13,
        color : ilpex.darkGrey,
        marginLeft : '5%',
    },
    beforeDateIconContainer : {
        flexDirection : 'row',
        justifyContent : 'flex-end',
        marginRight : '5%',
        flex :  0.2
    },
    afterDateIconContainer : {
        flexDirection : 'row',
        justifyContent : 'flex-end',
        marginRight : '5%',
        flex :  0.2
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
        marginBottom : 10,
        fontSize : 20,
        textAlign : 'center'
    },
    datesDisplay : {
        fontFamily : ilpex.fontMedium,
        color : ilpex.black,
        fontSize : 16,
        flex : 0.8,
        width : '80%',
        alignContent : 'flex-start',
    }
})

export default DateSelector;
