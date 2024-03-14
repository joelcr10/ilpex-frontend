import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import ilpex from "../../utils/ilpexUI";
import { getHook } from "../../network/getHook/getHook";
import { useNavigation } from "@react-navigation/native";
import BatchCardShimmer from "../../components/loading/BatchCardShimmer";
import AssesmentListCard from "../../components/AssesmentListCard";
import DrawerNavigationHamburger from "../../components/DrawerNavigationHamburger";

const AssesmentListScreen = ()=>{
    const navigation : any= useNavigation();
    const [assesmentList,setAssesmentList] = useState<any>([]);

    const [isLoading,setLoading] = useState(false);
   
    const onPressButton=(assessment_id:any,assessment_name:any)=>{
        console.log('hello')
        navigation.navigate("updateAssesments",{assessment_id:assessment_id,assessment_name:assessment_name});
    }

    useEffect(()=>{
        const getBatches = async()=>{
            try{
                
                const { success,statusCode,responseData,errorMessage} = await getHook('/api/v2/assessment');
                if(success){
                    if(responseData){
                        setAssesmentList(responseData.assessments);
                        console.log('this is data',responseData)
                        // assessList = responseData.assessments;
                        setLoading(true); 
                     }
                }
            }
            catch(err){
                console.error('Error', err);
            }
        }
        getBatches();
    },[]);
    return(
        <View style={styles.container}>
            <DrawerNavigationHamburger/>
            <Text style = {styles.text}>Assesments</Text>
            <View style={styles.box}>
                <View style = {styles.dataContainer}>
                
                    {isLoading? (
                       <FlatList
                            showsVerticalScrollIndicator={false}
                            data={assesmentList}
                            renderItem = {({item}) => <AssesmentListCard assessment_name={item.assessment_name} onPressButton={()=>onPressButton(item.assessment_id,item.assessment_name)}/>}
                        />
                    ):(
                    <View>
                       <BatchCardShimmer isLoading></BatchCardShimmer>
                       <BatchCardShimmer isLoading></BatchCardShimmer>
                       <BatchCardShimmer isLoading></BatchCardShimmer>
                    </View>
                    )}

                    <View style={styles.createButton}>
                        {/* <CreateButton onPress={onPressButton}></CreateButton> */}
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container :{
        backgroundColor:ilpex.main,
        minHeight : 800
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