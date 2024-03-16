import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getHook } from "../../network/getHook/getHook";
import LineGraph from "../../components/LineGraph";
import ShimmerDaywise from "../../components/loading/DayWiseCardShimmer";
import BarChartShimmer from "../../components/loading/BarChartShimmer";

type propsType = {
    userID : string
}
const TraineeDuration = (props : propsType) => {

    const {userID} = props;
    // const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalDurationProgress, setTotalDurationProgress] = useState(0);
    const [durationDataset, setDurationDataset] = useState([]);
    const [courseLabel, setCourseLabel] = useState([]);
        
    

    const populateDatasets = async (durationData : any) =>{

        const graphLabel : any = [];
        const graphDataset : any = [
            { //course duration
            data : [],
            color:'#00ff00'
            },
            {//duration
            data: [],
            color:'#ff0000'
            },
            
        ];
        let count = 1;

        let course_duration = 0; //to get the total course duration
        let trainee_duration = 0; //to get the total duration trainee has watched
        durationData.map((item: any) =>{
            graphLabel.push("DAY "+count);
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
                // console.log(responseData.data);
                await populateDatasets(responseData.data);
                setIsLoading(false);

            }

        }

        getTraineeDuration();
      }, []);

    return ( 
        <View>
            {
                (isLoading) ? (
                    <BarChartShimmer />
                ) : (
                       
                    <LineGraph 
                        datasets={durationDataset}
                        chartName="Trainee watch time"
                        progressTitle="course duration"
                        progress={totalDurationProgress}
                        labels={courseLabel}
                    />
                )
            }
        </View>
     );
}
 
export default TraineeDuration;