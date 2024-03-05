import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const TraineeCardShimmer = () => {
    return(
        <>
        <View style = {shimmerStyles.pageContainer}>
            <View style={shimmerStyles.cardContainer}>
                <View style={shimmerStyles.profilePicture}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.circleContainer}
                    visible={false}
                    />
                </View>
                <View style={shimmerStyles.dataPart}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.traineeName}
                    visible={false}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.batchName}
                    visible={false}
                    />
                </View>
            </View>
            <View style={shimmerStyles.cardContainer}>
                <View style={shimmerStyles.profilePicture}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.circleContainer}
                    visible={false}
                    />
                </View>
                <View style={shimmerStyles.dataPart}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.traineeName}
                    visible={false}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.batchName}
                    visible={false}
                    />
                </View>
            </View>
            <View style={shimmerStyles.cardContainer}>
                <View style={shimmerStyles.profilePicture}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.circleContainer}
                    visible={false}
                    />
                </View>
                <View style={shimmerStyles.dataPart}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.traineeName}
                    visible={false}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={shimmerStyles.batchName}
                    visible={false}
                    />
                </View>
            </View>
            </View>
        </>
    );

}

const shimmerStyles = StyleSheet.create({
    pageContainer : {
        height : 800,
        backgroundColor : 'white',
    },
    cardContainer : {
        justifyContent : 'center',
        backgroundColor : '#FAFAFA',
        height : 110,
        paddingTop : 10,
        borderRadius : 20,
        elevation : 4,
        shadowColor : 'black',
        marginBottom : 25,
        flexDirection : 'row',  
        paddingBottom : 10,
    },
    profilePicture : {
        flex : 0.2
    },
    batchName : {
        marginTop : 20,
        color : '#737373',
        fontSize : 18,
        paddingBottom : 2,
        fontFamily : 'Poppins-Medium',
    },
    traineeName : {
        fontFamily : 'Poppins-Medium',
        fontSize : 21,
        color : 'black',
    },
    circleContainer : {
        height : 55,
        width : 55,
        borderRadius : 27.5,
        marginTop : 26,
        marginLeft : 15,
    },
    dataPart : {
        flex : 0.8,
        paddingLeft : '6%',
        paddingTop : '6%',
    },
})

export default TraineeCardShimmer;