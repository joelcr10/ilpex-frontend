import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import BackButton from "../../components/BackButton";
import ThreeDots from "../../components/ThreeDots";
import BarGraph from "../../components/BarChart";

const TraineeProfile = () => {
    return(
        <View style = {styles.pageContainer}>
            <BackButton color = 'black'/>
            <ThreeDots color = 'black'/>
            <BarGraph></BarGraph>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : 'white',
        height : '100%',
    }
})
export default TraineeProfile;