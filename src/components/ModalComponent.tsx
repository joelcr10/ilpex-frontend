// ModalComponent.tsx
import React from 'react';
import { Modal, View, Text } from 'react-native';
import ilpex from '../utils/ilpexUI';
import Button from './Button';

interface ModalProps {
  isVisible: boolean;
  closeModal: () => void;
  successText: string;
  failureText: string;
  setMessageVisible: (visible: boolean) => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  isVisible,
  closeModal,
  successText,
  failureText,
  setMessageVisible,
}) => {
  const renderMessage = () => {
    if (successText) {
      return (
        <>
          <Text style={{ color: ilpex.darkGrey,fontFamily:ilpex.fontMedium,fontSize:20, textAlign: 'center' }}>
            {successText}
          </Text>
          
        </>
      );
    } else {
      return (
        <View>
          <Text style={{ color: ilpex.darkGrey,fontFamily:ilpex.fontMedium,fontSize:20,  textAlign: 'center' }}>
            {failureText}
          </Text>
        </View>
        
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        closeModal();
        setMessageVisible(false); // Hide the message when closing the modal
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , }}>
        <View
          style={{
            backgroundColor: ilpex.white,
            padding: 20,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          {renderMessage()}
          <Button name="Close" onPress={closeModal} buttonPressed={false} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
