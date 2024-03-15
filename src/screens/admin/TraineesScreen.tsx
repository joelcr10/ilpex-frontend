import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import TraineeCard from "../../components/TraineeCard";
import TraineeCardShimmer from "../../components/loading/TraineeCardShimmer";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHook } from "../../network/getHook/getHook";
import DrawerNavigationHamburger from "../../components/DrawerNavigationHamburger";
import { useFocusEffect } from "@react-navigation/native";
import DropdownComponent from "../../components/DropDown";

const TraineeScreen = () => {

    const [isLoading, setLoading] = useState(true);
    const [traineesList, setTraineesList] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTraineesList, setFilteredTraineesList] = useState<any[]>([]);
    const [allBatchesName,setBatchesName] = useState<any>([]);
    const [selectedBatch,setBatch] = useState('');
    const [allBatches,setAllBatches] = useState<any>([]);
    const [batchId,setbatchId] = useState(Number);

    const handleSearch = (text : string) => {
        console.log(text)
        setSearchQuery(text);
        // Filter the data based on the search query
        const filteredTrainees : any = traineesList.filter(item =>
          item.user.user_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredTraineesList(filteredTrainees);
    };

    useFocusEffect(
        React.useCallback(() => {
            const getTraineesList = async() => {
                try {
                    const {responseData, errorMessage} = await getHook(`/api/v2/trainee?batch_id=${batchId}`);
                    if(responseData)
                    {
                        setTraineesList(responseData);
                        setFilteredTraineesList(responseData);
                    }
                }
                catch(error) {
                    console.log('Error', error);
                }
            };

            getTraineesList();
        }, [batchId])
    )

    //get Batches 


    useEffect(()=>{
        const getBatches = async()=>{
            try{
                const { success,statusCode,responseData,errorMessage} = await getHook('/api/v2/batch');
                console.log(success,statusCode);
                if(success){
                    if(responseData){
                        setAllBatches(responseData.batches)
                        setBatchesName(
                            [{label:'All Batches',
                            value:'All'}]); 
                        setBatchesName(prevBatches => [
                            ...prevBatches,
                            ...responseData.batches.map((batch: { batch_id: number; batch_name: string; }) => ({
                                label: batch.batch_name,
                                value: batch.batch_name
                            }))
                        ]);
                    }
                }
            }
            catch(err){
                console.error('Error', err);
            }
        }
        getBatches();
    },[]);


    const getBatchId = (selectedBatch : string) => {
        for (const batch of allBatches) {
            if (batch.batch_name === selectedBatch) {
              return batch.batch_id;
            }
          }
          return 0;
    }

    const batchSelection  = async() => {
        const batch_id= await getBatchId(selectedBatch)
        console.log(batch_id);
        setbatchId(batch_id);
    }
    
    batchSelection();

    return (
        <ScrollView 
        showsVerticalScrollIndicator={false} 
        >
            <View style = {styles.pageContainer}>
                <DrawerNavigationHamburger/>
                <Text style={styles.containerHeading}>Trainees</Text>
                <View style = {styles.innerContainer}>
                    <View style={styles.searchBarContainer}>
                        <TextInput  
                            style={styles.searchBarStyles}
                            placeholder="Search here"
                            onChangeText={handleSearch}
                            value={searchQuery}
                        >
                        </TextInput>
                        <MaterialCommunityIcons name="magnify" size={20}/>
                    </View>
                    <DropdownComponent placeholder="All Batch" data={allBatchesName} setBatch={setBatch}/>

                    {!isLoading ? (
                        <TraineeCardShimmer/>
                    ) : (
                        <View style = {styles.cardContainer}>
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        data={filteredTraineesList}
                        renderItem={({ item }) => (
                            <TraineeCard
                            traineeName={item.user.user_name}
                            batchName={item.batch.batch_name}
                            traineeId = {item.trainee_id}
                            userId = {item.user_id}
                            />
                        )}
                        keyExtractor={item => item.id}
                        />
                        </View>
                    )}            
                </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : '#8518FF',
        minHeight : 850,
        marginBottom : 40,
    },
    innerContainer : {
        backgroundColor : 'white',
        height : '100%',
        marginTop : '5%',
        borderTopEndRadius : 30,
        borderTopStartRadius : 30,
        paddingTop : '10%',
    },

    cardContainer : {
        paddingTop : '7%',
        paddingLeft : '7%',
        paddingRight : '7%',
        
    },
    containerHeading : {
        color : 'white',
        textAlign : 'center',
        fontSize: 35,
        marginTop : '17%',
        fontFamily : 'Poppins-SemiBold',
    },
    shimmer:{
        height : 90,
        borderRadius : 17,
        width: 350,
        marginBottom : 25,
        elevation : 4,
    },
    searchBarContainer:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#E4D8FE',
        borderRadius:10,
        marginTop:'3.5%',
        marginRight : '5%',
        marginBottom:'1%',
        alignItems:'center',
        width:'90%',
        height:50,
        margin : '5%',
        alignSelf : 'center'
     },
     searchBarStyles:{
        marginLeft:15,
        textAlign:'left',
        flex:0.9
     }
})

export default TraineeScreen;