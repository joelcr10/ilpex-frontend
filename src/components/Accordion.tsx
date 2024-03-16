import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Chevron from "./Chevron";

type PropsType = {value : any}
const Accordion = ({value} : PropsType) => {
    // const{value} = props;
    return(
        <View>
            <Text style ={styles.accordion}>{value}</Text>
            <Pressable style = {styles.titleContainer}>
                <Text style = {styles.titleText}>Courses Left To Watch</Text>
                <Chevron />
            </Pressable>
            <View>
                {value.content.map((v : any,i : any) => {
                    return(
                        <View key = {i}>
                            <Text>{v}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    accordion : {
        backgroundColor : 'blue',
        marginHorizontal : 10,
        marginVertical : 10,
        borderRadius : 14,
        borderWidth : 1, 
    },
    titleContainer : {
        padding :20,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    titleText : {
        fontSize :16,
        color : 'black'
    }
})

export default Accordion;