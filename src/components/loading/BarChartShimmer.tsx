import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import ilpex from '../../utils/ilpexUI';

type BarChartShimmerProps = {isLoading : boolean}
const BarChartShimmer=({isLoading} : BarChartShimmerProps)=>{
    return (
        <View style={styles.shimmerContainer}>
                <ShimmerPlaceholder style={styles.shimmerChart} LinearGradient={LinearGradient} visible={isLoading}></ShimmerPlaceholder>
        </View>
    )
}

const styles = StyleSheet.create({
    shimmerContainer : {
        height : 300,
        width : 330,
        backgroundColor : ilpex.card,
        elevation:5,
        shadowColor: ilpex.black,
        shadowOffset:{ width: 0, height: 0 },
        alignSelf:'center',
        borderRadius:10,
        marginTop:400
    },
    shimmerChart : {
        margin:20,
        height:260,
        width:290,
        borderRadius:10
    }
})

export default BarChartShimmer;