import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Circle } from 'react-native-progress';
import ilpex from '../utils/ilpexUI';


type ProgressProps = {
    progress:number
  };
  

const CircularProgress= ({progress}:ProgressProps) => {
  return (
    <View style={styles.container}>
      <Circle
        size={50}
        indeterminate={false}
        progress={progress/100}
        borderWidth={0}
        thickness={8} 
        color={ilpex.progress1}
        strokeCap='round'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:20,
    marginVertical:15,
  },
});

export default CircularProgress;
