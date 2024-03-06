import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CircularProgress from "./CircularProgress";
import Icon from "react-native-vector-icons/FontAwesome";
import ilpex from "../utils/ilpexUI";
import { useNavigation } from "@react-navigation/native";

type PropsType = { Day: number; duration: string; progressValue: number; status: boolean; day_id:string };

const Daywise = (props: PropsType) => {

  // const navigation: any = useNavigation();


  const { Day, duration, progressValue, status,day_id } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <View style={styles.learningDay}>
        <View style={styles.cardContainer}>
              <View>
                <Text style={styles.learningLabel}>Day {Day}</Text>
                <Text style={styles.learningTime}>{duration}</Text>
              </View>
              <View>
               {status && progressValue === 100 && (
                            <View style={{flexDirection: 'row'}}>
                  
                              <Icon name="check" color={ilpex.success} size={17} />
                              <Text style={styles.completeText}>Complete</Text>
                            </View>
                          )}
                {!status && (
                      <View>      
                        <Icon name="lock" color={ilpex.darkGrey} size={40}/>
                      </View>
                    )}

                
                {status && progressValue !== 100 && (
                    <View>
                      <CircularProgress completeStatus={progressValue} />
                    </View>
                  )}
              </View>
          
          
        </View>
        
      </View>
      </TouchableOpacity>
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
    position:'absolute',
    maxWidth: "100%",
    padding: 20,  

  },
  learningDay: {
    width: 350,
    borderRadius: 5,
    padding: 20,
    marginTop: 10,
    elevation: 5, // Android shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    fontWeight: "bold",
    height: 100,
  },
  learningLabel: {
    position:'relative',
    fontSize: 25,
    color: ilpex.black,
  },
  learningTime: {
    color: ilpex.darkGrey,
    fontSize: 15,
    position:'relative',
  },

  lockedText: {
    fontSize: 14,
    fontWeight: "500",
    color:ilpex.darkGrey,
  },
  completeText: {
    fontSize: 15,
    fontWeight: "normal",
    marginRight: 10,
    color: ilpex.success ,
    position:'relative',
  },
});

export default Daywise;
