import React, { useState } from "react";
import {StyleSheet, Text, View } from "react-native";
import { BarChart} from "react-native-gifted-charts";
import ilpex from "../utils/ilpexUI";

type BarGraphProps = {
    data : number[],       
    labels : string[],
    names : string[],
    graphname : string       
} 
const BarGraph = ({data,labels,names,graphname} : BarGraphProps)=>{
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipData, setTooltipData] = useState<any>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const chartData = Array.isArray(data) ? data.map(value => ({ value })) : [{ value: data }];
    const handleBarPress = ( index : number,value: number) => {
        const name = names[value]; // Get the name corresponding to the pressed bar
        setTooltipData(name);
        // if(value>4){
        //     value = 1
        // }
        // let i = value * 40;
        setTooltipPosition({ x: 180, y: 50});
        setTooltipVisible(true);
        console.log(name);
        console.log("value----------------------------",value);
        console.log("dtaa------------------------------------",data);
        console.log("chartData-------------------------------------",chartData)
        console.log("data[value]-----------------------------------------",data[value])
    };

    const handleTooltipClose = () => {
        setTooltipVisible(false);
    };

    const topLabels = chartData.map((barData, index) => barData.value.toString()); // Extracting values as top labels

    return (
        <View style={{ height: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.head} onPress={handleTooltipClose}>{graphname}</Text>
                <View style={{ marginStart: 10, alignItems: 'center' ,marginTop:15}}>
                    <BarChart
                        animationDuration={1000}
                        isAnimated
                        barWidth={15}
                        data={chartData} 
                        backgroundColor={ilpex.white}
                        dashGap={0}
                        stepHeight={40}
                        width={250}
                        maxValue={100}
                        stepValue={20}
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
                        yAxisTextStyle={{ color: 'black' }}
                        intactTopLabel
                        focusedBarConfig={{ roundedTop: true }}
                        onPress={(index: number, value: number) => handleBarPress(index, value)}
                    />
                </View>
            </View>
            {tooltipVisible && (
                <View style={[styles.tooltipContainer, { left: tooltipPosition.x, top: tooltipPosition.y }]}>
                    {/* <Text style={styles.closeButton} onPress={handleTooltipClose}>x</Text> */}
                    <Text style={styles.tooltipText}>{tooltipData}</Text>
                    {/* <Text style={styles.tooltipText}>{tooltipData?.label}</Text> */}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 360,
        width: 360,
        backgroundColor: ilpex.white,
        shadowColor: ilpex.black,
        shadowOffset: { width: 0, height: 0 },
        alignSelf: 'center',
        borderRadius: 10,
    },
    head: {
        color: ilpex.black,
        fontSize: 21,
        fontFamily: ilpex.fontSemiBold,
        marginBottom: 30,
        marginLeft : '5%'
    },
    tooltipContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center',
        alignSelf:'center',
        borderRadius: 5,
        borderWidth: 1,
        height: 30,
        marginBottom:10,
        borderColor: 'gray',
        zIndex: 10, //// Ensure tooltip appears above the chart
    },
    tooltipText: {
        color: 'black',
        padding: 3,
        fontFamily:ilpex.fontRegular
    },
    closeButton: {
        padding: 3,
        marginTop:-5,
        color: 'blue',
        alignSelf: 'flex-end',
    },
});

export default BarGraph;