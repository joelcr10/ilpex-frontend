import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import ilpex from "../../utils/ilpexUI";
import React from "react";
import { getHook } from "../../network/getHook/getHook";
import ThreeDots from "../../components/ThreeDots";
import TraineeNameCard from "../../components/TraineeNameCard";
import SearchField from "../../components/SearchField";
import TraineeNameCardShimmer from "../../components/loading/TraineeNameListShimmer";
import TraineeNameShimmer from "../../components/loading/TraineeNameListShimmer";




const UserManagementScreen=()=>{

    const [isLoading, setLoading] = useState(true);
    const [traineeList, setTrainees] = useState<any[]>([]);

    //search query
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);


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

          try {
            const {responseData, errorMessage} = await getHook(`/api/v2/trainee`);
            setLoading(false);
            setTrainees(responseData);
            setFilteredData(responseData);

          } catch (error) {
            console.error('Error:', error);
          }
        };
        getTrainees();
        },[]);

    return(
        // <ScrollView>
        <View>
            <View style={{backgroundColor:ilpex.main}}>
                {/* <BackButton color='white'/> */}
                <View style={styles.topbar}>
                   
                    <Text style={styles.headerText}>{`User Management`}</Text>
                </View>

                    <View style={styles.container}>
                    
                        <SearchField onChangeText={handleSearch as any} value={searchQuery}/>
                        <Text style={styles.subTitle}>Trainees</Text>
                    {isLoading  &&
                      <TraineeNameShimmer/>
                    }
                    {!isLoading &&
                    
                    <View style={{height:'63%'}}>
                    <FlatList
                        data={filteredData}
                        renderItem={({item})=><TraineeNameCard traineeName={item.user.user_name} user_id={item.user_id} />}
                        keyExtractor={item=>item.trainee_id}
                        showsVerticalScrollIndicator={false}
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
        margin:'5%',
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
        height:'21%',
        justifyContent: 'center',
        alignItems: 'center',
      }
})

export default UserManagementScreen;