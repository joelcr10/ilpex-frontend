import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { batchDetails } from "../../network/ApiHook";
import ChartPie from "../../components/PieChartComponent";
import { useEffect, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
import ChartPieShimmer from "../../components/PieChartShimmer";
import IconButtonComponent from "../../components/IconButton";
import ChartPieHeaderShimmer from "../../components/pieChartHeaderShimmer";
import ThreeDots from "../../components/ThreeDots";
import BackButton from "../../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import ilpex from "../../utils/ilpexUI";
const DayWiseDetailsPage =()=>{
    const route:any = useRoute();
    const navigation : any = useNavigation();
    const day = route.params.day;
    const batch = route.params.batch_id;
    // console.log('this is day',day)
    // console.log('this is batch',batch)
    const [isLoading,setLoading] =useState(true);
    const [currentDateCompletion, setCurrentDateCompletion] = useState<any>([]);
    const [dayWiseCourseList,setDayWiseCourseList] = useState<any>([]);
    const [expanded, setExpanded] = useState(true);
    

    const loadFunction =()=>{
      setExpanded(!expanded)
      
    }
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
  const onPress =(day:number,batch:number)=>{

    console.log('enetered the function')
    console.log('this is day',day)
  console.log('this is batch',batch)
      navigation.navigate('incompleteTraineScreen',{day:day,batch:batch})  
    }
 
return(
    <GestureHandlerRootView>
        <ScrollView>
        <View style={styles.container1}>
          <BackButton color = 'white'/>
            <View style ={styles.textData}>
            <Text style={styles.text}>Day {day}</Text>
            </View>
            <View style ={styles.body1}>
              <View>
              
              {isLoading && <ChartPieHeaderShimmer/>} 
              <List.Accordion
                    title="Courses"
                    left={props => <List.Icon {...props} icon="folder" />}
                    expanded={!expanded}
                    onPress={loadFunction}
                    style={styles.accordian}
                    titleStyle={styles.accordianTitle}
                    >
                     <View style={styles.accordianView}>
                    
                     <FlatList
                        data={dayWiseCourseList}
                        renderItem = {({item,index}) =><View style ={styles.eachDetail}>
                        <Text style={{fontWeight:'500',color:'black',fontSize:15}}>{index+1} . {item.course_name.substring(0,20)}...</Text> 
                        <Text style={{marginLeft:30,fontWeight:'500'}}>{item.course_duration}</Text>
                        </View>}
                        />
                        
                   </View>
                </List.Accordion>
               
              
                 {/* <View>
                   <IconButtonComponent  name={'Report'} onPress={()=>{}} buttonPressed={false} icon={'description'}/>
                </View> */}
              </View>
              {isLoading&&<><ChartPieShimmer/>
              <ChartPieShimmer/></>}
              {!isLoading&&<><ChartPie chartName={'Course Completion'} excellent={currentDateCompletion.onTrack} good={0} poor={currentDateCompletion.laggingBehind} option1="Completed" option2="Partial" option3="Incomplete" incomplete={()=>onPress(day,batch)}/></>}
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
    accordianTitle:{
      marginLeft:20,
      fontWeight:'700',
      fontSize:20
      
  },
    accordianText:{
      fontFamily : ilpex.fontMedium,
      fontSize : 21,
      color : 'black',
    },
    accordian:{
          borderRadius:20,
          marginHorizontal:30,
          backgroundColor:'white',
          // elevation:5,
         
        },
        accordianView:{
          borderRadius:20,
          marginHorizontal:10,
          backgroundColor:'white',
          elevation:5,
          marginTop:10,
          // position: 'absolute',
          // zIndex: 1,
          left:20,
          width:350
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
      
      marginTop:40,
      marginHorizontal:30,
      borderRadius:30,
      backgroundColor:"white",
      marginBottom : 20
    },
    eachDetail:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      margin:5,
      marginRight:15,
      right:6
  },
})
export default DayWiseDetailsPage;


