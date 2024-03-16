import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ilpex from '../utils/ilpexUI';

import CircularProgress from './CircularProgress';

interface Dataset {
  // labels: string[];
  data: number[];
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

  return (
    <View style={styles.container} >
        <Text style={styles.headertext}>{chartName}</Text>
        <View style={styles.progress}>
            <Text style={styles.progressTitle}>{progressTitle}</Text>
            <CircularProgress completeStatus={progress} color={ilpex.progress2}/>
        </View>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{alignSelf:'flex-start'}}>
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
    backgroundColor: '#fff',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  container:{
    backgroundColor:ilpex.white,
    borderRadius: 10,
    margin:20,
    padding:20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 3,
  },
  headertext:{
    fontFamily:ilpex.fontSemiBold,
    fontSize:18,
    color:ilpex.black,
    margin:20,
  },
  progressTitle:{
    fontFamily:ilpex.fontRegular,
    fontSize:16,
    color:ilpex.black,
  },
  percentage:{
    fontFamily:ilpex.fontSemiBold,
    fontSize:16,
    color:ilpex.black,
    marginHorizontal:20,
  },
  progress:{
    flexDirection:'row',
    marginVertical:20,
    marginHorizontal:40,
    marginBottom:40,
    justifyContent:'space-between'
  }
});

export default LineGraph;
