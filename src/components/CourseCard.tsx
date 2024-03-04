import { StyleSheet, Text, View } from "react-native"
import React from 'react';
import CircularProgress from "./CircularProgressBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import ilpex from "../utils/ilpexUI";


type cardProps={name:string,duration:string,status:boolean}

const CourseCard=({name,duration,status}:cardProps)=>{

    return(
        <View style={styles.card}>
            <View>
                <Text style={styles.day}>{name}</Text>
            </View>
            <View style={styles.container}>
            <Text style={styles.duration}>{duration}</Text>
                {status&&
                <View style={{flexDirection:'row', marginTop:'auto', padding:10}}>
                    <Icon name='done' style={[styles.icon,styles.done]}/>
                    <Text style={[styles.status,styles.done]}>completed</Text>
                </View>
                }
                {!status&&
                <View style={{flexDirection:'row', marginTop:'auto', padding:10}}>
                    <Icon name='close' style={[styles.icon,styles.pending]}/>
                    <Text style={[styles.status,styles.pending]}>incomplete</Text>
                </View>
                }
           
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({

    card:{
            // flexDirection:'row',
            justifyContent:'space-between',
            backgroundColor:ilpex.white,
            borderRadius: 10,
            marginHorizontal:30,
            marginVertical:10,
            paddingHorizontal:20,
            paddingVertical:10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 2,
    },
    day:{
        fontSize:22,
        fontWeight:'500',
        color:"black",
        marginHorizontal:10,
        marginVertical:5,
    },
    duration:{
        fontSize:14,
        color:ilpex.darkGrey,
        fontWeight:'500',
        marginHorizontal:10,
        marginVertical:5,
    },
    status:{
        textAlignVertical:'center',
    },
    icon:{
        fontSize:28,
        marginHorizontal:20,
        textAlignVertical:'center',
    },
    done:{
        color:ilpex.success,
    },
    pending:{
        color:ilpex.warning,
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})

export default CourseCard;