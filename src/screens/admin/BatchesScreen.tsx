import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import BatchCard from "../../components/BatchCard";
import { useSelector } from "react-redux";
import ilpex from "../../utils/ilpexUI";
import ThreeDots from "../../components/ThreeDots";

const BatchesScreen = ()=>{
    
    // const token = useSelector((state: any) => state.testReducer.token);
    // console.log('home page',token);
    return(
        <View style={styles.container}>
            <ThreeDots></ThreeDots>
            <Text style = {styles.text}>Batches</Text>
            <View style={styles.box}>
                <BatchDisplay></BatchDisplay>
            </View>
        </View>
    )
};

const BatchDisplay =()=>{
    const details = [
        {    id : '1',
             batchName : 'ILP 2023-24 Batch 1',
             traineeNo : '40',
             date : "13 Sept 2023",
             progress : 30
           },
        {  id : '2',
           batchName : 'ILP 2023-24 Batch 2',
           traineeNo : '50',
           date : "20 Oct 2023",
           progress : 70
         }, 
        {  id : '3',
         batchName : 'ILP 2023-24 Batch 3',
         traineeNo : '50',
         date : "20 Oct 2023",
         progress : 50
       }
    ]
    return (
        <View style = {styles.dataContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={details}
            renderItem={({ item }) => <BatchCard batchName={item.batchName} traineeNo={item.traineeNo} date={item.date} progress={item.progress}/>}
            keyExtractor={item => item.id}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    dataContainer : {
        margin : '10%',
    },
    container :{
        backgroundColor:"#8518FF",
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