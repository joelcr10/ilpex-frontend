import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import BatchCard from "../../../components/BatchCard";
import ilpex from "../../../utils/ilpexUI";
import ThreeDots from "../../../components/ThreeDots";
import { getHook } from "../../../network/getHook/getHook";
import CreateButton from "../../../components/CreateButton";

const onPress=()=>{
    console.log("Button Pressed")
}

const BatchesScreen = ()=>{
    
    const [allBatchesList,setBatchesList] = useState<any>([]);
    useEffect(()=>{
        const getBatches = async()=>{
            try{
                const { success,statusCode,responseData,errorMessage} = await getHook('/api/v2/batch');
                console.log(success,statusCode);
                if(success){
                    if(responseData){
                    setBatchesList(responseData);
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
                    contentContainerStyle = {{
                        padding : 20
                    }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        data={allBatchesList.batches}
                        renderItem={({ item }) => <BatchCard batchName={item.batch_name} traineeNo={item.noOfTrainees} date={item.start_date} progress={parseInt(item.progress)}/>}
                        keyExtractor={item => item.id}
                    />
                    <View style={styles.createButton}>
                        <CreateButton onPress={onPress}></CreateButton>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    dataContainer : {
        margin : '5%',
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
    },
    createButton : {
        margin:30,
        marginTop:100,
        marginStart:295
    }
});

export default BatchesScreen;