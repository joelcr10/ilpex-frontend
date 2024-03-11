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
import { useRoute } from "@react-navigation/native";
const DayWiseDetailsPage =()=>{
    const route:any = useRoute();
    const day = route.params.day;
    const batch = route.params.batch_id;
    // console.log('this is day',day)
    // console.log('this is batch',batch)
    const [isLoading,setLoading] =useState(true);
    const [currentDateCompletion, setCurrentDateCompletion] = useState<any>([]);
    const [dayWiseCourseList,setDayWiseCourseList] = useState<any>([]);

    useEffect(() => {
      console.log('effect activated');
      const getStory = async () => {
        try {
          const {responseData, errorMessage} = await getHook(`/api/v2/analysis/${batch}/${day}`)
          console.log('current date completion',responseData);
          setCurrentDateCompletion(responseData);
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
          const {responseData, errorMessage} = await getHook(`/api/v3/course/day/${day}`)
          console.log('this is data',responseData);
          if(responseData){
            console.log('course List',responseData.message);
            setDayWiseCourseList(responseData.message);
            setLoading(false);
          }
          // setBatchData(responseData);
          
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getStory();
  }, []);

 
return(
        <ScrollView>
        <View style={styles.container1}>
          <BackButton color = 'white'/>
          <ThreeDots color = 'white'></ThreeDots>
            <View style ={styles.textData}>
            <Text style={styles.text}>Day</Text>
            </View>
            <View style ={styles.body1}>
              <View>
              
              {isLoading && <ChartPieHeaderShimmer/>} 
               {!isLoading && <><View style ={styles.detail}>
                    <Text style={{fontWeight:'700',color:'black',fontSize:28,marginBottom:20}}>Day {day}</Text>
                    <Text style={{marginRight:185}}>Courses</Text>
                    <FlatList
                        data={dayWiseCourseList}
                        renderItem = {({item}) =><View style ={styles.eachDetail}>
                        <Text style={{fontWeight:'500',color:'black',fontSize:15}}>{item.course_name.substring(0,20)}...</Text> 
                        <Text style={{marginLeft:30,fontWeight:'500'}}>{item.course_duration}</Text>
                        </View>}
                        />
                    
                </View></>}
              
                 {/* <View>
                   <IconButtonComponent  name={'Report'} onPress={()=>{}} buttonPressed={false} icon={'description'}/>
                </View> */}
              </View>
              {isLoading&&<><ChartPieShimmer/>
              <ChartPieShimmer/></>}
              {!isLoading&&<><ChartPie chartName={'Course Completion'} excellent={currentDateCompletion.onTrack} good={0} poor={currentDateCompletion.laggingBehind} option1="Completed" option2="Partial" option3="Incomplete" /></>}
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
export default DayWiseDetailsPage;


