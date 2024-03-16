import React from "react";
import { View, StyleSheet} from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";


const ShimmerDaywise = () => {


  return (
        <View style={styles.learningDay}>
        <View style={styles.cardContainer}>
              <View>
              <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.learningLabel}
                    visible={false}
                    />
                              <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.learningTime}
                    visible={false}
                    />
              </View>
              <View>
              <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.completeText}
                    visible={false}
                    />
  
              </View>
          
          
        </View>
        
      </View>
  );
};

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  learningDay: {
    borderRadius:15,
    padding: '3%',
    margin:'2%',
    marginHorizontal:'3%',
    paddingHorizontal:'5%',
    height:'23%',
    backgroundColor:'#ffffff',
    elevation: 4,
  },
  learningLabel: {
    borderRadius:10,
    height:'52%',
    width:'50%'
  },
  learningTime: {
    marginTop:'6%',
    borderRadius:6,
    width:'30%'
  },
  completeText: {
    marginLeft:'3%',
    width:50,
    height:50,
    borderRadius:25
   
  },
});

export default ShimmerDaywise;
