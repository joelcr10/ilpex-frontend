import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useState } from "react";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { setStringItem } from "../utils/utils";
import { userLogin } from "../context/userSlice";
import Constants from '../utils/Constants';
import React from "react";
import ilpex from "../utils/ilpexUI";
import { useNavigation } from "@react-navigation/native";
import { userDetails } from "../context/userDetailsSlice";

type PropsType = {color : string};
const ThreeDots = (props : PropsType) => {

    const {color} = props;
    
    const navigation : any = useNavigation();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isLogoutBottomSheet, setLogoutBottomSheet] = useState(false);
    const dispatch = useDispatch();

    const setColor = () =>{
        if(color === 'black')
            return true;
        else
            return false;
    }

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const toggleLogoutBottomsheet = () => {
        if(isPopupVisible)
            togglePopup();
        setLogoutBottomSheet(!isLogoutBottomSheet);
    }
    
    const handleLogout = () => {
        setStringItem(Constants.IS_LOGIN, 'false');
        setStringItem(Constants.ROLE_ID, '' );
        setStringItem(Constants.TRAINEE_ID, '');
        setStringItem(Constants.USER_ID,'');
        dispatch(userDetails({
            token : '',
            user_id: '',
            role_id: '',
            trainee_id:'',
        }));
        dispatch(userLogin(false));
    }

    const profileNavigator = () => {
        console.log("ProfileNavigator");
        navigation.navigate("TraineeProfile",{});
    }

    const renderBottomSheet = () => {
        return (
            <Modal isVisible={isLogoutBottomSheet} style = {styles.modalStyle}>
                <View style={styles.logoutModal}>
                <Text style={styles.modalText}>Are you sure you want to sign out?</Text>
                    <View style = {styles.modalButtonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={toggleLogoutBottomsheet}>
                        <Text style={styles.cancelButtonStyling}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signoutButton} onPress={handleLogout}>
                        <Text style={styles.signoutButtonStyling}>Sign Out</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <View style = {styles.threeDotsContainer}>
            {setColor() ? (
                <TouchableOpacity onPress={togglePopup}>
                <Image 
                    style = {styles.threeDots}
                    source = {require('../../assets/icons/threedotsblack.png')}>
                </Image>
            </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={togglePopup}>
                <Image 
                    style = {styles.threeDots}
                    source = {require('../../assets/icons/threedots.png')}>
                </Image>
                </TouchableOpacity>
            )}
            
            {isPopupVisible && (
                <View style = {styles.popup}>           
                    <View style = {styles.popupContent}> 
                        <TouchableOpacity  style = {styles.popupcolumn} onPress={profileNavigator}>
                            <Image 
                                style = {styles.popupicons}
                                source = {require('../../assets/icons/profile.png')}></Image>
                            <Text style = {styles.columnLabel}>PROFILE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style = {styles.popupcolumn} onPress = {toggleLogoutBottomsheet}>
                            <Image 
                                style = {styles.popupicons}
                                source = {require('../../assets/icons/logout.png')}></Image>
                            <Text style = {styles.columnLabel}>LOG OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )
            }
            {isLogoutBottomSheet && (renderBottomSheet())}
        </View>
    )
}

const styles = StyleSheet.create({
    threeDotsContainer : {
        position : 'absolute',
        right : 2,
        width : 100,
        flexDirection : 'row',
        justifyContent : 'flex-end',
        flex : 1,
        height: 100,
        zIndex: 1,
    },
    threeDots : {
        width : 32,
        height : 32,
        marginTop : 30,
        marginRight : 27,
    },
    logoutCaption : {
        paddingLeft : 30,
        paddingTop : 7,
        fontFamily : ilpex.fontRegular,
        fontSize : 17,
    },
    popupicons : {
        width : 33,
        height : 33,
        marginLeft : 8,
    },
    popupContent : {
        alignContent : 'center',
    },
    popupcolumn : {
        flexDirection : 'row',
        marginBottom : 13,
    },
    columnLabel : {
        paddingTop : 3,
        paddingLeft : 10,
        color : 'black',
        fontFamily : ilpex.fontRegular,
        fontSize : 17,
    },
    popup : {
        position : 'absolute',
        width : 160,
        height : 112,
        top : 70,
        right : 30,
        backgroundColor : 'white',
        borderRadius : 15,
        padding : 15,
        zIndex: 10
    },
    modalText:{
        fontSize:20,
        textAlign:'center',
        color:'black',
        padding:20,
        fontFamily : ilpex.fontRegular
    },
    container:{
        backgroundColor:'#87BBE0',
        borderRadius:10,
        justifyContent:'center',
        margin:0,
        marginTop:300,
    },
    signoutButton:{
        width : 150,
        height : 50,
        padding : 10,
        backgroundColor:'#8518FF',
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 20,
        borderRadius:5,
    },
    cancelButton : {
        width : 150,
        height : 50,
        padding : 10,
        backgroundColor:'#f0f4fa',
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 20,
        borderRadius:5,
        color : 'black',
    },
    buttonContainer : {
      flex : 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalStyle : {
        width : '100%',
        flex : 1, 
        justifyContent : 'flex-end',
        margin:0
    },
    logoutModal:{
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
    signoutButtonStyling : {
        fontSize:20,
        color:'white',
        textAlign:'center'
    }
})

export default ThreeDots;