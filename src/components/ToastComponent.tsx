import { useEffect } from 'react';
import Toast from 'react-native-root-toast';

const ToastDemo = ({ BgColor,message,textColor }: { BgColor: string ,message:string,textColor:string}) => {
  useEffect(() => {
    const showToast = () => {
      Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: BgColor,
        textColor:textColor,
        hideOnPress: true,
        shadow: true,
        animation: true,
        delay: 0,
        opacity:0.5,
        shadowColor:'black'
      });
    };

    showToast();
  }, [BgColor]);

  return null;
};

export default ToastDemo;
