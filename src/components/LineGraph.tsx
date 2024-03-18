import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ilpex from '../utils/ilpexUI';

import CircularProgress from './CircularProgress';

interface Dataset {
  // labels: string[];
  data: number[];
  legend:string;
  color:string;
}

interface LineGraphProps {
  datasets: Dataset[];
  chartName: string;
  progressTitle: string;
  progress: number;
  labels: string[];
}

const hexToRgba = (hex:string, opacity:number) => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${opacity || 1})`;
  };

const LineGraph: React.FC<LineGraphProps> = ({datasets,
  chartName,
  progressTitle,
  progress,
  labels}) => {
    const chartData = {
      labels:labels, 
      datasets: datasets.map(dataset => ({
        data: dataset.data,
        color: (opacity = 1) => hexToRgba(dataset.color, 1),
        strokeWidth: 2,
      })),
    };

    console.log("inside line graph,",datasets[0].legend);

  return (
    <View style={styles.container} >
        <Text style={styles.headertext}>{chartName}</Text>
        <View style={styles.progress}>
            <Text style={styles.progressTitle}>{progressTitle}</Text>
            <CircularProgress completeStatus={progress} color={ilpex.progress2}/>
        </View>
        <View style={styles.legendContainer}>
        {datasets.map((dataset) => (
          <View style={styles.legendItem}>
            <View style={[styles.legendColorIndicator, { backgroundColor: dataset.color }]} />
            <Text style={styles.legendText}>{dataset.legend}</Text>
          </View>
        ))}
      </View>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{alignSelf:'flex-start',marginTop: 30}}>
        <LineChart
            data={chartData}
            width={chartData.labels.length*70}
            withVerticalLines={false}
            height={230}
            withOuterLines={false}
            chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
                borderRadius: 16,
            },
            propsForDots: {
                r: "5",
                strokeWidth: "2",
                // stroke:ilpex.graphStroke,
            }
            }}
            bezier
            style={styles.chart}
        />
        </ScrollView>

        
        </View>
  );
};

const styles = StyleSheet.create({
    chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  container:{
    backgroundColor:ilpex.white,
    paddingRight : '5%',
    paddingLeft : '1%',
    // overflow: 'hidden',
    alignSelf: 'center',
    
  },
  headertext:{
    fontFamily:ilpex.fontSemiBold,
    fontSize:21,
    color:ilpex.black,
    marginTop : '5%',
    marginRight : '5%',
    marginBottom : '3%',
    marginLeft : '10%',
    // backgroundColor: 'blue'

  },
  progressTitle:{
    fontFamily:ilpex.fontRegular,
    fontSize:17,
    color:ilpex.black,
    marginLeft : '1%',
    textAlignVertical:'center',
  },
  percentage:{
    fontFamily:ilpex.fontSemiBold,
    fontSize:16,
    color:ilpex.black,
    marginHorizontal:20,
  },
  progress:{
    flexDirection:'row',
    marginVertical:'0%',
    marginHorizontal:'10%',
    marginBottom:'10%',
    justifyContent:'space-between',
    // backgroundColor: 'red'

  },
  legendContainer: {
    position: 'absolute',
    top: "4.3%",
    left: "35%",
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '-1%',
    height: 40,
    width: 200,

  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '8%',
  },
  legendColorIndicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: '5%',
  },
  legendText: {
    fontSize: 14,
    color: ilpex.black,
  },
});

export default LineGraph;
