import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import BackButton from "../../components/BackButton";
import ThreeDots from "../../components/ThreeDots";

const TraineeProfile = () => {
    return(
        <View style = {styles.pageContainer}>
            <BackButton color = 'black'/>
            <ThreeDots color = 'black'/>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white
    }
})
export default TraineeProfile;