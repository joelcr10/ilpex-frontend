import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import BatchCard from "../../../components/BatchCard";
import { useSelector } from "react-redux";
import ilpex from "../../../utils/ilpexUI";
import ThreeDots from "../../../components/ThreeDots";
import ChartsOverviewDemo from "../../../components/BarChart";
import batchesAPI from "./BatchesScreenAPIHook";

const BatchesScreen = ()=>{
    
    // const token = useSelector((state: any) => state.testReducer.token);
    // console.log('home page',token);
    const [allBatchesList,setBatchesList] = useState<any>([]);
    useEffect(()=>{
        const getBatches = async()=>{
            try{
                const { success,statusCode,contentResp,errorMessage} = await batchesAPI('/api/v2/batch');
                if(contentResp){
                    setBatchesList(contentResp);
                    console.log(contentResp)
                    // batch_name=contentResp.Batch;
                    console.log("->>>>>>>>>>");
                    console.log('allBatchesList',allBatchesList);
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
                {/* <ChartsOverviewDemo></ChartsOverviewDemo> */}
                <View style = {styles.dataContainer}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        data={allBatchesList.batches}
                        renderItem={({ item }) => <BatchCard batchName={item.batch_name} traineeNo={"40"} date={item.start_date} progress={parseInt(item.progress)}/>}
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