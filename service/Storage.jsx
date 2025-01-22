import AsyncStorage from "@react-native-async-storage/async-storage";
//setting local storage - npx expo install  @react-native-async-storage/async-storage
export const setLocalStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = async (key) => {
  const result = await AsyncStorage.getItem(key);
  if (result !== null) {
    return JSON.parse(result);
  }
};

export const removeLocalStorage = async (key) => {
  await AsyncStorage.clear();
  return;
};
