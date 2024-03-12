import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { useRoute } from "@react-navigation/native";
import ilpex from "../../utils/ilpexUI";
import Button from "../../components/Button";
import SmallButton from "../../components/SmallButton";
import IconButton from "../../components/IconButton";
import FileUploadField from "../../components/FileUploadField";
import React from "react";
import { getHook } from "../../network/getHook/getHook";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import BackButton from "../../components/BackButton";
import ThreeDots from "../../components/ThreeDots";
import CourseCardShimmer from "../../components/loading/CourseCardShimmer";
import Constants from "../../utils/Constants";
import { getItem } from "../../utils/utils";



const TraineeDayScreen=()=>{


    const route:any = useRoute();
    const day_id=route.params.Day;


    // const day_id=1;
    // const trainee_id=6;




    const [isLoading, setLoading] = useState(true);

    const [courselist, setCourse] = useState<any[]>([]);


    useEffect(() => {
        const getAssessment = async () => {
            const trainee_id=await getItem(Constants.TRAINEE_ID);
            console.log(trainee_id);
          try {
            const {responseData, errorMessage} = await getHook(`/api/v3/trainee/${trainee_id}/course/day/${day_id}`);
            setLoading(false);
            setCourse(responseData);
            console.log(responseData)
          } catch (error) {
            console.error('Error:', error);
          }
        };
        getAssessment();
        }, []);



    return(
        <View>
            <View style={{backgroundColor:ilpex.main}}>
                <BackButton color='white'/>
                <View style={styles.topbar}>
                   
                    <Text style={styles.headerText}>{`Day ${day_id}`}</Text>
                </View>
                    <View style={styles.container}>
                        {/* <FileUploadField/> */}
                        <Text style={styles.subTitle}>Learning Courses</Text>
                    {isLoading &&
                       <CourseCardShimmer/>
                    }
                    {!isLoading &&
                    
                    <View style={{height:Dimensions.get('window').height}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={courselist.message}
                        renderItem={({item})=><CourseCard name={item.course_name} duration={item.course_duration} status={item.status}/>}
                        keyExtractor={item=>item.course_id}
                    />
                </View>
                    }
                </View>
                <ThreeDots color='white'/>
            </View>
        </View>
        // </ScrollView>
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