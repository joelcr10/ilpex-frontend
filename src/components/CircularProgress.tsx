import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
 
 
type ProgressProps = {
    completeStatus:number
  };
 
 
const CircularProgress= (Props :ProgressProps) => {
  const {completeStatus} = Props;
  return (
    <ProgressCircle
    percent={completeStatus}
    radius={30}
    borderWidth={8}
    color="#D155FD"
    shadowColor="#FAFAFA"
    bgColor="#FAFAFA"
>
    <Text style={{ fontSize: 17,fontWeight:"700" }}>{completeStatus}%</Text>
</ProgressCircle>
  );
};
 
 
export default CircularProgress;
 