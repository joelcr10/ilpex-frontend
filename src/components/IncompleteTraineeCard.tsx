import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import ilpex from "../utils/ilpexUI";

type PropsType = {
    trainee_name : string,
    batch_name : string, 
    courses_left : number,
    total_number_of_courses : number,
    course_list : string[]
}

const IncompleteTraineeCard = (props : PropsType) => {

    const [expandedAccordion, setExpandedAccordion] = useState(true);

    const {trainee_name, batch_name, courses_left, total_number_of_courses, course_list} = props;

    const changeExpand=()=>{
        setExpandedAccordion(!expandedAccordion)
        console.log('entered')
    }

    const colorArray = [
        '#FF6347', '#FF7F50', '#FFA07A', '#FFD700', '#FF69B4', '#FF1493', '#FFC0CB', '#87CEEB', '#4682B4', '#40E0D0', '#00FF7F', '#7FFF00', '#32CD32', '#ADFF2F', '#00FF00', '#6B8E23', '#228B22', '#7CFC00', '#98FB98', '#008000', '#556B2F', '#20B2AA', '#00CED1', '#1E90FF', '#4169E1', '#0000FF', '#000080', '#8A2BE2', '#4B0082', '#800080', '#9932CC', '#9400D3', '#8B008B', '#A52A2A', '#D2691E', '#B22222', '#800000'
      ];
    
    const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
    };
    
    const [circleBackgroundColor, setCircleBackgroundColor] = useState(getRandomColor());
    
    return(
        <View style = {styles.cardContainer}>
            <View style = {styles.dataContainer}>
                <View style = {styles.profilePicture}>
                    <View style = {[styles.circleContainer, {backgroundColor: circleBackgroundColor}]}>
                        <Image 
                        style = {styles.imageLogo}
                        source = {require('../../assets/icons/user.png')}
                        />
                    </View>
                </View>
                <View style = {styles.dataPart}>
                    <Text style = {styles.traineeName} numberOfLines={1}>
                        {trainee_name}
                    </Text>
                    <Text style =  {styles.batchName}>
                        {batch_name}
                    </Text>
                </View>
            </View>
            <View style = {styles.dividerLine}></View>
            <View aria-label="Accordion Container">
                <List.Accordion
                title={
                    <>
                        <Text style = {styles.coursesLeftCaption}>Courses Left</Text>
                        <Text>           </Text>
                        <Text style = {styles.coursesLeftValue}>{courses_left}/{total_number_of_courses}</Text>
                    </>
                }
                expanded={!expandedAccordion}
                onPress={changeExpand}
                style={styles.accordion}
                titleStyle={styles.accordionTitle}
                >
                    <View style={styles.accordionView}>
                    <Text style={styles.accordionViewHeading}>Incomplete Courses</Text>
                        <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={course_list}
                        renderItem={({ item,index }) => (
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.accordionText}>
                            {index + 1} .  {item}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        />
                    </View>
                </List.Accordion>
            </View>
        </View>
    )
}

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
        alignSelf : 'center',
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
        width : '85%',
        marginLeft : '5%',
        marginRight : '5%' 
    },
    dataContainer : {
        flexDirection : 'row',
        paddingBottom : 10,
    },
    batchName : {
        color : '#737373',
        fontSize : 15,
        paddingBottom : 2,
        fontFamily : ilpex.fontMedium,
    },
    traineeName : {
        fontFamily : ilpex.fontMedium,
        fontSize : 18,
        color : 'black',
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
        fontFamily : ilpex.fontMedium,
        fontSize : 15,
        color : 'black',
      },
    accordion:{
        
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
export default IncompleteTraineeCard