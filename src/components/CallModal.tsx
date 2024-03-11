import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ModalComponent from './ResultModalComponent';
import Button from './Button';

const CallModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Button name={'Show Modal'} 
       buttonPressed={false}
       onPress={showModal} />

      <ModalComponent
        isVisible={isModalVisible}
        closeModal={hideModal}
        score={50} // You can replace this with your actual score value
        setMessageVisible={setModalVisible}
      />
    </View>
  );
};

export default CallModal;
