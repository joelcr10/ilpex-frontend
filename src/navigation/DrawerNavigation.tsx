import React from 'react';
import 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { Image, ImageProps } from 'react-native';
import ilpex from '../utils/ilpexUI';
import TraineeProfileScreen from '../screens/trainee/TraineeProfileScreen';
import BottomTabNavigation from "./BottomTabNavigation";
import CreateBatchScreen from '../screens/admin/CreateBatchScreen';
import CreateCourseScreen from '../screens/admin/CreateCourseScreen';

import CreateAssessmentScreen from '../screens/admin/CreateAssessment/CreateAssessmentScreen';
const Drawer = createDrawerNavigator();

const CustomDrawerContent : any = (props : any) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Text style={styles.caption}>Jordan S Ben</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
        headerShown: false,
        drawerActiveTintColor : ilpex.main,
        drawerStyle: {
          backgroundColor: ilpex.white,
          width: 280,
          borderTopRightRadius : 15,
          borderBottomRightRadius : 15,
        },
        drawerLabelStyle: {
            fontFamily : ilpex.fontMedium,
            fontSize : 16,
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
                            source={require('../../assets/icons/home_coloured.png')}/>
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

            <Drawer.Screen 
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
            />

            <Drawer.Screen 
                name="Create User" 
                component={BottomTabNavigation} 
                options={{
                    title: 'Create User',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            source={require('../../assets/icons/create_user.png')}/>
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
                name="Log out" 
                component={TraineeProfileScreen} 
                options={{
                    title: 'Log out',
                    drawerIcon: ({focused, size}) => (
                        <View style = {styles.iconContainer}>
                            <Image
                            source={require('../../assets/icons/sign_out.png')}/>
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
      borderBottomColor: '#ccc',
    },
    caption: {
      fontSize: 24,
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