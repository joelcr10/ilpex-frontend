import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import ilpex from "../../utils/ilpexUI";
import React from "react";
import { getHook } from "../../network/getHook/getHook";
import ThreeDots from "../../components/ThreeDots";
import Constants from "../../utils/Constants";
import { getItem } from "../../utils/utils";
import TraineeNameCard from "../../components/TraineeNameCard";
import SearchField from "../../components/SearchField";
import TraineeNameShimmer from "../../components/loading/TraineeNameListShimmer";
import LineGraph from "../../components/LineGraph";
import DocumentPicker from 'react-native-document-picker';
import FileUploadField from "../../components/FileUploadField";



const UserManagementScreen=()=>{

    const [isLoading, setLoading] = useState(true);

    const [traineeList, setTrainees] = useState<any[]>([]);

    //search query
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);

    console.log("................>>>>>",offset);

    const handleSearch = (text:string) => {
        // Filter the data based on the search query
        const filtered = traineeList.filter(item =>
          item.user.user_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
        setSearchQuery(text);
      };


    useEffect(() => {
        const getTrainees = async () => {
          if (!hasMoreData) {
            return;
          }
          try {
            const {responseData, errorMessage} = await getHook(`/api/v2/trainee?offset=${offset}`);
            setLoading(false);
            if (responseData.length === 0) {
                // No more data available
                setHasMoreData(false);
                return;
                    }
            setTrainees((prevData: any) => [...prevData, ...responseData]);
            setFilteredData((prevData: any) => [...prevData, ...responseData]);
            // console.log(responseData)
          } catch (error) {
            console.error('Error:', error);
          }
        };
        getTrainees();
        }, [offset]);


        //pagination function
        const handleLoadMore = () => {
          if (hasMoreData) {
            setOffset((prevOffset) => prevOffset + 20);
          }
        };
    return(
        // <ScrollView>
        <View>
            <View style={{backgroundColor:ilpex.main}}>
                {/* <BackButton color='white'/> */}
                <View style={styles.topbar}>
                   
                    <Text style={styles.headerText}>{`User Management`}</Text>
                </View>
                
                    <View style={styles.container}>
                      <View>
                      </View>
                    
                        <SearchField onChangeText={handleSearch as any} value={searchQuery}/>
                        <Text style={styles.subTitle}>Trainees</Text>
                    {isLoading  &&
                    <TraineeNameShimmer/>
                    }
                    {!isLoading &&
                    
                    <View style={{height:450,paddingBottom:40}}>
                    <FlatList
                        data={filteredData}
                        renderItem={({item})=><TraineeNameCard traineeName={item.user.user_name} user_id={item.user_id} />}
                        keyExtractor={item=>item.trainee_id}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                    />
                    </View>
                    
                    }
                    </View>
                   
                <ThreeDots color='white'/>
            </View>
        </View>
        //  </ScrollView>
    )
}

const styles = StyleSheet.create({
    subTitle:{
        fontFamily:ilpex.fontSemiBold,
        fontSize:20,
        margin:20,
        color:'#000',
    },
    container:{
        backgroundColor:ilpex.white,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    headerText: {
        color:ilpex.white,
        fontSize: 28,
        textAlign:'center',
        fontFamily:ilpex.fontSemiBold,
      },
      topbar:{
        backgroundColor: 'transparent',
        height:184,
        justifyContent: 'center',
        alignItems: 'center',
      }
})

export default UserManagementScreen;