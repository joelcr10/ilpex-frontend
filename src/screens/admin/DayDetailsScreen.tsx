import { FlatList, ScrollView, StyleSheet, Text,View } from "react-native"
import ChartPie from "../../components/PieChartComponent";
import { useEffect, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
import ChartPieShimmer from "../../components/PieChartShimmer";
import BackButton from "../../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import ilpex from "../../utils/ilpexUI";
import React from "react";

const DayWiseDetailsPage =()=>{
    const route:any = useRoute();
    const navigation : any = useNavigation();
    const day = route.params.day;
    const batch = route.params.batch_id;
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
          } catch (error) {
          console.error('Error:', error);
        }
      };
      getStory();
  }, []);
  const onPress =(day:number,batch:number)=>{
      navigation.navigate('incompleteTraineScreen',{day:day,batch:batch})  
    }

  return(
        <ScrollView>
        <GestureHandlerRootView>
        <View style={styles.container1}>
          <BackButton color = 'white'/>
            <View style ={styles.textData}>
            <Text style={styles.text}>Day {day}</Text>
            </View>
            <View style ={styles.body1}>
              <View>
              <View style = {{marginTop : '15%', marginBottom : '8%', marginLeft : '4.5%',marginRight : '4.5%'}}>
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
                        <Text style={styles.accordionText}>{index+1} . {item.course_name.substring(0,20)}...</Text> 
                        <Text style={styles.accordionTextTime}>{item.course_duration}</Text>
                        </View>}
                        keyExtractor={item => item.id}
                        />
                  </View>
                </List.Accordion>
                </View>
              </View>
              {isLoading && <ChartPieShimmer/>}
              {!isLoading&&<>
              <ChartPie 
                chartName={'Course Completion'} 
                excellent={currentDateCompletion.onTrack} 
                good={0} 
                poor={currentDateCompletion.laggingBehind} 
                option1="Completed" 
                option2="Partial" 
                option3="Incomplete" 
                incomplete={()=>onPress(day,batch)}
                option={''}
                option4=''
                option5='' 
                onePointFive={0}
                LessOnePointFive={0}
                /></>}
            </View>
        </View>
        </GestureHandlerRootView>
     </ScrollView>
     )
    }
const styles = StyleSheet.create({
      container1:{
        minHeight : 1000,
        backgroundColor:'#8518FF'
      },
      body1:{
        height:'100%',
        backgroundColor:'white',
        borderTopEndRadius:30,
        borderTopLeftRadius:30,
        marginTop:'5%',
    },
    accordionText : {
      fontFamily : ilpex.fontMedium,
      color : ilpex.darkGrey
    },
    accordionTextTime : {
      fontFamily : ilpex.fontMedium,
      color : ilpex.darkGrey
    },
    accordianTitle:{
      fontFamily : ilpex.fontRegular,
      fontSize: 17,
      paddingTop : '3%'
    },
    accordianText:{
      paddingTop : '4%',
      fontFamily : ilpex.fontMedium,
      fontSize : 16,
      color : 'black',
    },
    accordian:{
      borderTopLeftRadius : 10, 
      borderTopRightRadius : 10,
      backgroundColor:'white',
      elevation:5,
      marginLeft : '3%',
      marginRight : '3%',
    },
    accordianView:{
      borderBottomLeftRadius : 10,
      borderBottomRightRadius : 10,
      backgroundColor:'white',
      elevation:5,
      paddingBottom : 30,
      marginLeft : '3%',
      marginRight : '3%',
      paddingLeft : '8%',
    },
    text:{
      fontFamily:'poppins',
      fontWeight:'bold',
      fontSize:35,
      color:'white',
      marginTop:45
    },
    textData:{
      marginTop : '3%',
      marginBottom : '6%',
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


