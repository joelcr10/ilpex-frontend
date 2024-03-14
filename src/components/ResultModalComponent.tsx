// ModalComponent.tsx
import React from 'react';
import { Modal, View, Text } from 'react-native';
import ilpex from '../utils/ilpexUI';
import Button from './Button';
import CircularProgress from './CircularProgress';

interface ModalProps {
  isVisible: boolean;
  closeModal: () => void;
  score: number;
  setMessageVisible: (visible: boolean) => void; // New prop
}

const ModalComponent: React.FC<ModalProps> = ({
  isVisible,
  closeModal,
  score,
  setMessageVisible,
}) => {
  const renderMessage = () => {
    if (score > 60) {
      return (
        <>
          <Text style={{ color: ilpex.darkGrey,fontFamily:ilpex.fontMedium,fontSize:20, textAlign: 'center' }}>
            Congratulations!!!!
          </Text>
          <View style={{justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
            <CircularProgress color={`${ilpex.success}`} completeStatus={score} />
          </View>
        </>
      );
    } else {
      return (
        <View>
          <Text style={{ color: ilpex.darkGrey,fontFamily:ilpex.fontMedium,fontSize:20,  textAlign: 'center' }}>
            Retake the test.{"\n"}
          </Text>
          <View style={{ justifyContent:'center',alignContent:'center',alignItems:'center' }}>
            <CircularProgress color={`${ilpex.failure}`} completeStatus={score} />
          </View>
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
