import { ScrollView, StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import AssessmentCard from "../../components/AssessmentCard";
import React from "react";

const TraineeHomeScreen = () => {
    return ( 
        <ScrollView>
            <View style={styles.homeContainer}>
                <View style={styles.topPart}>
                    <View>
                        <Text style={styles.whiteText}>Welcome back,</Text>
                        <Text style={[styles.whiteText, styles.textSize]}>Elena Maria</Text> 
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.heading}>Assessment</Text>
                    </View>

                    <View>
                        <Text style={styles.heading}>Learning Days</Text>
                    </View>
                </View> 
            </View>
        </ScrollView>
     );
}

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor: ilpex.main,
        flex: 1
    },

    topPart:{
        margin: 30,
        display: 'flex',
        flexDirection: 'row'
    },

    whiteText:{
        color: ilpex.white,
        fontSize: 20,
        fontWeight: 'bold'
    },

    textSize:{
        fontSize: 30,
    },

    contentContainer:{
        height: '100%',
        backgroundColor: ilpex.white,
        borderTopEndRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: 10,
        padding: 20
    },

    heading:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        margin: 10

    }
})
 
export default TraineeHomeScreen;