import { StyleSheet, Text, View } from "react-native";
import BackButton from "../../components/BackButton";
import ilpex from "../../utils/ilpexUI";
import Icon from "react-native-vector-icons/MaterialIcons";


const AboutScreen=()=>{

    const desc="Empower your learning journey with our innovative tracking tool designed to support individuals embarking on initial learning programs. Our app provides a comprehensive platform to monitor and manage progress throughout your learning process. Easily track completed modules, set personalized goals, and stay motivated with insightful progress metrics. Whether you're diving into a new language, mastering a skill, or pursuing professional development, our app is your trusted companion for success. Start your learning journey today with our intuitive tracking tool."
    const version='1.0.0'
    const email='nodeninjas@experionglobal.com'
    const phoneno='+91-0000000000'
    return( 
        <View>
            <BackButton color={"black"}/>
            
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
        </View>
      )  
        
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:'10%',
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