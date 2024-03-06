import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import BatchCard from "../../../components/BatchCard";
import ilpex from "../../../utils/ilpexUI";
import ThreeDots from "../../../components/ThreeDots";
import batchesAPI from "./BatchesScreenAPIHook";

const BatchesScreen = ()=>{
    
    const [allBatchesList,setBatchesList] = useState<any>([]);
    useEffect(()=>{
        const getBatches = async()=>{
            try{
                const { success,statusCode,contentResp,errorMessage} = await batchesAPI('/api/v2/batch');
                console.log(success,statusCode);
                if(success){
                    if(contentResp){
                    setBatchesList(contentResp);
                    console.log("->>>>>>>>>>");
                    console.log('allBatchesList',allBatchesList);
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
            <ThreeDots color='white'></ThreeDots>
            <Text style = {styles.text}>Batches</Text>
            <View style={styles.box}>
                <View style = {styles.dataContainer}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        data={allBatchesList.batches}
                        renderItem={({ item }) => <BatchCard batchName={item.batch_name} traineeNo={item.noOfTrainees} date={item.start_date} progress={parseInt(item.progress)}/>}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    dataContainer : {
        margin : '10%',
    },
    container :{
        backgroundColor:ilpex.main,
        height : '100%',
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
    }
});

export default BatchesScreen;