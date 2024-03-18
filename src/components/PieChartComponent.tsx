import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, ScrollView, StatusBar, Text, View,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PieChart from 'react-native-pie-chart';
// import {PieChart} from '../index';
import * as Animatable from 'react-native-animatable';

import Svg, { Path, G } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { duration } from 'moment';

// import { VictoryPie } from 'victory-native';
type chart ={excellent:number,
            good:number,
            poor:number,
            chartName:string,
            option1:string,
            option2:string,
            option3:string,
            incomplete:(num:number)=>void,
            option:string
            option4:string,
            option5:string,
            onePointFive:number,
            LessOnePointFive:number
          }


const ChartPie = (props:chart) => {

  const{chartName,excellent,good,poor,option1,option2,option3,option4,option5,incomplete,option,onePointFive,LessOnePointFive} =props;
  const widthAndHeight = 200
  const series = [excellent,good,poor,onePointFive,LessOnePointFive];
  const sliceColor = [ '#29A662', '#FFA600','#D3583D','blue','black'];

  // const pieData = [
  //   {value: excellent, color: '#29A662'},
  //   {value: good, color: '#FFA600'},
  //   {value: poor, color: '#D3583D'},
  //   // {value: poor, color: '#D3583D', text:poor},
  // ];

  
    return(
       <ScrollView style={styles.scrollContainer}>
         <View style={styles.container}>
  
          <View style={styles.heading}>
          <Text style={{fontFamily : 'Poppins-SemiBold',color:'black',fontSize:20}}>{chartName}</Text>
          </View>
          {excellent==0 && good==0 && poor==0 ?<Text></Text> :
          
          <View>
          {option == 'assesment' &&
          <View style={styles.head}>
          <View style={styles.headPercentage}>
             <View style={styles.percentage1}>
             </View>
             <Text style={{marginLeft:5}}> &gt; 95%</Text>
             </View>
             {good !== 0 &&<View style={styles.headPercentage}>
             <View style={styles.percentage2}>
            </View>
            <Text style={{marginLeft:5}}> &gt; 25%</Text>
            </View>}
            <View style={styles.headPercentage}>
            <View style={styles.percentage3}>
           </View>
            <Text style={{marginLeft:5}}> &lt; 25%</Text>
            </View>
          </View>}
          </View>}
            
          {excellent==0 && good==0 && poor==0 ?<Text style={{fontFamily : 'Poppins-Regular',color:'black',fontSize:14,marginLeft:80}}>Assesments are not started</Text>:
           <View style={styles.chart}>
          {/* <Animatable.View animation="fadeIn" duration={8000} style={{ flex: 1 }}> */}
               <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
                doughnut={true}
                coverRadius={0.45}
                coverFill={'#FFF'}
              />

            
         </View>}
         {excellent==0 && good==0 && poor==0 ?<Text></Text> :
        <View style={styles.bottom}>
        {option == 'speed' &&
          <View>
            <TouchableOpacity onPress={()=>incomplete(5)}>
            <View style={styles.footer}>
              <View style={styles.percentage5}></View>
              <Text style={styles.footPercentage}>{LessOnePointFive}</Text>
            </View>
             <Text style={{fontFamily : 'Poppins-Medium',color:'#6D6D6D',fontSize:15}}>{option5}</Text>
            </TouchableOpacity>
          </View>
            }
       <View>
       <TouchableOpacity onPress={()=>incomplete(1)}>
           <View style={styles.footer}>
               <View style={styles.percentage1} ></View>
               <Text style={styles.footPercentage}>{excellent}</Text>
            </View>
          <Text style={{fontFamily : 'Poppins-Medium',color:'#6D6D6D',fontSize:15}}>{option1}</Text>
            </TouchableOpacity>
          </View>
          {option == 'speed' &&
          <View>
            <TouchableOpacity onPress={()=>incomplete(4)}>
            <View style={styles.footer}>
              <View style={styles.percentage4}></View>
              <Text style={styles.footPercentage}>{onePointFive}</Text>
            </View>
            <Text style={{fontFamily : 'Poppins-Medium',color:'#6D6D6D',fontSize:15}}>{option4}</Text>
            </TouchableOpacity>
          </View>}
          {option !== ''&&<View>
          <TouchableOpacity onPress={()=>incomplete(2)}>
            <View style={styles.footer}>
              <View style={styles.percentage2}></View>
              <Text style={styles.footPercentage}>{good}</Text>
            </View>
            <Text style={{fontFamily : 'Poppins-Medium',color:'#6D6D6D',fontSize:15}}>{option2}</Text>
            </TouchableOpacity>
          </View>}
          
  
          <View>
          <TouchableOpacity onPress={()=>incomplete(3)}>
            <View style={styles.footer}>
              <View style={styles.percentage3}></View>
              <Text style={styles.footPercentage}>{poor}</Text>
            </View>
            <Text style={{fontFamily : 'Poppins-Medium',color:'#6D6D6D',fontSize:15}}>{option3}</Text>
            </TouchableOpacity>
          </View>

          
          
  
          </View>}
        </View>
      </ScrollView>
    );

  
}
 

const styles = StyleSheet.create({
  scrollContainer: {
     flex: 1,
     height : 440,
  },
  container: {
    marginTop:10,
    marginHorizontal:30,
    borderRadius:30,
    elevation:6,
    backgroundColor:"white",
    marginBottom:10,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  heading:{
    
    //borderWidth:2,
    //marginLeft:25,
   
    margin:20
    
  },
  chart:{
      alignItems:'center',
      margin:20
  },
  percentage1:{
    backgroundColor:'#29A662',
    height:20,
    width:20,
    borderRadius:50
  },
  percentage2:{
    backgroundColor:'#FFA600',
    height:20,
    width:20,
    borderRadius:50
  },
  percentage3:{
    backgroundColor:'#D3583D',
    height:20,
    width:20,
    borderRadius:50
  },
  percentage4:{
    backgroundColor:'blue',
    height:20,
    width:20,
    borderRadius:50
  },
  percentage5:{
    backgroundColor:'black',
    height:20,
    width:20,
    borderRadius:50
  },
  bottom:{
    
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    padding:10
  },
  footer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent : 'center'
  },
  footPercentage:{
    marginLeft : 7,
    marginRight : 10,
    marginTop : 10,
    marginBottom : 10,
    fontSize:14,
    // color:"black",
    fontFamily : 'Poppins-Medium',
    color : '#6D6D6D',
  },
  head:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    // marginHorizontal:30,
  },
  headPercentage:{
    display:'flex',
    flexDirection:'row',
    marginBottom:5,
  },
});

export default ChartPie;









    
      
  

