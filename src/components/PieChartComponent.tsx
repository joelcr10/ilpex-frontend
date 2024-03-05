import React from 'react';
import {StyleSheet, ScrollView, StatusBar, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import { VictoryPie } from 'victory-pie';
type chart ={excellent:string,good:string,poor:string}

const ChartPie = (props:chart) => {
  const{excellent,good,poor} =props;
  console.log(excellent,good,poor)
  const widthAndHeight = 200;
  const graphicData = [excellent,good,poor];
  const graphicColor = [ '#A93AFF', '#4C0088','#1B0030'];
  
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>

        <View style={styles.heading}>
        <Text style={{fontWeight:'700',color:'black',fontSize:23}}>Assesment Score</Text>
        </View>
        <View style={styles.head}>

          <View style={styles.headPercentage}>
          <View style={styles.percentage1}>
          </View>
          <Text style={{marginLeft:5}}>Above 95</Text>
          </View>
          
          <View style={styles.headPercentage}>
          <View style={styles.percentage2}>
          </View>
          <Text style={{marginLeft:5}}>Above 25</Text>
          </View>

          <View style={styles.headPercentage}>
          <View style={styles.percentage3}>
          </View>
          <Text style={{marginLeft:5}}>Under 25</Text>
          </View>
        </View>
        <View style={styles.chart}>

        {/* <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.45}
          coverFill={'#FFF'}
        /> */}
        <VictoryPie
        animate={{ easing: 'exp' }}
        data={graphicData}
        width={250}
        height={250}
        colorScale={graphicColor}
        innerRadius={50}
      />

        </View>

        <View style={styles.bottom}>

        <View>
          <View style={styles.footer}>
            <View style={styles.percentage1} ></View>
            <Text style={styles.footPercentage}>{excellent}</Text>
          </View>
          <Text style={{fontWeight:'700',color:'black',fontSize:17}}>excellent</Text>
        </View>
        <View>
          <View style={styles.footer}>
            <View style={styles.percentage2}></View>
            <Text style={styles.footPercentage}>{good}</Text>
          </View>
          <Text style={{fontWeight:'700',color:'black',fontSize:17}}>Good</Text>
        </View>
        <View>
          <View style={styles.footer}>
            <View style={styles.percentage3}></View>
            <Text style={styles.footPercentage}>{poor}</Text>
          </View>
          <Text style={{fontWeight:'700',color:'black',fontSize:17}}>poor</Text>
        </View>

        </View>
        


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    // borderColor:'black',
    // borderWidth:3,
    marginTop:100,
    marginHorizontal:30,
    borderRadius:30,
    elevation:8,
    backgroundColor:"white",
    marginBottom : 20
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
    backgroundColor:'#A93AFF',
    height:20,
    width:20,
    borderRadius:50
  },
  percentage2:{
    backgroundColor:'#4C0088',
    height:20,
    width:20,
    borderRadius:50
  },
  percentage3:{
    backgroundColor:'#1B0030',
    height:20,
    width:20,
    borderRadius:50
  },
  bottom:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
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
    flexDirection:'column',
    justifyContent:'space-between',
    marginLeft:30
  },
  headPercentage:{
    display:'flex',
    flexDirection:'row',
    marginBottom:5
    
  },
});

export default ChartPie;