import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getCourseHook } from "./getCourseHook";
import CourseCard from "../../../components/CourseCard";
import { useRoute } from "@react-navigation/native";
import ilpex from "../../../utils/ilpexUI";
import Button from "../../../components/Button";
import SmallButton from "../../../components/SmallButton";
import IconButton from "../../../components/IconButton";
import FileUploadField from "../../../components/FileUploadField";



const TraineeDayScreen=()=>{


    // const route:any = useRoute();
    // const day=route.params.number;

    const day_id=1;
    const trainee_id=8;


    const [isLoading, setLoading] = useState(false);

    // const [courselist, setCourse] = useState<any[]>([]);

    // useEffect(() => {
    //     const getAssessment = async () => {
    //       try {
    //         const {Resp, errorMessage} = await getCourseHook(day_id,trainee_id);
    //         setLoading(false);
    //         setCourse(Resp);
    //         console.log(Resp)
    //       } catch (error) {
    //         console.error('Error:', error);
    //       }
    //     };
    //     getAssessment();
    //     }, []);


    const courselist={
        "message": [
            {
                "course_name": "How developers think",
                "course_duration": " ",
                "course_type": "Technical",
                "course_id": 1,
                "status": false
            },
            {
                "course_name": "The mindset of the software developer",
                "course_duration": " ",
                "course_type": "Technical",
                "course_id": 2,
                "status": false
            },
            {
                "course_name": "Be Liked and Respected in the Workplace",
                "course_duration": "23m 36s",
                "course_type": "Behavioural/Soft Skills",
                "course_id": 3,
                "status": false
            },
            {
                "course_name": "Building a Win-win Relationship with Your Manager",
                "course_duration": "29m 42s",
                "course_type": "Behavioural/Soft Skills",
                "course_id": 4,
                "status": false
            },
            {
                "course_name": "SDLC - Software Development Life Cycle | SDLC Phases explained in detail with examples",
                "course_duration": "35m 40s",
                "course_type": "Technical",
                "course_id": 5,
                "status": false
            },
            {
                "course_name": "SDLC-Waterfall; swiss cheese model; lessons learned in software; V model; design vs. code; agile methods",
                "course_duration": "40m",
                "course_type": "Technical",
                "course_id": 6,
                "status": false
            }
        ]
    }

    return(
        <View>
            <View style={{backgroundColor:ilpex.main}}>
                <View style={styles.topbar}>
                    <Text style={styles.headerText}>{`Day ${day_id}`}</Text>
                </View>
                    <View style={styles.container}>
                        <FileUploadField/>
                        <Text style={styles.subTitle}>Learning Courses</Text>
                    {!isLoading&&
                    <FlatList
                        horizontal={false}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        data={courselist.message}
                        renderItem={({item})=><CourseCard name={item.course_name} duration={item.course_duration} status={item.status}/>}
                    />
                    }
                    </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle:{
        fontFamily:ilpex.fontSemiBold,
        fontSize:20,
        margin:20,
        color:'#000',
    },
    container:{
        backgroundColor:ilpex.white,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    headerText: {
        color:ilpex.white,
        fontSize: 32,
        textAlign:'center',
        fontFamily:ilpex.fontSemiBold,
      },
      topbar:{
        backgroundColor: 'transparent',
        height:184,
        justifyContent: 'center',
        alignItems: 'center',
      }
})

export default TraineeDayScreen;