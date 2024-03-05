import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import BackButton from "../../components/BackButton";
import ThreeDots from "../../components/ThreeDots";

const TraineeProfile = () => {

    const getRandomColor = () => {
        const generatedColor =  '#' + Math.floor(Math.random()*16777215).toString(16);
    if(generatedColor === '#bdd8c' || generatedColor === '#6de5b')
        getRandomColor();
    else
    console.log(generatedColor);
    return generatedColor;
}

    const [circleBackgroundColor, setCircleBackgroundColor] = useState(getRandomColor());

    return(
        <View style = {styles.pageContainer}>
            <BackButton color = 'black'/>
            <ThreeDots color = 'black'/>
            <View style = {styles.profilePictureContainer}>
                <View style = {[styles.profilePictureCircle, {backgroundColor : circleBackgroundColor}]}>
                    <Image
                        style = {styles.profileImageStyle}
                        source = {require('../../../assets/icons/user.png')}/>
                </View>
            </View>
            <View>
                <Text style = {styles.nameLabel}>
                    Ashik George
                </Text>
                <Text style = {styles.batchLabel}>
                    ILP 2023-24 Batch2
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : '100%',
    },
    profilePictureContainer : {
        height : 150,
        marginTop : 70,
        justifyContent : 'center'
    },
    profilePictureCircle : {
        width : 140,
        height : 140,
        alignSelf : 'center',
        borderRadius : 70
    },
    profileImageStyle : {
        width : 107,
        height : 107,
        marginLeft : 16,
        marginTop : 15,
    },
    nameLabel : {
        textAlign : 'center',
    },
    batchLabel : {
        textAlign : 'center',
    }
})
export default TraineeProfile;