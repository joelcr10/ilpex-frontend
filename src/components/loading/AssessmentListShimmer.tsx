import React, { useState } from "react";
import {StyleSheet,View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";



const AssessmentListShimmer= ()=> {

    return(
        <View>
        <View style={styles.container}>
        <View style={styles.icon}></View>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.nameText}
                    />
        </View>
        
        
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-start',
        borderRadius:20,
        backgroundColor:ilpex.white,
        elevation:5,
        paddingHorizontal: '6%',
        paddingVertical: '2%', 
        marginHorizontal: '10%',
        marginVertical: '2.8%',
    },
    nameText:{
        height:20,
        textAlign:'left',
        borderRadius:5,
        width:'60%',
        marginStart:'6%',
        marginVertical:'4%'
    },
    icon:{
        borderRadius:20,
        backgroundColor:'#D1CFCF',
        height:35,
        width:35,
    }
})

export default AssessmentListShimmer;