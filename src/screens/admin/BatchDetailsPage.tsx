import { ScrollView, StyleSheet, Text, View } from "react-native"
import { batchDetails } from "../../network/ApiHook";
import ChartPie from "../../components/PieChartComponent";
import { useEffect, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
const BatchDetailsPage =()=>{
    const [feedList, setStoryList] = useState<any>([]);
    const [batchData,setBatchData] = useState<any>([]);
    const [currentDate,setCurrentDate] = useState<any>([]);
    useEffect(() => {
        
        const getStory = async () => {
          try {
            console.log('effect activated');
            const {responseData, errorMessage} = await getHook('api/v2/batchAvg/1')
            console.log("hi")
            if(responseData)
            {
              console.log("return feedlist",feedList)
              console.log("current date",currentDate)
              setStoryList(responseData);
            }
            if(errorMessage)
              console.log(errorMessage)
            
          } catch (error) {
            console.error('Error:', error);
          }
        };
        getStory();
    }, []);

    useEffect(() => {
      console.log('effect activated');
      const getStory = async () => {
        try {
          const {responseData, errorMessage} = await getHook('api/v3/batch/1/day/2024-03-06')
          console.log(responseData);
          setCurrentDate(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getStory();
  }, []);

    useEffect(() => {
      console.log('effect activated');
      const getStory = async () => {
        try {
          const {responseData, errorMessage} = await getHook('/api/v2/batch/1')
          console.log(responseData);
          setBatchData(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getStory();
  }, []);
return(
        <ScrollView>
        <View style={styles.container1}>
            <View style ={styles.textData}>
            <Text style={styles.text}>Batch</Text>
            </View>
            <View style ={styles.body1}>
              <View>

                <View style ={styles.detail}>
                    <Text style={{fontWeight:'700',color:'black',fontSize:28,marginBottom:20}}>{batchData.batch_details.batch_name}</Text>
                    <View style={{justifyContent:'flex-start'}}>
                    <View style ={styles.eachDetail}>
                    <Text style={{fontWeight:'500',color:'black',fontSize:15}}>Start Date </Text> 
                    <Text style={{marginLeft:30,color:'#8F00FF',fontWeight:'500'}}>{batchData.batch_details.start_date.split('T')[0]}</Text>
                    </View>
                    <View style ={styles.eachDetail}>
                    <Text style={{fontWeight:'500',color:'black',fontSize:15}}>End Date </Text> 
                    <Text style={{marginLeft:30,color:'#8F00FF',fontWeight:'500'}}>{batchData.batch_details.end_date.split('T')[0]}</Text>
                    </View>
                    <View style ={styles.eachDetail}>
                    <Text style={{fontWeight:'500',color:'black',fontSize:15}}>Trainees </Text> 
                    <Text style={{marginLeft:30,color:'#8F00FF',fontWeight:'500'}}>{batchData.noOfTrainees}                   </Text>
                    </View>
                    <View style ={styles.eachDetail}>
                    <Text style={{fontWeight:'500',color:'black',fontSize:15}}>Current Status </Text> 
                    <Text style={{marginLeft:30,color:'#8F00FF',fontWeight:'500'}}>{currentDate.current_day}                   </Text>
                    </View>
                    </View>
                </View>
              <ChartPie  excellent={feedList.excellent} good={feedList.good} poor={feedList.poor}/>
              <ChartPie  excellent={feedList.excellent} good={feedList.good} poor={feedList.poor}/>
                
              </View>
                
            </View>
        
        </View>
        </ScrollView>
    )
    }
const styles = StyleSheet.create({
      container1:{
        height:'100%',
        backgroundColor:'#8518FF'
      },
      body1:{
        height:'100%',
        backgroundColor:'white',
        borderTopEndRadius:50,
        borderTopLeftRadius:50,
        marginTop:30,
        //  justifyContent:'center'
        
    },
      text:{
        fontFamily:'poppins',
        fontWeight:'bold',
        fontSize:45,
        color:'white',
        marginTop:45
    },
    textData:{
        
        alignItems:'center'
    },
    detail: {
      alignItems:'center',
      // borderColor:'black',
       //borderWidth:3,
      marginTop:25,
      marginHorizontal:30,
      borderRadius:30,
      // elevation:8,
      backgroundColor:"white",
      marginBottom : 20
    },
    eachDetail:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      margin:3,
      
  },
})
export default BatchDetailsPage;


