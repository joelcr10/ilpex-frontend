import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import TopBlackHeading from "../../../components/TopBlackHeading";
import ilpex from "../../../utils/ilpexUI";
import DocumentPicker from 'react-native-document-picker';
import { getItem } from "../../../utils/utils";
import Constants from "../../../utils/Constants";
import { createCourse } from "./CreateCourseHook";
import FileUploadField from "../../../components/FileUploadField";
import Button from "../../../components/Button";
import DisabledBigButton from "../../../components/DisabledBigButton";
import BackButton from "../../../components/BackButton";
import ToastDemo from "../../../components/ToastComponent";
import ConfirmationModal from "../../../components/ConfirmationModal";

const CreateCourseScreen = () => {

    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [success, setSuccess] = useState(false);
    const [buttonLoaded, setButtonLoaded] = useState(false);
    const [failure, setFailure] = useState(false);

    const inititalState = () => {
        setSelectedFile(null);
        setSuccess(false);
        setButtonLoaded(false);
        setFailure(false);
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

            const {success, statusCode, errorMessage} = await createCourse(formData);
            if(success)
            {
                setButtonLoaded(false);
                setSuccess(true);
                console.log("statusCode - ", statusCode);
                console.log("Success - ", success);
                setSelectedFile(null);
            }
            else
            {
                setButtonLoaded(false);
                setFailure(true);
                console.log("statusCode - ", statusCode);
                console.log("Error Message - ", errorMessage);
            }
        } catch(error) 
        {
            console.log("Error : ", error);
        }
    }

    const handleReset = (): void => {
        inititalState();
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
           <View style ={{alignItems : 'center'}}>
           {(selectedFile === null)? (
                <DisabledBigButton name="Create Course"/>
            ) : (
                <Button name="Create Course" onPress={handleFileUpload} buttonPressed={buttonLoaded} />
            )
            }
           </View>
            {success && <ConfirmationModal success = {success} onPress = {handleReset} message = "Course has been created Successfully!" />}
            {failure && <ToastDemo BgColor="red" message="Failed To create Course" textColor="white"/>}
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : 1000,
    },
    fileUploadContainer : {
        paddingTop : 40,
        alignItems : 'center'
    }
})

export default CreateCourseScreen;