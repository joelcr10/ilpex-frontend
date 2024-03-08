import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import TraineeCard from "../../components/TraineeCard";
import TraineeCardShimmer from "../../components/loading/TraineeCardShimmer";

const TraineeScreen = () => {

    const [isLoading, setLoading] = useState(true);     //To the Page designer, set it to false for proper working
    
    // Replace the below data part with API call
    const data = [
        {
            id : '1',
            traineeName : 'Joel C Raju',
            batchName : 'ILP 2023-24 B2'
        },
        {
            id : '2',
            traineeName : 'Nigin N Manayil',
            batchName : 'ILP 2023-24 B2'
        },
        {
            id : '3',
            traineeName : 'Thimna Raphel',
            batchName : 'ILP 2023-24 B2'
        },
        {
            id : '4',
            traineeName : 'Elena Maria Varghese',
            batchName : 'ILP 2023-24 B2'
        },
        {
            id : '5',
            traineeName : 'Sreejaya V S',
            batchName : 'ILP 2023-24 B2'
        },
        {
            id : '6',
            traineeName : 'Ashik George',
            batchName : 'ILP 2023-24 B2'
        },
        {
            id : '5',
            traineeName : 'Nebil V',
            batchName : 'ILP 2023-24 B2'
        },
    ]

    return (
        <ScrollView>
            <View style = {styles.pageContainer}>
                    {/* Below container is the main container for all the cards. Try not to modify. Adjust Margin Top to change the distance between the white part and the purple part. Remove this comment when designing the page.*/}
                    <View style = {styles.innerContainer}>
                    {!isLoading ? (
                        <TraineeCardShimmer/>
                        ) : (
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) => (
                            <TraineeCard
                            traineeName={item.traineeName}
                            batchName={item.batchName}
                            />
                        )}
                        keyExtractor={item => item.id}
                        />
                    )}            
                    </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : '#8518FF',
        height : '100%',
    },
    innerContainer : {
        backgroundColor : 'white',
        height : '100%',
        marginTop : '15%',
        borderTopStartRadius : 50,
        borderTopEndRadius : 50,
        paddingTop : '10%',
        paddingLeft : '10%',
        paddingRight : '10%',
    },
    containerHeading : {
        color : 'white',
        textAlign : 'center',
        fontSize : 50,
        marginTop : 80,
        fontFamily : 'Poppins-SemiBold',
    },
    shimmer:{
        height : 90,
        borderRadius : 17,
        width: 350,
        marginBottom : 25,
        elevation : 4,
    },
})


export default TraineeScreen;