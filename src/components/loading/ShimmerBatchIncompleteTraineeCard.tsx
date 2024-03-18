import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import ilpex from "../../utils/ilpexUI";

const ShimmerBatchIncompleteTraineeCard = () => {
  return (
    <View>
        
    <View style={styles.cardContainer}>
      <View style={styles.dataContainer}>
      <View style={styles.profilePicture}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.circleContainer}
                    visible={false}
                    />
                </View>
                <View style={styles.dataPart}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.traineeName}
                    visible={false}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.batchName}
                    visible={false}
                    />
                </View>


      </View>
      <View aria-label="Accordion Container">
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.accordion}
          visible={false}
        />
      </View>
    </View>


    <View style={styles.cardContainer}>
      <View style={styles.dataContainer}>
      <View style={styles.profilePicture}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.circleContainer}
                    visible={false}
                    />
                </View>
                <View style={styles.dataPart}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.traineeName}
                    visible={false}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.batchName}
                    visible={false}
                    />
                </View>


      </View>
      <View aria-label="Accordion Container">
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.accordion}
          visible={false}
        />
      </View>
    </View>



    <View style={styles.cardContainer}>
      <View style={styles.dataContainer}>
      <View style={styles.profilePicture}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.circleContainer}
                    visible={false}
                    />
                </View>
                <View style={styles.dataPart}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.traineeName}
                    visible={false}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.batchName}
                    visible={false}
                    />
                </View>


      </View>
      <View aria-label="Accordion Container">
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.accordion}
          visible={false}
        />
      </View>
    </View>



    <View style={styles.cardContainer}>
      <View style={styles.dataContainer}>
      <View style={styles.profilePicture}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.circleContainer}
                    visible={false}
                    />
                </View>
                <View style={styles.dataPart}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.traineeName}
                    visible={false}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.batchName}
                    visible={false}
                    />
                </View>


      </View>
      <View aria-label="Accordion Container">
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.accordion}
          visible={false}
        />
      </View>
    </View>



    <View style={styles.cardContainer}>
      <View style={styles.dataContainer}>
      <View style={styles.profilePicture}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.circleContainer}
                    visible={false}
                    />
                </View>
                <View style={styles.dataPart}>
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.traineeName}
                    visible={false}
                    />
                    <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.batchName}
                    visible={false}
                    />
                </View>


      </View>
      <View aria-label="Accordion Container">
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.accordion}
          visible={false}
        />
      </View>
    </View>




    </View>
  );
};

const styles = StyleSheet.create({
    dataPart : {
        flex : 0.8,
        paddingLeft : '12%',
        paddingRight : '7%',
        paddingTop : '6%',
    },
    profilePicture : {
        flex : 0.2
    },
    cardContainer : {
        justifyContent : 'center',
        backgroundColor : '#FAFAFA',
        minHeight : 150,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        elevation : 4,
        shadowColor : 'black',
        marginBottom : 25,
        flexDirection : 'column',  
        marginLeft : '5%',
        marginRight : '5%'
    },
    courseStatusContainer : {
        marginLeft : '5%',
        marginTop : '5%',
        flexDirection : 'row'
    },
    dataContainer : {
        flexDirection : 'row',
        paddingBottom : 10,
    },
    batchName : {
        fontSize : 15,
        paddingBottom : 2,
        fontFamily : ilpex.fontMedium,
    },
    traineeName : {
        fontFamily : ilpex.fontMedium,
        fontSize : 18,
        paddingBottom : 5,
        marginTop : '-7%'
    },
    circleContainer : {
        height : 50,
        width : 50,
        borderRadius : 25,
        marginLeft : '32%',
        justifyContent : 'center',
        marginTop : '15%'
    },
    imageLogo : {
        width : '66%',
        height : '66%',
        alignSelf : 'center',
    },
    accordionText:{
        paddingTop : '4%',
        paddingLeft:'15%',
        fontFamily : ilpex.fontMedium,
        fontSize : 15,
        color : 'black',
      },
    accordion:{
        marginTop:'5%',
        width:'90%',
        paddingLeft:'15%',

        
        },
    dividerLine : {
        borderWidth : 0.5, 
        width : '90%',
        borderColor : '#C9C9C9',
        alignSelf : 'center'
    },
    accordionView:{
            paddingBottom : 30,
            marginLeft : '3%',
            marginRight : '3%',
            paddingLeft : '8%',
            paddingRight : '8%',
    },
    accordionTitle:{
        fontFamily : ilpex.fontRegular,
        fontSize: 17,
    },
    coursesLeftCaption : {
        color : ilpex.black,
        fontSize : 18,
        fontFamily : ilpex.fontRegular
    },
    currentDayCaption : {
        color : ilpex.black,
        fontSize : 18,
        fontFamily : ilpex.fontRegular
    },
    coursesLeftValue : {
        color : ilpex.main,
        fontFamily : ilpex.fontMedium,
        fontSize : 18
    },
    accordionViewHeading : {
        fontFamily : ilpex.fontSemiBold,
        color : ilpex.black,
        fontSize : 18,
    }
})

export default ShimmerBatchIncompleteTraineeCard;
