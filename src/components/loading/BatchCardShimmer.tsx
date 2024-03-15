import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import ilpex from '../../utils/ilpexUI';

type BatchCardShimmerProps = {isLoading : boolean}
const BatchCardShimmer = ({isLoading} : BatchCardShimmerProps)=>{
    return (
        <View style={styles.shimmerContainer}>
            <ShimmerPlaceholder style={styles.shimmerBatchName} LinearGradient={LinearGradient}
            visible={!isLoading}/>
            <ShimmerPlaceholder style={styles.shimmerTraineeText} LinearGradient={LinearGradient}
            visible={!isLoading}/>
            <ShimmerPlaceholder style={styles.shimmerDate} LinearGradient={LinearGradient}
            visible={!isLoading}/>
        </View>
    )
}
const styles = StyleSheet.create({
    shimmerContainer :{
        backgroundColor: ilpex.card,
        borderRadius: 20,
        height: '15%',
        width: '90%', 
        paddingBottom:'5%',
        marginBottom: '3%',
        elevation: 5,
        alignSelf: 'center'
    },
    shimmerBatchName:{
        marginTop: '5%',
        marginStart: '6%', 
        marginBottom: '3%',
        height: '25%',
        borderRadius: 7,
        width:'60%',
    },
    shimmerTraineeText:{
        marginBottom: '2%',
        marginStart: '6%', 
        width: '40%', 
        height:'20%',
        borderRadius: 5
    },
    shimmerDate : {
        marginStart: '6%', 
        borderRadius: 5,
        width:'20%'
    },
})


export default BatchCardShimmer;