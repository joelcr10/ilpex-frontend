import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CircularProgress from "./CircularProgress";
import Icon from "react-native-vector-icons/FontAwesome";
import ilpex from "../utils/ilpexUI";
import { useNavigation } from "@react-navigation/native";

type PropsType = { Day: number, duration: string,progressValue: number, status: boolean;  };

const Daywise = (props: PropsType) => {

  const navigation: any = useNavigation();
  const goToDay = (Day: number) =>{
    if(status){
      navigation.navigate("Day",{Day});
    }
  }

  const { Day, duration, progressValue, status } = props;

  // Logic to determine the day label
  const dayLabel = Day === 15 ? "Day 15 & 16" : `Day ${Day}`;

  console.log(dayLabel, duration, progressValue, status);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>goToDay(Day)}>
        <View style={styles.learningDay}>
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.learningLabel}>{dayLabel}</Text>
              <Text style={styles.learningTime}>{duration}</Text>
            </View>
            <View>
              {status && progressValue === 100 && (
                <View style={{flexDirection: 'row', alignItems : 'center'}}>
                  <View style = {{paddingBottom : 5}}>
                    <Icon name="check" color={ilpex.success} size={17}/>
                  </View>
                  <Text style={styles.completeText}>Completed</Text> 
                </View>
              )}
              {!status && (
                <View>      
                  <Icon name="lock" color={ilpex.darkGrey} size={40}/>
                </View>
              )}

              {status && progressValue !== 100 && (
                <View>
                  <CircularProgress completeStatus={Math.ceil(progressValue)} color={ilpex.main} />
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
    maxWidth: "100%",

  },
  learningDay: {
    backgroundColor: ilpex.white,
    borderRadius: 15,
    elevation: 4,
    paddingHorizontal: 20,
    paddingTop : '4%',
    paddingBottom : '4%',
    marginTop: '3%',
    margin: 10,
    zIndex: 10,
  },
  learningLabel: {
    position:'relative',
    fontSize: 19,
    color: ilpex.black,
    fontFamily : ilpex.fontMedium
  },
  learningTime: {
    color: ilpex.darkGrey,
    fontSize: 12.5,
    fontFamily : ilpex.fontMedium,
    position:'relative',
  },

  lockedText: {
    fontSize: 14,
    fontWeight: "500",
    color:ilpex.darkGrey,
  },
  completeText: {
    fontSize: 15,
    fontFamily : ilpex.fontMedium,
    marginRight: 10,
    paddingLeft : 5,
    color: ilpex.success ,
    position:'relative',
  },
});

export default Daywise;
