import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import ilpex from "../utils/ilpexUI";

const data=[ {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:70},{value:50}, {value:80}, {value:90}, {value:70} ]
 const labels = ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7","Day 8","Day 9","Day 10","Day 11","Day 12","Day 13"]

const BarGraph = ()=>{
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
           <BarChart barWidth={15} data = {data} backgroundColor={ilpex.card} dashGap={0} stepHeight={40} width={200} maxValue={100} stepValue={25} rulesType="line" initialSpacing={40} scrollAnimation scrollToEnd
            barBorderRadius={20} color={ilpex.main} frontColor={ilpex.progress1}  xAxisLabelTexts={labels} spacing={30} barBorderBottomLeftRadius={0} barBorderBottomRightRadius={0} isAnimated
            yAxisTextStyle={{
                color : 'black',
            }}
           focusedBarConfig={{
                roundedTop:true,
           }}/>
           </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : 300,
        width : 330,
        backgroundColor : '#FAFAFA',
        elevation:5,
        shadowColor: '#000',
        shadowOffset:{ width: 0, height: 0 },
        alignSelf:'center',
        borderRadius:10,
        marginTop:400
    },
    head : {
        color : 'black',
        fontSize:22,
        fontFamily:ilpex.fontSemiBold,
        marginTop : 12,
        marginStart: 20,
        marginBottom:25
    },
    barChart : {
        backgroundColor:'#FAFAFA',

    }
})

export default BarGraph;