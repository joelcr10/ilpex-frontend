import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import ilpex from "../../utils/ilpexUI";

const DayWiseProgressBarShimmer = () => {
    return (
        <View style = {styles.graphsSection}>
				<ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.dayCount}
                    visible={false}
                    />
				<ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.progressBar}
                    visible={false}
                    />
        </View>
    );
}

const styles = StyleSheet.create({

    graphsSection : {
		flexDirection : 'row',
		alignSelf : 'flex-start',
		marginBottom : 10,
	},
    progressBar : {
		marginTop : 8,
		marginLeft : 15,
		height : 16,
		borderRadius : 12,
		color : ilpex.pink
	},
    dayCount : { 
		color : 'black',
		width : 70,
		fontFamily : ilpex.fontRegular,
		fontSize : 20,
	},
});

export default DayWiseProgressBarShimmer;