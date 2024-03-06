import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import BarGraph from "../BarChart";
import BackButton from "../BackButton";
import ThreeDots from "../ThreeDots";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import ilpex from "../../utils/ilpexUI";
import LinearGradient from "react-native-linear-gradient";

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
                    <View style={styles.statsValue}>
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
                    <View style={styles.statsValue}>
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
                    <View style={styles.statsValue}>
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
                    <View style={styles.statsValue}>
                        <ShimmerPlaceholder 
                        LinearGradient={LinearGradient}
                        style={styles.statsValueLabel} />
                    </View>
                </View>
            </View>
        </View>
      );
};
    

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : '100%',
    },
    profilePictureContainer : {
        height : 150,
        marginTop : 70,
        justifyContent : 'center'
    },
    profilePictureCircle : {
        width : 140,
        height : 140,
        alignSelf : 'center',
        borderRadius : 70
    },
    profileImageStyle : {
        width : 107,
        height : 107,
        marginLeft : 16,
        marginTop : 15,
    },
    nameLabel : {
        alignSelf : 'center',
        fontFamily : ilpex.fontSemiBold,
        color : 'black',
        fontSize : 30,
        height : 20,
        marginBottom : 10
    },
    batchLabel : {
        alignSelf : 'center',
        fontFamily : ilpex.fontSemiBold,
        color : '#737373',
        fontSize : 22,
    }, 
    statsRow : {
        flexDirection : 'row',
        marginBottom : 20
    },
    statsKey : {
        alignSelf : 'flex-start',
        marginLeft : 25,
        width : 280,
    },
    statsValue : {
        width : 80,
    },
    statsContainer : {
        marginTop : 40,
        marginRight : 40
    },
    statsKeyLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 17,
        width : 150,
    },
    statsValueLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 17,
        alignSelf : 'center',
        width : 150,
        marginRight : 60,
    }, 
    percentageLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 20,
        alignSelf : 'center'
    },
    remarksLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 17,
        alignSelf : 'center',
        height : 56
    },
    colorDot : {
        width : 13,
        height : 13,
        marginTop : 6,
        marginRight : 10,
        borderRadius : 6.5,
        backgroundColor : 'lime',
    },
    percentageAndColorContainer : {
        flexDirection : 'row'
    }
})

export default TraineeProfileShimmer;