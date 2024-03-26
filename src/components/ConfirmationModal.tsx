import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import ilpex from "../utils/ilpexUI";

type PropsType = {
    success : boolean,
    message : string,
    onPress() : void
}
const ConfirmationModal = (props : PropsType) => {
    
    const navigation = useNavigation();
    let {success, message, onPress} = props;
    const [successTest, setSuccessTest] = useState(success);

    const toggleBottomSheet = () => {
        setSuccessTest(!success);
        onPress();
        navigation.goBack();
    }

    return (
        <Modal isVisible={successTest} style = {styles.modalStyle}>
            <View style={styles.confirmationModal}>
            <Text style={styles.modalText}>{message}</Text>
                <View style = {styles.modalButtonContainer}>
                <TouchableOpacity style={styles.okayButton} onPress={toggleBottomSheet}>
                    <Text style={styles.okayButtonStyling}>Okay</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    confirmationModal:{
        height:150,
        borderColor:'black',
        backgroundColor:'white',
    },
    modalButtonContainer : {
        flexDirection : 'row',
        justifyContent : 'center'
    },
    cancelButtonStyling : {
        fontSize:20,
        color:'black',
        textAlign:'center'
    },
    okayButtonStyling : {
        fontSize:20,
        color:'white',
        textAlign:'center'
    },
    modalStyle : {
        width : '100%',
        flex : 1, 
        justifyContent : 'flex-end',
        margin:0
    },
    modalText:{
        fontSize:20,
        textAlign:'center',
        color:'black',
        paddingTop : 25,
        paddingLeft : 10,
        paddingBottom : 10,
        paddingRight : 10,
        fontFamily : ilpex.fontRegular
    },
    okayButton:{
        width : 150,
        height : 50,
        padding : 10,
        backgroundColor:'#8518FF',
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 20,
        borderRadius:5,
    },
})

export default ConfirmationModal;