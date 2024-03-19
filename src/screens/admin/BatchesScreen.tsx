import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import BatchCard from "../../components/BatchCard";
import ilpex from "../../utils/ilpexUI";
import { getHook } from "../../network/getHook/getHook";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BatchCardShimmer from "../../components/loading/BatchCardShimmer";
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import { ScrollView } from "react-native-gesture-handler";
import DrawerNavigationHamburger from "../../components/DrawerNavigationHamburger";
const BatchesScreen = ()=>{

    const navigation : any = useNavigation();
    const [allBatchesList,setBatchesList] = useState<any>([]);
    const [isLoading,setLoading] = useState(false);
    const [currentDay,setCurrentDay] = useState<any>([]);

    const onPressBatchCard=(batch_id:any)=>{
        navigation.navigate("BatchDetails",{batch_id:batch_id});
    }

    const onPressButton=()=>{
        console.log("Button pressed");
    }
    const today = new Date();
    const newDateTime = new Date(today.getTime() + (5.5 * 60 * 60 * 1000));
    const todayString = newDateTime.toISOString().substring(0, 10);
    useFocusEffect(
        React.useCallback(() => {
            console.log("First Focus Effect")
        const getBatches = async()=>{
            try{
                const { success,statusCode,responseData,errorMessage} = await getHook('/api/v2/batch');
                console.log(success,statusCode);
                if(success){
                    if(responseData){
                        setBatchesList(responseData);
                        setLoading(true); 
                        console.log('allBatchesList',allBatchesList);
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
    },[])
    );
    useFocusEffect(
        React.useCallback(() => {
            const getDay = async () => {
                for (const batch of allBatchesList.batches) {
                    const { responseData, errorMessage, success } = await getHook(`/api/v3/batch/${batch.batch_id}/day/${todayString}`);
                    console.log("Today : -------------------------------------------->>>>>>>>>>>>>>>", todayString);
                    console.log(batch.batch_id);
                    if (success) {
                        if (responseData) {
                            console.log(responseData);
                            setCurrentDay((prevState: any) => ({
                                ...prevState,
                                [batch.batch_id]: responseData.current_day,
                            }));
                        }
                    } else {
                        console.log("failure");
                    }
                }
            };
            if (allBatchesList.batches) {
                getDay();
            }
        }, [allBatchesList])
    );
    return(
        <ScrollView
        showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                <DrawerNavigationHamburger/>
                <Text style = {styles.text}>Batches</Text>
                <View style={styles.box}>
                    <View style = {styles.dataContainer}>
                    
                        {isLoading? (
                            <FlatList
                            contentContainerStyle = {{
                                padding : 20
                            }}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                horizontal={false}
                                data={allBatchesList.batches}
                                renderItem={({ item }) => <BatchCard 
                                    batch_name={item.batch_name} 
                                    traineeNo={item.noOfTrainees}
                                    date={item.end_date} 
                                    totalDays={'22'}
                                    progressDays={currentDay[item.batch_id]} 
                                    onPressFunc={()=>onPressBatchCard(item.batch_id)}/>}
                                keyExtractor={item => item.id}
                            />
                        ):(
                        <View>
                        <BatchCardShimmer isLoading></BatchCardShimmer>
                        <BatchCardShimmer isLoading></BatchCardShimmer>
                        <BatchCardShimmer isLoading></BatchCardShimmer>
                        <BatchCardShimmer isLoading></BatchCardShimmer>
                        <BatchCardShimmer isLoading></BatchCardShimmer>
                        </View>
                        )}
                        {/* <View style={styles.createButton}>
                            <CreateButton onPress={onPressButton}></CreateButton>
                        </View> */}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container :{
        backgroundColor:ilpex.main,
        minHeight : 800,
    },
    dataContainer : {
        margin : '5%',
    },
    textSize: {
        fontSize: 24,
        fontFamily : ilpex.fontSemiBold,
        color : 'black',
      },
    text:{
        textAlign:'center',
        fontSize:35,
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

export default BatchesScreen;