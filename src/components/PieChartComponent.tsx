import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, ScrollView, StatusBar, Text, View, Animated, Easing} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PieChart from 'react-native-pie-chart';
// import { VictoryPie } from 'victory-native';
type chart ={excellent:number,good:number,poor:number,chartName:string,option1:string,option2:string,option3:string,incomplete:()=>void}

const ChartPie = (props:chart) => {

  const{chartName,excellent,good,poor,option1,option2,option3,incomplete} =props;
  const widthAndHeight = 200
  const series = [excellent,good,poor];
  const sliceColor = [ '#29A662', '#FFA600','#D3583D'];
  if(excellent==0 && good==0 && poor==0){
    return(
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={{fontSize:30,marginLeft:40}}>NO ONE IS STARTED</Text>
        </View>
      </ScrollView>
    )

  }
  else{
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
  
          <View style={styles.heading}>
          <Text style={{fontWeight:'700',color:'black',fontSize:23}}>{chartName}</Text>
          </View>
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
          </View>
          <View style={styles.chart}>
  
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          >
                
          </PieChart>
          
  
          </View>
  
          <View style={styles.bottom}>
  
          <View>
            <View style={styles.footer}>
              <View style={styles.percentage1} ></View>
              <Text style={styles.footPercentage}>{excellent}</Text>
            </View>
            <Text style={{fontWeight:'700',color:'black',fontSize:17}}>{option1}</Text>
          </View>
          {good !== 0 &&<View>
            <View style={styles.footer}>
              <View style={styles.percentage2}></View>
              <Text style={styles.footPercentage}>{good}</Text>
            </View>
            <Text style={{fontWeight:'700',color:'black',fontSize:17}}>{option2}</Text>
          </View>}
          
  
          <View>
            <View style={styles.footer}>
              <View style={styles.percentage3}></View>
              <Text style={styles.footPercentage}>{poor}</Text>
            </View>
            <TouchableOpacity onPress={incomplete}>
            <Text style={{fontWeight:'700',color:'black',fontSize:17}}>{option3}</Text>
            </TouchableOpacity>
            
          </View>
  
          </View>
          
  
  
        </View>
      </ScrollView>
    );

  }
 
};

const styles = StyleSheet.create({
  scrollContainer: {
     flex: 1,
  },
  container: {
    // flex: 1,
    // borderColor:'black',
    // borderWidth:3,
    marginTop:10,
    marginHorizontal:30,
    borderRadius:30,
    elevation:8,
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
  bottom:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    padding:30
  },
  footer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    
  },
  footPercentage:{
    margin:10,
    fontSize:20,
    color:"black",
    fontWeight:'500'
  },
  head:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginHorizontal:30
  },
  headPercentage:{
    display:'flex',
    flexDirection:'row',
    marginBottom:5
    
  },
});

export default ChartPie;
