import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import TraineeCard from "../../components/TraineeCard";
import TraineeCardShimmer from "../../components/loading/TraineeCardShimmer";
import ilpex from "../../utils/ilpexUI";
import { useSelector } from "react-redux";
import { getHook } from "../../network/getHook/getHook";
import IconButtonComponent from "../../components/IconButton";

const IncompleteTraineesScreen = () => {

    const [isLoading, setLoading] = useState(true);     //To the Page designer, set it to false for proper working
    
    // Replace the below data part with API call
    const TraineesDisplay = () => {
        const trainee_id = useSelector((state: any) => state.userDetailsReducer.trainee_id);
        const [traineeList, setTraineeList] = useState<any[]>([]);
        const [isLoading, setLoading] = useState(false);
      
      
          useEffect(() => {
            const getDayCards= async () => {
              try {
                const {responseData} = await getHook(
                  `/api/v2/batch/1/pending/day/1`,
                );
                if(responseData)
                {
                  setLoading(true);
                }
                setTraineeList(responseData);
                
              
              } catch (error) {
                console.error('Error:', error);
              }
            };
            getDayCards();
          }, []);
          return (
            <ScrollView>
            
                         <FlatList
                         scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={traineeList.IncompleteTraineeList}
                        renderItem={({ item }) => (
                            <TraineeCard
                            traineeName={item.user_name}
                            batchName={item.Batch}
                            />
                        )}
                        keyExtractor={item => item.id}
                        />
           
            
          </ScrollView>
      
        );
      }

    return (
        <ScrollView>
            <View style = {styles.pageContainer}>
                    {/* Below container is the main container for all the cards. Try not to modify. Adjust Margin Top to change the distance between the white part and the purple part. Remove this comment when designing the page.*/}
                    <View style = {styles.innerContainer}>
                    <Text style={styles.incompleteText}>Incomplete</Text>
                    <IconButtonComponent name={"Send"} onPress={function (): void {} } buttonPressed={false} icon={"send"}></IconButtonComponent>          
                    <Text style={styles.traineeText}>Trainees</Text>
                    {!isLoading ? (
                        <TraineeCardShimmer/>
                        ) : (<TraineesDisplay></TraineesDisplay>

                    )}
                    <IconButtonComponent name={"Send"} onPress={function (): void {} } buttonPressed={false} icon={"send"}></IconButtonComponent>          
  
                    </View>
                    
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : '#8518FF',
        height : '100%',
    },
    innerContainer : {
        backgroundColor : 'white',
        height : '100%',
        marginTop : '25%',
        borderTopStartRadius : 50,
        borderTopEndRadius : 50,
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
    traineeText:{
        fontFamily:ilpex.fontRegular,
        color:ilpex.black,
        fontSize:17,

    },
    incompleteText:{
        fontFamily:ilpex.fontSemiBold,
        color:ilpex.black,
        fontSize:27,
        textAlign:'center',
        marginBottom:5,
     

    },
    shimmer:{
        height : 90,
        borderRadius : 17,
        width: 350,
        marginBottom : 25,
        elevation : 4,
    },
})


export default IncompleteTraineesScreen;