import { StyleSheet, Text, View } from "react-native"
import { batchDetails } from "../../network/ApiHook";
import ChartPie from "../../components/PieChartComponent";
import { useEffect, useState } from "react";
const BatchDetailsPage =()=>{
    const [feedList, setStoryList] = useState<any>([]);
    console.log("return",feedList)
    useEffect(() => {
        console.log('effect activated');
        const getStory = async () => {
          try {
            const {loginResp, errorMessage} = await batchDetails()
            console.log(loginResp);
            setStoryList(loginResp);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        getStory();
    }, []);
return(
        <View style={styles.container1}>
            <View style ={styles.textData}>
            <Text style={styles.text}>Batch</Text>
            </View>
            <View style ={styles.body1}>
                {/* Page Body */}
                <ChartPie  excellent={feedList.excellent} good={feedList.good} poor={feedList.poor}/>
                
            </View>
            
        </View>
    )
    }
const styles = StyleSheet.create({
      container1:{
        height:'100%',
        backgroundColor:'#8518FF'
      },
      body1:{
        height:'100%',
        backgroundColor:'white',
        borderTopEndRadius:50,
        borderTopLeftRadius:50,
        marginTop:60,
        //  justifyContent:'center'
        
    },
      text:{
        fontFamily:'poppins',
        fontWeight:'bold',
        fontSize:45,
        color:'white',
        marginTop:80
    },
    textData:{
        alignItems:'center'
    },
})
export default BatchDetailsPage;


