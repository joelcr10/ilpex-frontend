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

const colorArray = [
    '#FF6347', '#FF7F50', '#FFA07A', '#FFD700', '#FF69B4', '#FF1493', '#FFC0CB', '#87CEEB', '#4682B4', '#40E0D0', '#00FF7F', '#7FFF00', '#32CD32', '#ADFF2F', '#00FF00', '#6B8E23', '#228B22', '#7CFC00', '#98FB98', '#008000', '#556B2F', '#20B2AA', '#00CED1', '#1E90FF', '#4169E1', '#0000FF', '#000080', '#8A2BE2', '#4B0082', '#800080', '#9932CC', '#9400D3', '#8B008B', '#A52A2A', '#D2691E', '#B22222', '#800000'
  ];
  
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
  };

const styles = StyleSheet.create({
    dataPart : {
        flex : 0.8,
        paddingLeft : '8%',
        paddingRight : '7%',
        paddingTop : '4%',
    },
    profilePicture : {
        flex : 0.2
    },
    cardContainer : {
        justifyContent : 'center',
        backgroundColor : '#FAFAFA',
        height : 70,
        borderRadius : 20,
        elevation : 4,
        shadowColor : 'black',
        marginBottom : 18,
        flexDirection : 'row',  
        paddingBottom : 10,
    },
    batchName : {
        color : '#737373',
        fontSize : 14,
        paddingBottom : 2,
        fontFamily : ilpex.fontMedium,
    },
    traineeName : {
        fontFamily : ilpex.fontMedium,
        fontSize : 17,
        color : 'black',
        // backgroundColor : 'red',
        marginTop : '-2%'
    },
    circleContainer : {
        height : 48,
        width : 48,
        borderRadius : 24,
        marginLeft : '32%',
        justifyContent : 'center',
        marginTop : '17%'
    },
    imageLogo : {
        width : '60%',
        height : '60%',
        alignSelf : 'center',
    },
})

export default TraineeCard;