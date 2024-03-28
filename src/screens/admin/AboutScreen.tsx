import { StyleSheet, Text, View } from "react-native";
import BackButton from "../../components/BackButton";
import ilpex from "../../utils/ilpexUI";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";


const AboutScreen=()=>{

    const desc="The Application focuses on Tracking the ILP trainees' activities based on their courses completed, and assessments conducted. The tracking tool aims to generate a dashboard for L&D team to understand the Batch activities and progress during the E-Learning phase. The mobile application will help analyze the performance of the trainees individually and as a batch. The trainees can also view their progress along with day-wise courses assigned to them. Also, learning admin can create new Batches, create new users and assign roles to the Users."
    const version='1.0.0'
    const email='nodeninjas@experionglobal.com'
    const phoneno='+91-0000000000'
    return( 
        
        <View>
            <BackButton color={"black"}/>
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>ILPex</Text>
                <Text style={styles.subtitle}>Initial Learning Program Tracking Tool</Text>
                <Text style={styles.version}>Version {version}</Text>
                <Text style={styles.desc}>{desc}</Text>

                <Text style={styles.subtitle}>Contacts</Text>

                <View style={styles.contacts}>
                    <Icon name='mail' style={styles.icon}/>
                    <Text style={styles.contactsText}>{email}</Text>
                </View>
                <View style={styles.contacts}>
                    <Icon name='call' style={styles.icon}/>
                    <Text style={styles.contactsText}>{phoneno}</Text>
                </View>
            </View>
            </ScrollView>
        </View>
      )  
        
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:'10%',
        marginStart:'15%',
        marginTop:'15%',
        justifyContent:'space-between',
        flexDirection:'column',
    },
    title:{
        fontFamily:ilpex.fontSemiBold,
        fontSize:64,
        color:ilpex.main,
    },
    subtitle:{
        fontFamily:ilpex.fontSemiBold,
        fontSize:16,
        color:ilpex.darkGrey,
    },
    desc:{
        marginVertical:'5%',
        fontFamily:ilpex.fontRegular,
        fontSize:16,
        color:ilpex.darkGrey,
        textAlign:'justify',
    },
    version:{
        fontFamily:ilpex.fontMedium,
        fontSize:16,
        color:ilpex.darkGrey,
    },
    icon:{
        fontSize:30,
        margin:'4%',
        color:ilpex.main
    },
    contacts:{
        flexDirection:'row',
        marginStart:'2%',
    },
    contactsText:{
        fontFamily:ilpex.fontSemiBold,
        color:ilpex.darkGrey,
        fontSize:16,
        textAlignVertical:'center',
    }
})
export default AboutScreen;
