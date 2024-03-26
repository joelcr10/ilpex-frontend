import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getHook } from "../../network/getHook/getHook";
import LineGraph from "../../components/LineGraph";
import BarChartShimmer from "../../components/loading/BarChartShimmer";
import ilpex from "../../utils/ilpexUI";

type propsType = {
    userID : string
}
const TraineeDuration = (props : propsType) => {

    const {userID} = props;
    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalDurationProgress, setTotalDurationProgress] = useState(0);
    const [durationDataset, setDurationDataset] = useState([]);
    const [courseLabel, setCourseLabel] = useState([]);
    const [noData, setNoData] = useState<boolean>(true);
        
    

    const populateDatasets = async (durationData : any) =>{

        const graphLabel : any = [];
        const graphDataset : any = [
            { //course duration
                data : [],
                color:'#00ff00',
                legend: 'Course duration',
            
            },
            {//duration
                data: [],
                color:'#ff0000',
                legend: "Trainee's duration"
            },
            
        ];
        let count = 1;

        let course_duration = 0; //to get the total course duration
        let trainee_duration = 0; //to get the total duration trainee has watched
        durationData.map((item: any) =>{
            graphLabel.push("C "+count);
            graphDataset[0].data.push(Math.ceil(Number(item.course_duration)/60));
            course_duration = course_duration + Number(item.course_duration)
            graphDataset[1].data.push(Math.ceil(Number(item.duration)/60));
            trainee_duration = trainee_duration + Number(item.duration);

            count++;
        })

        setDurationDataset(graphDataset);
        setCourseLabel(graphLabel);
        setTotalDurationProgress(Math.ceil((trainee_duration/course_duration)*100))
        
    }
    
    useEffect(() => {
        const getTraineeDuration = async () =>{
            const {success, responseData, errorMessage} = await getHook(`/api/v3/trainee/${userID}/duration`);

            if(success){
                if(responseData.data.length !== 0){
                    await populateDatasets(responseData.data);
                    setNoData(false);    
                }
                
                setIsLoading(false);
            }

        }

        getTraineeDuration();
      }, []);

    return ( 
        <View style={styles.durationContainer}>
            {
                (isLoading) ? (
                    <BarChartShimmer />
                ) :  (noData) ? (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.headertext}>Trainee Watch Time</Text>
                            <Text style={styles.noDataText}>No Data</Text>
                        </View>
                    ) :(  
                        <LineGraph 
                            datasets={durationDataset}
                            chartName="Trainee watch time "
                            progressTitle="Course duration"
                            progress={totalDurationProgress}
                            labels={courseLabel}
                        />
                    )
            }
        </View>
     );
}

const styles = StyleSheet.create({
    durationContainer:{
        marginBottom: 20,
    },

    noDataContainer:{
        // backgroundColor: 'blue'
        height: 200
    },

    noDataText:{
        // backgroundColor: 'red',
        textAlign: 'center',
        fontFamily: ilpex.fontRegular,
        fontSize: 20,
        color:ilpex.darkGrey,
    },

    headertext:{
        fontFamily:ilpex.fontSemiBold,
        fontSize:21,
        color:ilpex.black,
        marginTop : '5%',
        marginRight : '5%',
        marginBottom : '3%',
        marginLeft : '12%',
        // backgroundColor: 'blue'
    
    },
})
 
export default TraineeDuration;