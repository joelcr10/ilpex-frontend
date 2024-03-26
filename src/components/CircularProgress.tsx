import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import ilpex from '../utils/ilpexUI';
 
 
type ProgressProps = {
    completeStatus:number;
    color:string;
  };
 
 
const CircularProgress= (Props :ProgressProps) => {
  const {completeStatus, color} = Props;
  return (
    <ProgressCircle
    percent={completeStatus}
    radius={30}
    borderWidth={8}
    color={color}
    shadowColor="#FAFAFA"
    bgColor="#FAFAFA"
   
>
    <Text testID="progress-circle" style={{ fontSize: 17,fontWeight:"700", color: ilpex.black }}>{completeStatus}%</Text>
</ProgressCircle>
  );
};
 
 
export default CircularProgress;
 