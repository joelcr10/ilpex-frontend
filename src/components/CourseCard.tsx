import { StyleSheet, Text, View } from "react-native"
import React from 'react';
import CircularProgress from "./CircularProgressBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import ilpex from "../utils/ilpexUI";
import SmallButton from "./SmallButton";


type cardProps={name:string,duration:string,status:boolean}

const CourseCard=({name,duration,status}:cardProps)=>{

    return(
        <View style={styles.card}>
            <View>
                <Text style={styles.course} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
            </View>
            <View style={styles.container}>
            <Text style={styles.duration}>{duration}</Text>
                {status&&
                <View style={{flexDirection:'row', marginTop:'auto', padding:10}}>
                    <Icon name='done' style={[styles.icon,styles.done]}/>
                    <Text style={[styles.status,styles.done]}>Completed</Text>
                </View>
                }
                {!status&&
                <View style={{flexDirection:'row', marginTop:'auto', padding:10}}>
                    <Icon name='close' style={[styles.icon,styles.pending]}/>
                    <Text style={[styles.status,styles.pending]}>Incomplete</Text>
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
        fontFamily: ilpex.fontMedium,
        fontSize: 20,
        color: 'black',
        marginHorizontal: '1%', 
        marginVertical: '0.5%', 
    },
    duration:{
        fontSize: 18,
        color: ilpex.darkGrey,
        marginHorizontal: '1%', 
        marginVertical: '0.5%', 
        textAlignVertical: 'center',
    },
    status:{
        textAlignVertical: 'center',
        fontSize: 16,
    },
    icon:{
        fontSize: 20,
        marginHorizontal: '1%', 
        textAlignVertical: 'center',
    },
    done:{
        color: ilpex.success,
    },
    pending:{
        color: ilpex.warning,
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})


export default CourseCard;