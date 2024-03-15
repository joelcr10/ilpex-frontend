import { StyleSheet, Text, View } from "react-native"
import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import ilpex from "../../utils/ilpexUI";




const CourseCardShimmer=()=>{

    return(
        <View style={styles.card}>
            <View>
            <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.course}
                    />
            </View>
            <View style={styles.container}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.duration}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.status}
                    />
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    card:{
        // flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: ilpex.white,
        borderRadius: 10,
        marginHorizontal: '5%', 
        marginVertical: '2%',
        paddingHorizontal: '6%',
        paddingVertical: '3%', 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
    },
    course:{
      borderRadius:10,
      marginHorizontal:'1%',
      marginVertical:'0.5%',
      height:23,
      width:'100%'
    },
    duration:{
        marginHorizontal:'1%',
        marginVertical:'5%',
        textAlignVertical:'center',
        height:20,
        borderRadius:5,
        width:'25%'
    },
    status:{
      width:'25%',
      height:20,
      marginVertical:'5%',
      borderRadius:5,
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})


export default CourseCardShimmer;