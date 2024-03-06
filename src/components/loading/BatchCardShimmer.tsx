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
        backgroundColor:ilpex.card,
        borderRadius:20,
        height:105,
        width : 330,
        marginBottom : '5%',
        elevation:5,
        alignSelf:'center'
    },
    shimmerBatchName:{
        marginTop:17,
        marginStart:20,
        marginBottom:15,
        height:20,
        borderRadius:7
    },
    shimmerTraineeText:{
        marginBottom:10,
        marginStart:20,
        width : 130,
        borderRadius:5
    },
    shimmerDate : {
        marginStart:20,
        borderRadius:5
    },
})

export default BatchCardShimmer;