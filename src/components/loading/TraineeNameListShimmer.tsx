import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import ilpex from "../../utils/ilpexUI";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";



const TraineeNameShimmer = ()=> {

    return(
        <View>
        <View style={styles.container}>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.nameText}
                    />
                    <View style={styles.icon}></View>
        </View>
        <View style={styles.container}>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.nameText}
                    />
                    <View style={styles.icon}></View>
        </View>
        <View style={styles.container}>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.nameText}
                    />
                    <View style={styles.icon}></View>
        </View>
        <View style={styles.container}>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.nameText}
                    />
                    <View style={styles.icon}></View>
        </View>
        <View style={styles.container}>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.nameText}
                    />
                    <View style={styles.icon}></View>
        </View>
        <View style={styles.container}>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.nameText}
                    />
                    <View style={styles.icon}></View>
        </View>
        <View style={styles.container}>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.nameText}
                    />
                    <View style={styles.icon}></View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:10,
        backgroundColor:ilpex.lightGrey,
        paddingHorizontal: '10%',
        paddingVertical: '2%', 
        marginHorizontal: '3%',
        marginVertical: '1.6%',
    },
    nameText:{
        height:20,
        textAlign:'left',
        borderRadius:5,
    },
    icon:{
        borderRadius:20,
        backgroundColor:'#D1CFCF',
        height:40,
        width:40,
    }
})

export default TraineeNameShimmer;