import React, { useEffect} from 'react';
import 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { Image} from 'react-native';
import ilpex from '../utils/ilpexUI';
import TraineeProfileScreen from '../screens/trainee/TraineeProfileScreen';
import BottomTabNavigation from "./BottomTabNavigation";
import CreateBatchScreen from '../screens/admin/CreateBatch/CreateBatchScreen';
import CreateCourseScreen from '../screens/admin/CreateCourse/CreateCourseScreen';
import CreateAssessmentScreen from '../screens/admin/CreateAssessment/CreateAssessmentScreen';
import CreateUserScreen from '../screens/admin/CreateUserScreen';
import { setStringItem } from '../utils/utils';
import Constants from "../utils/Constants";
import { userDetails } from "../context/userDetailsSlice";
import { userLogin } from "../context/userSlice";
import { useDispatch, useSelector } from "react-redux";
import UserManagementScreen from '../screens/admin/UserManagementScreen';
import AboutScreen from '../screens/admin/AboutScreen';

const CustomDrawerContent : any = (props : any) => {

    const user_name = useSelector((state: any) => state.userDetailsReducer.user_name);
 
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Text style={styles.caption}>{user_name}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

const DrawerNavigation = () => {

    const Drawer = createDrawerNavigator();
    const dispatch = useDispatch();

    const handleLogout = () => {
        setStringItem(Constants.IS_LOGIN, 'false');
        setStringItem(Constants.ROLE_ID, '' );
        setStringItem(Constants.TRAINEE_ID, '');
        setStringItem(Constants.USER_ID,'');
        dispatch(userDetails({
            token: '',
            user_id: '',
            role_id: '',
            trainee_id: '',
            user_name: ''
        }));
        dispatch(userLogin(false));
    }

    return (
        <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
        headerShown: false,
        drawerActiveTintColor : ilpex.main,
        drawerStyle: {
          backgroundColor: ilpex.white,
          width: 250,
          borderTopRightRadius : 15,
          borderBottomRightRadius : 15,
        },
        drawerLabelStyle: {
            fontFamily : ilpex.fontMedium,
            fontSize : 13,
            color : '#464242'
        }
      }}>
            <Drawer.Screen 
                name="Home" 
                component={BottomTabNavigation} 
                options={{
                    title: 'Home',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image style = {styles.iconStyling}
                            source={require('../../assets/icons/home.png')}/>
                        </View>
                    ),
                 }}
            />

            <Drawer.Screen 
                name="Profile" 
                component={TraineeProfileScreen} 
                options={{
                    title: 'Profile',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            source={require('../../assets/icons/user_circle.png')}/>
                        </View>
                    ),
                 }}
            />

            {/* <Drawer.Screen 
                name="Settings" 
                component={BottomTabNavigation} 
                options={{
                    title: 'Settings',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            source={require('../../assets/icons/settings.png')}/>
                        </View>
                    ),
                 }}
            /> */}

            <Drawer.Screen 
                name="Create Admin" 
                component={CreateUserScreen} 
                options={{
                    title: 'Create Admin',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            source={require('../../assets/icons/create_user.png')}/>
                        </View>
                    ),
                 }}
            />

            <Drawer.Screen 
                name="Manage User" 
                component={UserManagementScreen} 
                options={{
                    title: 'Manage User',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            style = {styles.iconStyling}
                            source={require('../../assets/icons/manage_user.png')}/>
                        </View>
                    ),
                 }}
            />
            
            <Drawer.Screen 
                name="Create Batch" 
                component={CreateBatchScreen} 
                options={{
                    title: 'Create Batch',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            source={require('../../assets/icons/create_batch.png')}/>
                        </View>
                    ),
                 }}
            />

            <Drawer.Screen 
                name="Create Course" 
                component={CreateCourseScreen} 
                options={{
                    title: 'Create Course',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            style = {styles.iconStyling}
                            source={require('../../assets/icons/course.png')}/>
                        </View>
                    ),
                 }}
            />

            <Drawer.Screen 
                name="Create Assessment" 
                component={CreateAssessmentScreen} 
                options={{
                    title: 'Create Assessment',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            source={require('../../assets/icons/create_assessment.png')}/>
                        </View>
                    ),
                 }}
            />
            <Drawer.Screen 
                name="About Screen" 
                component={AboutScreen} 
                options={{
                    title: 'About',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            source={require('../../assets/icons/aboutIcon.png')}/>
                        </View>
                    ),
                 }}
            />
            
            <Drawer.Screen 
                name="Log out" 
                component={() => {
                    useEffect(() => {
                        handleLogout();
                    }, []);
                    return null;
                 }}
                options={{
                    title: 'Log out',
                    drawerIcon: ({ focused, size }) => (
                        <View style={styles.iconContainer}>
                            <Image source={require('../../assets/icons/sign_out.png')} />
                        </View>
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerHeader: {
      height: 80,
      marginLeft : '10%',
      marginRight : '10%',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderTopRightRadius : 30,
      borderBottomColor: '#464242',
    },
    caption: {
      fontSize: 22,
      fontFamily : ilpex.fontSemiBold,
      color : 'black',
    },
    iconContainer : {
        width : 20,
    },
    iconStyling : {
        width : 30,
        height : 30,
        marginLeft : '7%'
    }
  });

  
export default DrawerNavigation;