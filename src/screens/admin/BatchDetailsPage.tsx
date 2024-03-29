import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ChartPie from "../../components/PieChartComponent";
import { useEffect, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
import ChartPieShimmer from "../../components/PieChartShimmer";
import ChartPieHeaderShimmer from "../../components/pieChartHeaderShimmer";
import BackButton from "../../components/BackButton";
import DayWiseProgressBar from "../../components/DayWiseProgressBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { List } from 'react-native-paper';
import moment from 'moment'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ilpex from "../../utils/ilpexUI";
import DayChartShimmer from "../../components/DayChartShimmer";
const BatchDetailsPage =()=>{
   const todayDate = moment().format('YYYY-MM-DD');
    const route:any = useRoute();
    const navigation : any = useNavigation();
    const batch_id = route.params.batch_id;
    const [isLoading,setLoading] =useState(true);
    const [score, setScore] = useState<any>([]);
    const [percipioScore, setPercipioScore] = useState<any>([]);
    const [speedStats, setSpeedStats] = useState<any>([]);
    const [batchData,setBatchData] = useState<any>([]);
    const [currentDate,setCurrentDate] = useState<any>([]);
    const [courseCompletion,setCourseCompletion] = useState<any>([]);
    const [dayWiseProgress,setdayWiseProgress] = useState<any>([]);
    const [traineeList,setTraineeList] = useState<any>([]);
    const [expanded, setExpanded] = useState(true);
    const [startDate, setStartDate] = useState<string>('')
    const [endtDate, setEndDate] = useState<string>('')
    const onPress=(batch_id:number,day_id:number)=>{
      navigation.navigate("batchDayWiswDetails",{ batch_id:batch_id, day:day_id});
    }
    const toTrainee=(user_id:number, trainee_id : number)=>{
       navigation.navigate("TraineeProileAnalysisScreen",{ user_id:user_id, trainee_id : trainee_id});
    }
    const day =currentDate.current_day;
    const noNavigation=()=>{}

//percipio assessment report trainee list
    const percipioAssessmentNav=(num:number)=>{
      if(num == 1){
        navigation.navigate("PercipioAssessmentTraineeList",
          {trainee_list:percipioScore.excellentTraineesList,
            batch_name:batchData.batch_details.batch_name,
            title:'Excellent'
        });
      }
      if(num == 2){
        navigation.navigate("PercipioAssessmentTraineeList",
        {trainee_list:percipioScore.goodTraineesList,
          batch_name:batchData.batch_details.batch_name,
          title:'Good'
        });
      }
      if(num == 3){
        navigation.navigate("PercipioAssessmentTraineeList",
        {trainee_list:percipioScore.poorTraineesList,
          batch_name:batchData.batch_details.batch_name,
          title:'Poor'
        });
      }
    }

    //assessment report trainee list
    const assessmentNav=(num:number)=>{
      if(num == 1){
        navigation.navigate("AssessmentTraineeList",
          {trainee_list:score.excellentTraineesList,
            batch_name:batchData.batch_details.batch_name,
            title:'Excellent'
        });
      }
      if(num == 2){
        navigation.navigate("AssessmentTraineeList",
        {trainee_list:score.goodTraineesList,
          batch_name:batchData.batch_details.batch_name,
          title:'Good'
        });
      }
      if(num == 3){
        navigation.navigate("AssessmentTraineeList",
        {trainee_list:score.poorTraineesList,
          batch_name:batchData.batch_details.batch_name,
          title:'Poor'
        });
      }
    }

    const BatchIncompleteTraineList=(num:number)=>{
      if(num ==3){
        navigation.navigate("BatchIncompleteTraineesScreen",{ batch_id:batch_id,day:day});
      }
    }
    const multipleNavigation =(num:number)=>{
      if(num == 1){
        navigation.navigate("OneTimesWatchSpeedScreen",{batch_id:batch_id});
      }
      if(num == 2){
        navigation.navigate("TwoTimesWatchSpeedScreen",{batch_id:batch_id});
      }
      if(num == 5){
        navigation.navigate("LessThanOneTimesWatchSpeedScreen",{batch_id:batch_id});
      }
      if(num == 3){
        navigation.navigate("NotWatchedScreen",{batch_id:batch_id});
      }
      if(num == 4){
        navigation.navigate("OnePointFiveTimesSpeed",{batch_id:batch_id});
      }
    }

    var count:number =1;
    const loadFunction =()=>{
      setExpanded(!expanded)
      count = 1;
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
        const {responseData, errorMessage} = await getHook(`api/v2/trainee?batch_id=${batch_id}`)
        if(responseData)
        {
           setTraineeList(responseData);
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
        const getScore = async () => {
          try {
            const {responseData, errorMessage} = await getHook(`api/v2/batchAvg/${batch_id}`)
            if(responseData)
            {
              console.log('this is avg score',responseData)
              setScore(responseData);
            }
            if(errorMessage)
              console.log(errorMessage)
            } catch (error) {
            console.error('Error:', error);
          }
        };
        getScore();
    }, []);

    useEffect(() => {
      const getStory = async () => {
        try {
          const {responseData, errorMessage} = await getHook(`api/v2/percipioAssesmentAvg/${batch_id}`)
          if(responseData)
          {
            console.log('this is avg of percipio assesments',responseData)
            setPercipioScore(responseData);
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
        const {responseData, errorMessage} = await getHook(`api/v2/batch/${batch_id}/watchtime`)
        if(responseData)
        {
          console.log('this is speed stats',responseData.data)
          setSpeedStats(responseData.data);
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
            console.log('this is batch data',responseData)
            setBatchData(responseData);
            const {startDate,endtDate} = await changeDate(responseData)
            console.log('Received start date:', startDate);
            console.log('Received end date:', endtDate);
            setStartDate(startDate);
            setEndDate(endtDate)
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
      }
    }
const changeDate = async(batchData:any) =>{
const dateString = batchData.batch_details.start_date.split('T')[0];
const date = new Date(dateString);
const startDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
console.log('start date will be',startDate)
const endDateString = batchData.batch_details.end_date.split('T')[0];
const endDate = new Date(endDateString);
const endtDate = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
return {startDate,endtDate}
}
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
               {!isLoading && <View style ={styles.detail}>
                    <Text style={{fontFamily : 'Poppins-SemiBold',color:'black',fontSize:24,marginBottom:20}}>{batchData.batch_details.batch_name}</Text>
                    <View style={{justifyContent:'flex-start',display:'flex',flexDirection:'row',marginLeft : '10%'}}>
                    <View style={{flex:1}}>
                    <Text style={{fontFamily : 'Poppins-Regular',color:'black',fontSize:14}}>Start Date </Text> 
                    <Text style={{fontFamily : 'Poppins-Regular',color:'black',fontSize:14}}>End Date </Text> 
                    <Text style={{fontFamily : 'Poppins-Regular',color:'black',fontSize:14}}>Trainees </Text> 
                    <Text style={{fontFamily : 'Poppins-Regular',color:'black',fontSize:14}}>Current Day </Text> 
                    </View>
                    <View style={{flex:1}}>
                    <Text style={{fontFamily : 'Poppins-Medium', marginLeft:'24%',color:'#8F00FF', fontSize : 14}}>{startDate}</Text>
                    <Text style={{fontFamily : 'Poppins-Medium', marginLeft:'24%',color:'#8F00FF', fontSize : 14}}>{endtDate}</Text>
                    <Text style={{fontFamily : 'Poppins-Medium', marginLeft:'24%',color:'#8F00FF', fontSize : 14}}>{batchData.noOfTrainees}</Text>
                    <Text style={{fontFamily : 'Poppins-Medium', marginLeft:'24%',color:'#8F00FF', fontSize : 14}}>{currentDate.current_day}</Text>
                    </View>
                  </View>
                </View>
                }
          <View style ={{marginBottom : '5%'}}>
                  <List.Accordion
                      title="List of Trainees"
                      left={props => <List.Icon {...props} icon="account" />}
                      expanded={!expanded}
                      onPress={loadFunction}
                      style={styles.accordian}
                      titleStyle={styles.accordianTitle}
                      >
                      <View style={styles.accordianView}>
                         <FlatList
                          showsVerticalScrollIndicator={false}
                          // contentContainerStyle = {{paddingBottom : 30}}
                          data={traineeList}
                          renderItem={({ item,index }) => (
                            <TouchableOpacity onPress={()=>toTrainee(item.user_id, item.trainee_id)}>
                            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.accordianText}>
                                {index + 1} .  {item.user.user_name}</Text>
                              </View>
                              </TouchableOpacity>
                          )}
                          keyExtractor={item => item.id}
                          />
                      </View>
                  </List.Accordion>
                </View>
                </View>
              {isLoading&&<><ChartPieShimmer/>
              <ChartPieShimmer/></>}
              {!isLoading&&<>
                <ChartPie 
                  chartName={'Percipio Assessment Score'} 
                  excellent={percipioScore.excellent} 
                  good={percipioScore.good} 
                  poor={percipioScore.poor} 
                  onePointFive={0}
                  LessOnePointFive={0}
                  option1="Excellent" 
                  option2="Good" 
                  option3="Poor" 
                  option4='1.5x'
                  option5='<1.5x' 
                  incomplete={percipioAssessmentNav}
                  option={'assesment'} />
                <ChartPie 
                  chartName={'Course Speed'} 
                  excellent={speedStats.oneWatchSpeed} 
                  good={speedStats.twoTimesWatchSpeed} 
                  poor={speedStats.haveNotWatchedAnyVideo} 
                  onePointFive={speedStats.onePointFiveWatchSpeed}
                  LessOnePointFive={speedStats.lessThanOneWatchSpeed}
                  option5='< 1x' 
                  option1="1x" 
                  option4='1.5x'
                  option2="2x" 
                  option3="NA"
                  incomplete={multipleNavigation}
                  option={'speed'} />
              <ChartPie 
                  chartName={'Assessment Score'} 
                  excellent={score.excellent} 
                  good={score.good} 
                  poor={score.poor} 
                  onePointFive={0}
                  LessOnePointFive={0}
                  option1="Excellent" 
                  option2="Good" 
                  option3="Poor" 
                  option4='1.5x'
                  option5='<1.5x' 
                  incomplete={assessmentNav} 
                  option={'assesment'}/>
              <ChartPie 
                  chartName={'Course Completion'} 
                  excellent={courseCompletion.onTrack} 
                  good={0} 
                  poor={courseCompletion.laggingBehind} 
                  onePointFive={0}
                  LessOnePointFive={0}
                  option1="Completed" 
                  option2="Partial" 
                  option3="Incomplete" 
                  option4='1.5x'
                  option5='<1.5x' 
                  incomplete={BatchIncompleteTraineList}
                  option={''}/>
              </>
              }
              <View style = {styles.graphContainer}>
                  <View style = {{flexDirection : 'row', width : '85%', justifyContent: 'space-between', marginBottom: '5%'}}>
                    <Text style={{ fontSize: 17, fontFamily: 'Poppins-Regular',width : '20%', textAlign : 'left',color : ilpex.darkGrey}}>Days   </Text>
                    <Text style={{fontSize:15, fontFamily : 'Poppins-Regular', width:'80%' , color : ilpex.darkGrey, textAlign: 'center'}}>Percentage of Courses {'\n'}Completed</Text>
                  </View>   
                  {isLoading ?
                  <FlatList 
                  contentContainerStyle = {{paddingBottom : 5}}
                  data = {arrayOfObjects}
                  renderItem = {({item}) => 
                  <DayChartShimmer/> 
                  }
                />:
                  <FlatList 
                  contentContainerStyle = {{paddingBottom : 5}}
                  data = {arrayOfObjects}
                  renderItem = {({item}) => 
                    <DayWiseProgressBar dayNumber = {parseInt(item.key)} percentage = {item.value} onPress={()=>onPress(batch_id,parseInt(item.key))}/>
                  }
                />}
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
    backgroundColor:'#8518FF',
    
  },
  accordianTitle:{
    fontFamily : ilpex.fontRegular,
    fontSize: 17
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
    marginLeft : '9%',
    marginRight : '9%',
  },
  accordianView:{
    borderBottomLeftRadius : 10,
    borderBottomRightRadius : 10,
    backgroundColor:'white',
    elevation:5,
    paddingBottom : 30,
    marginLeft : '9%',
    marginRight : '9%',
    paddingLeft : '8%',
    paddingRight : '8%',
  },
  body1:{
    height:'100%',
    backgroundColor:'white',
    borderTopEndRadius : 30,
    borderTopStartRadius : 30,
    marginTop : '5%',
  },
  text:{
    fontFamily:'Poppins-SemiBold',
    fontSize:35,
    color:'white',
    marginTop:'17%'
  },
  textData:{
    alignItems:'center'
  },
  detail: {
    alignItems:'center',
    marginTop:25,
    marginHorizontal:30,
    borderRadius:30,
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
    marginBottom : 150,
		alignItems : 'center',
		backgroundColor : ilpex.white,
	},
})
export default BatchDetailsPage;


