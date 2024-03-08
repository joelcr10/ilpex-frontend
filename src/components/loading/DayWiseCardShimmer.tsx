import React from "react";
import { View, StyleSheet} from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";


const ShimmerDaywise = () => {


  return (
    <View style={styles.container}>
     
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
   
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },

  container: {
    maxWidth: "100%",
    padding: 20,  

  },
  learningDay: {
    width: 350,
    borderRadius: 15,
    padding: 5,
    marginTop: 10,

    height: 100,
  },
  learningLabel: {
    fontSize: 25,
  },
  learningTime: {
    fontSize: 15,
    marginTop:20
   
  },

  lockedText: {
    fontSize: 14,
    fontWeight: "500",
  },
  completeText: {
    fontSize: 15,
    fontWeight: "normal",
    marginLeft:9,

    width:50,
    height:50,
    borderRadius:25
   
  },
});

export default ShimmerDaywise;
