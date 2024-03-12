import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import TraineeCard from "../../components/TraineeCard";
import TraineeCardShimmer from "../../components/loading/TraineeCardShimmer";
import ThreeDots from "../../components/ThreeDots";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHook } from "../../network/getHook/getHook";

const TraineeScreen = () => {

    const [isLoading, setLoading] = useState(true);
    const [traineesList, setTraineesList] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTraineesList, setFilteredTraineesList] = useState<any[]>([]);

    const handleSearch = (text : string) => {
        console.log(text)
        setSearchQuery(text);
        // Filter the data based on the search query
        const filteredTrainees : any = traineesList.filter(item =>
          item.user.user_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredTraineesList(filteredTrainees);
    };

    useEffect (() => {
        const getTraineesList = async() => {
            try {
                const {responseData, errorMessage} = await getHook(`/api/v2/trainee`);
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
    }, []);

    return (
        <ScrollView>
            <View style = {styles.pageContainer}>
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
                    {!isLoading ? (
                        <TraineeCardShimmer/>
                    ) : (
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
        marginTop : '2.5%',
        borderTopEndRadius : 30,
        borderTopStartRadius : 30,
        paddingTop : '10%',
        paddingLeft : '10%',
        paddingRight : '10%',
    },
    containerHeading : {
        color : 'white',
        textAlign : 'center',
        fontSize : 50,
        marginTop : 80,
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
        marginTop:25,
        marginBottom:25,
        alignItems:'center',
        width:330,
        height:50,
     },
     searchBarStyles:{
        marginLeft:15,
        textAlign:'left',
        flex:0.9
     }
})


export default TraineeScreen;