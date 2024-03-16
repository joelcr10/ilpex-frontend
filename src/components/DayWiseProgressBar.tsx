import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';

type PropsType = {dayNumber : number, percentage : number,onPress:()=>void}
const  DayWiseProgressBar = (props : PropsType) => {
    const {dayNumber, percentage,onPress} = props;
    let valueToBeLoaded = percentage / 100;
    return (
		<TouchableOpacity onPress={onPress}>
			<View style = {styles.graphsSection}>
				<Text style = {styles.dayCount}>Day {dayNumber}</Text>
				<Progress.Bar color = {'#D155FD'} progress={valueToBeLoaded} width={230} height={(60)} style = {styles.progressBar} unfilledColor='#E4E3E3' borderColor='white'/>
        </View>
		</TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({

    graphsSection : {
		flexDirection : 'row',
		alignSelf : 'flex-start',
		marginBottom : 10,
	},
    dayCount : { 
		color : 'black',
		width : 70,
		fontFamily : 'Poppins-Regular',
		fontSize : 16,
		paddingTop : '2%',
	},
    progressBar : {
		marginTop : 8,
		marginLeft : 15,
		height : 16,
		borderRadius : 12,
		color : '#8518FF'
	}
});

export default DayWiseProgressBar;