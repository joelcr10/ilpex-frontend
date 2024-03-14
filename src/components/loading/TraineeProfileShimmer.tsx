import React from "react";
import { StyleSheet, View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import ilpex from "../../utils/ilpexUI";
import LinearGradient from "react-native-linear-gradient";
import BarChartShimmer from "./BarChartShimmer";
const TraineeProfileShimmer = () => {
    return (
        <View style={styles.pageContainer}>
            <View style={styles.profilePictureContainer}>
                <ShimmerPlaceholder 
                LinearGradient={LinearGradient}
                style={styles.profilePictureCircle} />
            </View>
            <View>
                <ShimmerPlaceholder 
                LinearGradient={LinearGradient}
                style={styles.nameLabel} />
                <ShimmerPlaceholder 
                LinearGradient={LinearGradient}
                style={styles.batchLabel} />
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statsRow}>
                    <View style={styles.statsKey}>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsKeyLabel} />
                    </View>
                    <View>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsValueLabel} />
                    </View>
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.statsKey}>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsKeyLabel} />
                    </View>
                    <View>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsValueLabel} />
                    </View>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statsRow}>
                    <View style={styles.statsKey}>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsKeyLabel} />
                    </View>
                    <View>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsValueLabel} />
                    </View>
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.statsKey}>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsKeyLabel} />
                    </View>
                    <View>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsValueLabel} />
                    </View>
                </View>
            </View>
            <BarChartShimmer/>
        </View>
      );
};
    

const styles = StyleSheet.create({
    pageContainer : {
        height : '100%',
        // margin : '5%'
    },
    profilePictureContainer : {
        height : 150,
        marginTop : 40,
        justifyContent : 'center'
    },
    profilePictureCircle : {
        width : 120,
        height : 120,
        alignSelf : 'center',
        borderRadius : 70
    },
    profileImageStyle : {
        width : 107,
        height : 107,
    },
    nameLabel : {
        alignSelf : 'center',
        fontFamily : ilpex.fontSemiBold,
        color : 'black',
        fontSize : 23,
        height : 20,
        marginBottom : '4%'
    },
    batchLabel : {
        alignSelf : 'center',
        fontFamily : ilpex.fontSemiBold,
        color : '#737373',
        fontSize : 18,
    }, 
    statsRow : {
        flexDirection : 'row',
        marginBottom : '5%'
    },
    statsKey : {
        alignSelf : 'flex-start',
        marginLeft : '10%',
        width : 200,
    },
    statsContainer : {
        marginTop : '10%',
        marginRight : '10%'
    },
    statsKeyLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 17,
        width : 110,
    },
    statsValueLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 17,
        alignSelf : 'center',
        width : 110,
        marginRight : '80%'
    }, 
})

export default TraineeProfileShimmer;