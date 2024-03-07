import React from "react";
import {StyleSheet, Text, View } from "react-native";
import { BarChart} from "react-native-gifted-charts";
import ilpex from "../utils/ilpexUI";

type BarGraphProps = {
    data : number[],        //Y axis - number thingy
    labels : string[]       //A Axis  - A1, A2, ...
} 
const BarGraph = ({data,labels} : BarGraphProps)=>{
    const chartData = Array.isArray(data) ? data.map(value => ({ value })) : [{ value: data }];
    return (
        <View style={{
            height:'100%'
        }}>
            <View style={styles.container}>
                <Text style={styles.head}>Assessment Score</Text>
                <View style={{
                    marginStart:20,
                    alignItems:'center'
                }}>
                    <BarChart 
                        isAnimated
                        barWidth={15} 
                        data = {chartData} 
                        backgroundColor={ilpex.card} 
                        dashGap={0} 
                        stepHeight={40} 
                        width={200} 
                        maxValue={100} 
                        stepValue={25} 
                        rulesType="line" 
                        initialSpacing={40} 
                        scrollAnimation 
                        scrollToEnd
                        barBorderRadius={20} 
                        color={ilpex.main} 
                        frontColor={ilpex.progress1}  
                        xAxisLabelTexts={labels} 
                        spacing={30} 
                        barBorderBottomLeftRadius={0} 
                        barBorderBottomRightRadius={0} 
                        yAxisThickness={0}
                        xAxisThickness={1}
                        yAxisTextStyle={{
                            color : 'black',
                        }}
                        focusedBarConfig={{
                            roundedTop:true,
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : 300,
        width : 330,
        backgroundColor : ilpex.card,
        elevation:5,
        shadowColor: ilpex.black,
        shadowOffset:{ width: 0, height: 0 },
        alignSelf:'center',
        borderRadius:10,
        marginBottom : 80,
    },
    head : {
        color : ilpex.black,
        fontSize:22,
        fontFamily:ilpex.fontSemiBold,
        marginTop : 12,
        marginStart: 20,
        marginBottom:25
    },
    xAxisLabel:{
        fontSize:10
    },
    barChart : {
        backgroundColor:ilpex.card,
    }
})

export default BarGraph;