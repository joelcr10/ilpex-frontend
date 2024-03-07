import { ScrollView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ChartPieShimmer = ( ) => {
    
    return (
      <ScrollView style={styles.scrollContainer}>
        
        <ShimmerPlaceholder 
        LinearGradient={LinearGradient}
            visible={true}
            style={styles.container}>

          
  
  
          </ShimmerPlaceholder>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
    },
    container: {
      
      // borderColor:'black',
      // borderWidth:3,
      marginTop:30,
      marginHorizontal:30,
      borderRadius:30,
      elevation:8,
      backgroundColor:"white",
      marginBottom : 20,
      height:500
    },
    title: {
      fontSize: 24,
      margin: 10,
    },
    heading:{
      
      //borderWidth:2,
      //marginLeft:25,
     
      margin:20
      
    },
    chart:{
        alignItems:'center',
        margin:20
    },
    percentage1:{
      backgroundColor:'#A93AFF',
      height:20,
      width:20,
      borderRadius:50
    },
    percentage2:{
      backgroundColor:'#4C0088',
      height:20,
      width:20,
      borderRadius:50
    },
    percentage3:{
      backgroundColor:'#1B0030',
      height:20,
      width:20,
      borderRadius:50
    },
    bottom:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-evenly',
      padding:30
    },
    footer:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      
    },
    footPercentage:{
      margin:10,
      fontSize:20,
      color:"black",
      fontWeight:'500'
    },
    head:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-evenly',
      marginHorizontal:30
    },
    headPercentage:{
      display:'flex',
      flexDirection:'row',
      marginBottom:5
      
    },
  });
  
  export default ChartPieShimmer;
  