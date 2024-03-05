import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CircularProgress from "./CircularProgress";
import Icon from "react-native-vector-icons/FontAwesome";

type PropsType = { Day: number; duration: string; progressValue: number; status: boolean };

const Daywise = (props: PropsType) => {
  const { Day, duration, progressValue, status } = props;

  return (
    <View style={styles.container}>
      <View style={styles.learningDay}>
        <View>
          <Text style={styles.learningLabel}>Day {Day}</Text>
          {!status && (
            <View style={styles.lockedContainer}>
              <Icon name="lock" color={"#737373"} size={40} style={{ position: 'relative', left: 270, bottom: 15 }} />
            </View>
          )}
          {status && progressValue === 100 ? (
            <View style={styles.completeContainer}>
              <Text style={styles.learningTime}>{duration}</Text>
              <Icon name="check" color={"#33DB76"} size={17} style={{ position:'relative', left:135}} />
              <Text style={styles.completeText}>Complete</Text>
            </View>
          ) : status ? (
            <View>
              <Text style={styles.learningTime}>{duration}</Text>
            </View>
          ) : null}
        </View>
        {status && progressValue !== 100 ? (
          <View>
            <CircularProgress completeStatus={progressValue} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    position:'absolute',
    maxWidth: "100%",
    padding: 20,
  },
  learningDay: {
    width: 350,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
    padding: 20,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    fontWeight: "700",
    height: 100,
  },
  learningLabel: {
    position:'relative',
    top:15,
    fontSize: 25,
    color: "black",
  },
  learningTime: {
    color: "#737373",
    fontSize: 15,
    position:'relative',
    top:10,
  },
  lockedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lockedText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#737373",
  },

  completeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  completeText: {
    fontSize: 15,
    fontWeight: "normal",
    marginRight: 10,
    color: "#33DB76" ,
    position:'relative',
    left:140,
  },
});

export default Daywise;
