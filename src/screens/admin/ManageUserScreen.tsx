import React, { useMemo, useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import TopBlackHeading from "../../components/TopBlackHeading";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";



const ManageUserScreen = ()=> {

    const [userName, setUserName]= useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [buttonpressed, setButtonpressed] = useState(false);


    const handlemanageUser = ()=>{
        setButtonpressed(true)
            console.log("user managed");
    }


    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', 
            label: 'Trainee',
            value: 'option1'
        },
        {
            id: '2',
            label: 'L&D',
            value: 'option2'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState<string | undefined>();

    return(
        <View>
            <TopBlackHeading heading={"Manage User"}/>
            <InputField 
                label={"User Name"} 
                isPassword={false} 
                value={userName} 
                onChangeText={setUserName}
            />
            <InputField 
                label={"Email"} 
                isPassword={false} 
                value={email} 
                onChangeText={setEmail}
            />
            <InputField 
                label={"Password"} 
                isPassword={true} 
                value={password} 
                onChangeText={setPassword}
            />
            <InputField 
                label={"Confirm Password"} 
                isPassword={true} 
                value={confirmPassword} 
                onChangeText={setConfirmPassword}
            />

            <RadioGroup 
                containerStyle={{marginLeft:40, display:"flex", alignItems:"flex-start"}}
                radioButtons={radioButtons} 
                onPress={setSelectedId}
                labelStyle={{marginTop:10,}}
                selectedId={selectedId}
            />            

            <Button 
                name="Save Changes" 
                onPress={handlemanageUser}
                buttonPressed={buttonpressed}
            />
        </View>
    )

}

const styles = StyleSheet.create({

});

export default ManageUserScreen;