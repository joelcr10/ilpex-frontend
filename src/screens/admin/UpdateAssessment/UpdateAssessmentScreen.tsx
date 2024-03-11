import { StyleSheet, Text, View } from "react-native"
import React from "react"
import BackButton from "../../../components/BackButton"
import DropdownComponent from "../../../components/DropDown"
import DateSelector from "../../../components/DateSelector"
import CalenderModal from "../../../components/CalenderModal"
import Button from "../../../components/Button"
import ilpex from "../../../utils/ilpexUI"
import { useNavigation, useRoute } from "@react-navigation/native"

const UpdateAssessmentScreen=()=>{
    const navigation = useNavigation();
    const route:any = useRoute();
    const assessment_id = route.params.assessment_id;
    const assessment_name = route.params.assessment_name;
    const batch_name = route.params.batch_name;
    const assessment_start_date = route.params.start_date;
    const assessment_end_date = route.params.end_date;
    return (
        <View style={styles.container}>
            <BackButton color={"white"}></BackButton>
                <Text style={styles.text}>Create Assessment</Text>
                <View style={styles.box}>
                    <View style={styles.dataContainer}>
                        <View style={{
                            margin:'3%'
                        }}>
                         <DropdownComponent placeholder={batch_name} data={allBatchesName} setBatch={setBatch}></DropdownComponent>
                         </View>
                         <View style= {styles.dateSelector}>
                            <DateSelector startDate={start} endDate={endDate} onPress={handleOpen}></DateSelector>
                        </View>
                        <CalenderModal minDate={start_date} maxDate={end_date} isVisible={isVisible}  setStartDate={setStartDate} setEndDate={setEndDate} closeModal={handleClose}></CalenderModal>
                        <View style={styles.button}>
                            <Button name={'Send'} onPress={createAssessment} buttonPressed={false}></Button>
                        </View>
                        <Text></Text>
                    </View>
                </View>
        </View>
     )
}

const styles = StyleSheet.create ({
    container : {
        backgroundColor:ilpex.main,
        height : '100%',
    },
    text:{
        textAlign:'center',
        fontSize:30,
        color: "white",
        marginTop:'17%',
        fontFamily: ilpex.fontSemiBold
    },
    box :{
        backgroundColor:"white",
        height : "100%",
        marginTop: '5%',
        borderTopEndRadius : 30,
        borderTopStartRadius : 30,
    },
    dataContainer : {
        margin : '0.5%',
    },
    modalContainer : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:22
    },
    modalView : {
        margin : 20,
        backgroundColor:ilpex.white,
        borderRadius : 20,
        width : '90%',
        padding : 25,
        alignItems : 'center',
        shadowColor : ilpex.black,
        shadowOffset:{
            width : 0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius : 4,
        elevation : 5
    },
    startDate : {
        width : 200,
        height:100
    },
    dateSelector : {
        marginTop : '-5%'
    },
    button : {
        marginTop : '30%'
    },
    errorText: {
        color: ilpex.failure,
        fontSize: 14,
        marginTop: 5,
        textAlign:'center'
      },    
})

export default UpdateAssessmentScreen;