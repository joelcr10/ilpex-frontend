import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { useRoute } from "@react-navigation/native";
import ilpex from "../../utils/ilpexUI";
import Button from "../../components/Button";
import SmallButton from "../../components/SmallButton";
import IconButton from "../../components/IconButton";
import FileUploadField from "../../components/FileUploadField";
import React from "react";
import { getHook } from "../../network/getHook/getHook";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import BackButton from "../../components/BackButton";
import ThreeDots from "../../components/ThreeDots";
import CourseCardShimmer from "../../components/loading/CourseCardShimmer";
import Constants from "../../utils/Constants";
import { getItem } from "../../utils/utils";



const UserManagementScreen=()=>{


    return(
        <ScrollView>
        <View>
            <View style={{backgroundColor:ilpex.main}}>
                <BackButton color='white'/>
                <View style={styles.topbar}>
                   
                    <Text style={styles.headerText}>{`User Management`}</Text>
                </View>
                    <View style={styles.container}>
                
                </View>
                <ThreeDots color='white'/>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    subTitle:{
        fontFamily:ilpex.fontSemiBold,
        fontSize:20,
        margin:20,
        color:'#000',
    },
    container:{
        backgroundColor:ilpex.white,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    headerText: {
        color:ilpex.white,
        fontSize: 28,
        textAlign:'center',
        fontFamily:ilpex.fontSemiBold,
      },
      topbar:{
        backgroundColor: 'transparent',
        height:184,
        justifyContent: 'center',
        alignItems: 'center',
      }
})

export default UserManagementScreen;