import { ScrollView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ChartPieHeaderShimmer = ( ) => {
    
    return (
    <ScrollView style={styles.scrollContainer}>
      <ShimmerPlaceholder 
        LinearGradient={LinearGradient}
            // visible={true}
            style={styles.container}>
        </ShimmerPlaceholder>
       </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      alignContent : 'center'
    },
    container: {
      marginTop:'8%',
      // marginHorizontal:'9%',
      borderRadius:30,
      elevation:8,
      backgroundColor:"white",
      marginBottom : '4%',
      height:200,
      width:'85%',
      alignSelf : 'center'
    },
})
export default ChartPieHeaderShimmer;