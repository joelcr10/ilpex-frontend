import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import ilpex from '../utils/ilpexUI';


  type DropdownProps = {
    data: { label: string; value: string }[];
  };

  const DropdownComponent = ({ data } : DropdownProps) => {
    const [value, setValue] = useState<any>([]);
    const [isFocus, setIsFocus] = useState(false);
    return (
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: ilpex.darkGrey }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'select Batch' : ''}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
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
      alignSelf:'center'
    },
    icon: {
      marginRight: 5,
      height:20
    },
    // label: {
    //   position: 'absolute',
    //   backgroundColor: 'white',
    //   left: 22,
    //   top: 8,
    //   zIndex: 999,
    //   paddingHorizontal: 8,
    //   fontSize: 14,
    // },
    placeholderStyle: {
      fontSize: 20,
      fontFamily:ilpex.fontRegular
    },
    selectedTextStyle: {
        fontSize: 20,
        fontFamily:ilpex.fontRegular
    },
    iconStyle: {
      width: 25,
      height: 25,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 15,
      fontFamily:ilpex.fontRegular
    },
  });