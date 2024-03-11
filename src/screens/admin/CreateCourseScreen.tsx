import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import Modal from "react-native-modal";
import ilpex from "../../utils/ilpexUI";
import DocumentPicker from 'react-native-document-picker';
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import { createBatch } from "./CreateBatchHook";
import FileUploadField from "../../components/FileUploadField";
import Button from "../../components/Button";
import DisabledBigButton from "../../components/DisabledBigButton";
import BackButton from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";

const CreateCourseScreen = () => {

    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [buttonLoaded, setButtonLoaded] = useState(false);

    const today = new Date();
    const januaryFirst = new Date(today.getFullYear(), 0, 1);
    const nextYear = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());

    const navigation = useNavigation();

    console.log("hi");
    const handleClose=()=>{
        setModalIsVisible(false);
    }

    const handleDateSelector = () => {
        setModalIsVisible(!modalIsVisible);
    }

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
            });
            setSelectedFile(result);
            console.log("selectedFile is ", selectedFile);
            } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                console.error('Error picking document', err);
            }
        }
    };

    const handleFileUpload = async() => {
        try 
        {
            setButtonLoaded(true);
            const user_id = await getItem(Constants.USER_ID);
            console.log('user_id', user_id)
            const formData = new FormData();
            formData.append('createdBy', user_id?.toString());
            formData.append('file', selectedFile);

            const {success, statusCode, errorMessage} = await createBatch(formData);
            if(success)
            {
                setButtonLoaded(false);
                setSuccess(true);
            }
            console.log("Success - ", success);
            console.log("statusCode - ", statusCode);
            console.log("Error Message - ", errorMessage);
        } catch(error) 
        {
            console.log("Error : ", error);
        }
    }

    const renderBottomSheet = () => {
        return (
            <Modal isVisible={success} style = {styles.modalStyle}>
                <View style={styles.confirmationModal}>
                <Text style={styles.modalText}>Batch Has Been Created Successfully!</Text>
                    <View style = {styles.modalButtonContainer}>
                    <TouchableOpacity style={styles.okayButton} onPress={toggleLogoutBottomsheet}>
                        <Text style={styles.okayButtonStyling}>Okay</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    const toggleLogoutBottomsheet = () => {
        navigation.goBack();
    }

    return(
        <View style = {styles.pageContainer}>
            <BackButton color = "black"/>
            <TopBlackHeading 
                heading={"Create Course"} 
            />
            <View style = {styles.fileUploadContainer}>
                <FileUploadField onSelect={pickDocument} selectedFile={selectedFile}/>
            </View>
            {(selectedFile === null)? (
                <DisabledBigButton name="Create Batch"/>
            ) : (
                <Button name="Create Batch" onPress={handleFileUpload} buttonPressed={buttonLoaded} />
            )
            }
            {success && renderBottomSheet()}
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : 1000,
    },
    fileUploadContainer : {
        paddingTop : 40
    },
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
        // padding:20,
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

export default CreateCourseScreen;