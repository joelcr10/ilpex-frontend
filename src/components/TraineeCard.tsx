import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ilpex from "../utils/ilpexUI";
import { useNavigation } from "@react-navigation/native";

type PropsType = {traineeName : string,  batchName: string, traineeId : number, userId : number};


const TraineeCard = (props : PropsType) => {
    
    const navigation = useNavigation();
    const{traineeName, batchName, traineeId, userId} = props;
    const [circleBackgroundColor, setCircleBackgroundColor] = useState(getRandomColor());
    
    const handleProfileViewer = () => {
        navigation.navigate('TraineeProileAnalysisScreen', {trainee_id : traineeId, user_id : userId});
    }
    return(
        <TouchableOpacity onPress ={ () => {handleProfileViewer()}}>
            <View style = {styles.cardContainer}>
                <View style = {styles.profilePicture}>
                    <View style = {[styles.circleContainer, {backgroundColor: circleBackgroundColor}]}>
                        <Image 
                        style = {styles.imageLogo}
                        source = {require('../../assets/icons/user.png')}
                        />
                    </View>
                </View>
                <View style = {styles.dataPart}>
                    <Text style = {styles.traineeName} numberOfLines={1}>
                        {traineeName}
                    </Text>
                    <Text style =  {styles.batchName}>
                        {batchName}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const getRandomColor = () => {
    const generatedColor =  '#' + Math.floor(Math.random()*16777215).toString(16);
    if(generatedColor === '#bdd8c' || generatedColor === '#6de5b')
        getRandomColor();
    else
    console.log(generatedColor);
    return generatedColor;
}

const styles = StyleSheet.create({
    dataPart : {
        flex : 0.8,
        paddingLeft : '6%',
        paddingTop : '6%',
    },
    profilePicture : {
        flex : 0.2
    },
    cardContainer : {
        justifyContent : 'center',
        backgroundColor : '#FAFAFA',
        height : 100,
        borderRadius : 20,
        elevation : 4,
        shadowColor : 'black',
        marginBottom : 25,
        flexDirection : 'row',  
        paddingBottom : 10,
    },
    batchName : {
        color : '#737373',
        fontSize : 18,
        paddingBottom : 2,
        fontFamily : ilpex.fontMedium,
    },
    traineeName : {
        fontFamily : ilpex.fontMedium,
        fontSize : 21,
        color : 'black',
    },
    circleContainer : {
        height : 55,
        width : 55,
        borderRadius : 27.5,
        marginTop : 26,
        marginLeft : 15,
    },
    imageLogo : {
        width : '88%',
        height : '88%',
        marginLeft : 3,
        marginTop : 3,
    },
})

export default TraineeCard;