import React, { useState } from "react";
import CalenderModal from "./CalenderModal";
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
                <TouchableOpacity onPress={handleDateClicker} style={styles.selectDateField}>
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
                            <Text style = {styles.datesDisplay}>{startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : 'Select start and end date'}</Text>
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
        justifyContent : 'center',
        width : 260,
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
        flex : 0.9,
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
        marginLeft : 15,
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

export default DateSelector;
