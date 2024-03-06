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
            <BarGraph data={[10,20,30,40,50,60,70,80,90]} labels={["A 1","A 2","A 3","A 4","day5","day6","day7","day8","day9"]}></BarGraph>
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