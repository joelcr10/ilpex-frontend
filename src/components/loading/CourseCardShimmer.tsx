import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";


const shimmerData = [ { id: '1' },{ id: '2' },{ id: '3' },{ id: '4' },{ id: '5' },{ id: '6' },{ id: '7' },{ id: '8' },{ id: '9' },];

const CourseCardShimmer=()=>{

    return(
        <FlatList
                        scrollEnabled={true}
                        horizontal={false}
                        data={shimmerData}
                        renderItem={({item})=><ShimmerPlaceholder
                                                  LinearGradient={LinearGradient}
                                                  style={{width:350,height:100,margin:20,borderRadius:10}}>
                                                    </ShimmerPlaceholder>
                                                    }
                        keyExtractor={item => item.id}
                      />
    )
}

export default  CourseCardShimmer;




