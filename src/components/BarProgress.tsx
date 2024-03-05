import { StyleSheet, Text, View } from 'react-native';
import { Bar } from 'react-native-progress';
import ilpex from '../utils/ilpexUI';

type propsType = {progress: number, total: number}

const BarProgress = (props: propsType) => {
    const {progress, total} = props;

    return ( 
        <View style={styles.barProgressContainer}>
            <Bar progress={progress/total} width={300} height={12} unfilledColor={ilpex.lightGrey} color='#33DB76' borderWidth={0}/>
            <Text style={styles.progressText}>{progress} / {total}</Text>
        </View>
     );
}

const styles = StyleSheet.create({
    barProgressContainer:{
        marginBottom: 20,
        display: 'flex' , 
        flexDirection: 'column',
        justifyContent:'center', 
        alignItems: 'center',
        margin: 'auto',
    },

    progressText:{
        fontWeight: 'bold',
        fontSize: 20
    }
})
 
export default BarProgress;