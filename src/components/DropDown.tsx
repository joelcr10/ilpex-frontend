import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import ilpex from '../utils/ilpexUI';


  type DropdownProps = {
    placeholder : string,data: { label: string; value: string }[],setBatch : (batch_name : string) =>void,
  };

  const DropdownComponent = ({ placeholder,data,setBatch } : DropdownProps) => {
    const [value, setValue] = useState<any>([]);
    const [isFocus, setIsFocus] = useState(false);
    return (
      <View style={styles.container}>
        <Dropdown testID='dropdown'
          style={[styles.dropdown,{ borderColor: ilpex.darkGrey }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          itemTextStyle={{color:ilpex.black}}
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setBatch(item.value);
          }}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    dropdown: {
      backgroundColor:ilpex.white,
      height: 50,
      borderColor: ilpex.darkGrey,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      width : 300,
      alignSelf:'center',
    },
    icon: {
      marginRight: 5,
      height:20
    },
    placeholderStyle: {
      fontSize: 18,
      fontFamily:ilpex.fontRegular,
      color : 'gray'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily:ilpex.fontRegular,
        color : 'black'
    },
    iconStyle: {
      width: 25,
      height: 25,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 15,
      fontFamily:ilpex.fontRegular,
    },
  });