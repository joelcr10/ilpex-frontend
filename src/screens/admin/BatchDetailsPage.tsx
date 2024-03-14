import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { batchDetails } from "../../network/ApiHook";
import ChartPie from "../../components/PieChartComponent";
import { useEffect, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
import ChartPieShimmer from "../../components/PieChartShimmer";
import IconButtonComponent from "../../components/IconButton";
import ChartPieHeaderShimmer from "../../components/pieChartHeaderShimmer";
import ThreeDots from "../../components/ThreeDots";
import BackButton from "../../components/BackButton";
import DayWiseProgressBar from "../../components/DayWiseProgressBar";
import DayWiseProgressBarShimmer from "../../components/loading/DayWiseProgressBarShimmer";
import { useNavigation, useRoute } from "@react-navigation/native";
import DayWiseDetailsPage from "./DayDetailsScreen";
import { List } from 'react-native-paper';
import moment from 'moment'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BatchDetailsPage =()=>{
   const todayDate = moment().format('YYYY-MM-DD');
    const route:any = useRoute();
    const navigation : any = useNavigation();
    const batch_id = route.params.batch_id;
    
    const [isLoading,setLoading] =useState(true);
    const [feedList, setStoryList] = useState<any>([]);
    const [batchData,setBatchData] = useState<any>([]);
    const [currentDate,setCurrentDate] = useState<any>([]);
    const [courseCompletion,setCourseCompletion] = useState<any>([]);
    const [dayWiseProgress,setdayWiseProgress] = useState<any>([]);
    const onPress=(batch_id:number,day_id:number)=>{
      
       navigation.navigate("batchDayWiswDetails",{ batch_id:batch_id, day:day_id});
    }
    useEffect(() => {
      const getStory = async () => {
        try {
          const {responseData, errorMessage} = await getHook(`api/v2/analysis/${batch_id}`)
          if(responseData)
          {
            setCourseCompletion(responseData);
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
        const getStory = async () => {
          try {
            const {responseData, errorMessage} = await getHook(`api/v2/batchAvg/${batch_id}`)
            if(responseData)
            {
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
      const getStory = async () => {
        try {
          const {responseData, errorMessage} = await getHook(`api/v3/batch/${batch_id}/day/${todayDate}`)
          setCurrentDate(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getStory();
  }, []);

    useEffect(() => {
       const getStory = async () => {
        try {
          const {responseData, errorMessage} = await getHook(`/api/v2/batch/${batch_id}`)
           if(responseData){
             setBatchData(responseData);
            setLoading(false);
          }
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
        const {responseData, errorMessage} = await getHook(`/api/v2/batch/${batch_id}/progress`)
        if(responseData){
          console.log('course List',responseData.data.progressData);
          setdayWiseProgress(responseData.data.progressData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getStory();
}, []);
const arrayOfObjects =[];
    for (const key in dayWiseProgress) {
      if (dayWiseProgress.hasOwnProperty(key)) {
        const value = dayWiseProgress[key];
        arrayOfObjects.push({ key, value });
        console.log(value)
        // console.log(`${key}: ${value}`);
      }
    }
const hai =()=>{
  
}
const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
return(
  <GestureHandlerRootView>
        <ScrollView>
        <View style={styles.container1}>
          <BackButton color = 'white'/>
            <View style ={styles.textData}>
            <Text style={styles.text}>Batch</Text>
            </View>
            <View style ={styles.body1}>
              <View>

              {isLoading && <ChartPieHeaderShimmer/>} 
               {!isLoading && <><View style ={styles.detail}>
                    
                    <Text style={{fontWeight:'700',color:'black',fontSize:28,marginBottom:20}}>{batchData.batch_details.batch_name}</Text>
                    <View style={{justifyContent:'flex-start',display:'flex',flexDirection:'row',marginLeft:55}}>
                    <View style={{flex:1}}>
                    <Text style={{fontWeight:'500',color:'black',fontSize:15}}>Start Date </Text> 
                    <Text style={{fontWeight:'500',color:'black',fontSize:15}}>End Date </Text> 
                    <Text style={{fontWeight:'500',color:'black',fontSize:15}}>Trainees </Text> 
                    <Text style={{fontWeight:'500',color:'black',fontSize:15}}>Current Status </Text> 
                    </View>
                    <View style={{flex:1}}>
                    <Text style={{marginLeft:30,color:'#8F00FF',fontWeight:'500'}}>{batchData.batch_details.start_date.split('T')[0]}</Text>
                    <Text style={{marginLeft:30,color:'#8F00FF',fontWeight:'500'}}>{batchData.batch_details.end_date.split('T')[0]}</Text>
                    <Text style={{marginLeft:30,color:'#8F00FF',fontWeight:'500'}}>{batchData.noOfTrainees}</Text>
                    <Text style={{marginLeft:30,color:'#8F00FF',fontWeight:'500'}}>{currentDate.current_day}</Text>
                    </View>
                  </View>
                </View>
                </>}


              
                <List.Accordion
                    title="Trainees"
                    left={props => <List.Icon {...props} icon="folder" />}
                    expanded={expanded}
                    onPress={handlePress}>
                    {/* <List.Item title="First item" />
                    <List.Item title="Second item" /> */}
                    <View style = {styles.graphContainer}>
                  <Text style={{marginRight:255,marginBottom:20,fontSize:25}}>Days</Text>
                  <FlatList 
                    contentContainerStyle = {{paddingBottom : 5}}
                    data = {arrayOfObjects}
                    renderItem = {({item}) => 
                      
                      <DayWiseProgressBar dayNumber = {parseInt(item.key)} percentage = {item.value} onPress={()=>onPress(batch_id,parseInt(item.key))}/>
                    }
                  
                  />
                </View> 
                </List.Accordion>
            







              
                 {/* <View>
                   <IconButtonComponent  name={'Report'} onPress={()=>{}} buttonPressed={false} icon={'description'}/>
                </View> */}
              </View>
              {isLoading&&<><ChartPieShimmer/>
              <ChartPieShimmer/></>}
              {!isLoading&&<>
              <ChartPie chartName={'Assesment Score'} excellent={feedList.excellent} good={feedList.good} poor={feedList.poor} option1="Excellent" option2="Good" option3="Poor" incomplete={hai} />
              
              <ChartPie chartName={'Course Completion'} excellent={courseCompletion.onTrack} good={0} poor={courseCompletion.laggingBehind} option1="Completed" option2="Partial" option3="Incomplete" incomplete={()=>{}}/>
              </>
              }
              
                <View style = {styles.graphContainer}>
                  <Text style={{marginRight:255,marginBottom:20,fontSize:25}}>Days</Text>
                  <FlatList 
                    contentContainerStyle = {{paddingBottom : 5}}
                    data = {arrayOfObjects}
                    renderItem = {({item}) => 
                      
                      <DayWiseProgressBar dayNumber = {parseInt(item.key)} percentage = {item.value} onPress={()=>onPress(batch_id,parseInt(item.key))}/>
                    }
                  
                  />
                </View> 
              
               
  
            </View>
        
        </View>
        </ScrollView>
        </GestureHandlerRootView>
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
  graphContainer : {
		marginTop : 10,
		marginLeft : 30,
		marginRight : 30,
		alignItems : 'center',
		backgroundColor : 'white',
	},
})
export default BatchDetailsPage;


