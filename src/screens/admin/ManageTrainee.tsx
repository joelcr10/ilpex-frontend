import React from "react";
import { View,Text,StyleSheet } from "react-native";

type PropsType = {traineeName:string; batchName:string; email:string; percepioMail:string;};

const ManageTraineeScreen = (props:PropsType) => {

    const {traineeName,batchName,email,percepioMail} = props;

    return(
        <View>
            <Text style={styles.title}>Trainee Name</Text>
            <Text>{traineeName}</Text>
            <Text >Batch Name</Text>
            <Text>{batchName}</Text>
            <Text style={styles.title}>Email</Text>
            <Text>{email}</Text>
            <Text style={styles.title}>Percepio Mail</Text>
            <Text>{percepioMail}</Text>
        </View>
    )



}

const styles = StyleSheet.create({

    title:{

    },
    props:{

    }
})

export default ManageTraineeScreen;