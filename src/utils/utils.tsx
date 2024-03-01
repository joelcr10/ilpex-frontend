import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(value);
    return value;
  } catch (e) {
    // read error
    return '';
  }

}

export async function setStringItem(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // read error
    return false;
  }
  
}
