import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import BatchCard from "../../components/BatchCard";
import ilpex from "../../utils/ilpexUI";
import ThreeDots from "../../components/ThreeDots";
import { getHook } from "../../network/getHook/getHook";
import CreateButton from "../../components/CreateButton";
import { useNavigation } from "@react-navigation/native";
import BatchCardShimmer from "../../components/loading/BatchCardShimmer";
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import { batch } from "react-redux";
import AssesmentListCard from "../../components/AssesmentListCard";

const AssesmentListScreen = ()=>{
    const navigation : any= useNavigation();
    const [assesmentList,setAssesmentList] = useState<any>([]);
    let assessList : any = [];
    const [isLoading,setLoading] = useState(false);
    const onPressBatchCard=()=>{
        navigation.navigate("BatchDetails");
    }
    const onPressButton=()=>{
        console.log("Button pressed");
    }
    useEffect(()=>{
        const getBatches = async()=>{
            try{
                
                const { success,statusCode,responseData,errorMessage} = await getHook('/api/v2/assessment?offset:3&sortOrder:-1&sortBy:"assessment_name"');
                console.log(success,statusCode,responseData.assessments[0].assessment_name);
                if(success){
                    if(responseData){
                        setAssesmentList(responseData);
                        assessList = responseData.assessments;
                        console.log("assess list: ",assessList);
                        setLoading(true); 
                        console.log("->>>>>>>>>>");
                        console.log(assesmentList);
                        console.log(assesmentList.assessment_name)
                }
                }

                const tid = await getItem(Constants.TRAINEE_ID);
                console.log("tid: ",tid);
            }
            catch(err){
                console.error('Error', err);
            }
        }
        getBatches();
    },[]);
    return(
        <View style={styles.container}>
            <Text style = {styles.text}>Assesment </Text>
            <View style={styles.box}>
                <View style = {styles.dataContainer}>
                
                    {isLoading? (
                       

                        <FlatList
                            data={assesmentList}
                            renderItem = {({item}) => <AssesmentListCard assessment_name={item.assessment_name} />}
                        />
                        
                        
                    ):(
                    <View>
                       <BatchCardShimmer isLoading></BatchCardShimmer>
                       <BatchCardShimmer isLoading></BatchCardShimmer>
                       <BatchCardShimmer isLoading></BatchCardShimmer>
                    </View>
                    )}
                    <View style={styles.createButton}>
                        <CreateButton onPress={onPressButton}></CreateButton>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container :{
        backgroundColor:ilpex.main,
        height : '100%',
    },
    dataContainer : {
        margin : '5%',
    },
    text:{
        textAlign:'center',
        fontSize:50,
        color: "white",
        marginTop:'17%',
        fontFamily: ilpex.fontSemiBold
    },
    box :{
        backgroundColor:"white",
        height : "100%",
        marginTop: '5%',
        borderTopEndRadius : 30,
        borderTopStartRadius : 30,
    },
    createButton : {
        marginBottom:30,
        marginTop:500,
        marginStart:300,
        position:'absolute'
    },
    shimmerContainer :{
        backgroundColor:ilpex.card,
        borderRadius:20,
        height:105,
        width : 330,
        marginBottom : '5%',
        elevation:5,
        alignSelf:'center'
    },
    shimmerBatchName:{
        marginTop:17,
        marginStart:20,
        marginBottom:15,
        height:20,
        borderRadius:7
    },
    shimmerTraineeText:{
        marginBottom:10,
        marginStart:20,
        width : 130,
        borderRadius:5
    },
    shimmerDate : {
        marginStart:20,
        borderRadius:5
    },
});

export default AssesmentListScreen;