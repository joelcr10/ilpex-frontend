import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";


const TraineeNameShimmer=()=>{

    const pageWidth=Dimensions.get('window').width;

    return(
        <FlatList
                        data={[{},{},{},{},{},{},{},{},{}]}
                        renderItem={({item})=><ShimmerPlaceholder
                                                  LinearGradient={LinearGradient}
                                                  style={{
                                                    width:pageWidth,
                                                    height:50,
                                                    margin:10,
                                                    borderRadius:10}}>
                                                    </ShimmerPlaceholder>
                                                    }
                      />
    )
}

export default  TraineeNameShimmer;

