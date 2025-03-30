import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "user_token"; // ✅ ใช้คีย์เดียวกันตลอด

// 🔐 เก็บ Token
export const saveToken = async (token: string) => {
  if (!token) {
    console.error("Cannot save empty or undefined token");
    return; // Exit early if token is not valid
  }
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log(`Token saved with key: ${TOKEN_KEY}`);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// 🔍 ดึง Token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// 🗑️ ลบ Token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log(`Token removed with key: ${TOKEN_KEY}`);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
