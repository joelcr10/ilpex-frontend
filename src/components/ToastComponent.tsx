import { useEffect } from 'react';
import Toast from 'react-native-root-toast';

const ToastDemo = ({ BgColor,message,textColor }: { BgColor: string ,message:string,textColor:string}) => {
  useEffect(() => {
    const showToast = () => {
      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: BgColor,
        textColor:textColor,
        hideOnPress: true,
        shadow: true,
        animation: true,
        delay: 0,
        opacity:1,
        shadowColor:'black'
      });
    };

    showToast();
  }, [BgColor]);

  return null;
};

export default ToastDemo;
