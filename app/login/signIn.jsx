import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Colors from "../../constant/Colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/FireBaseConfig";
import { useRouter } from "expo-router";
import { setLocalStorage } from "../../service/Storage";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("Login successful", user);
        await setLocalStorage("userDetail", user);
        router.replace("/(tabs)");
      })
      .catch((error) => {
        const errorMessage =
          error.code === "auth/wrong-password"
            ? "Incorrect email or password"
            : error.message;
        Alert.alert("Login Failed", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <TextInput
        placeholder="Email"
        style={styles.textInput}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={{ color: "white" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 25 },
  textHeader: { fontSize: 28, fontWeight: "bold", marginVertical: 15 },
  subText: { fontSize: 16, marginBottom: 15 },
  textInput: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
  },
  button: { backgroundColor: Colors.PRIMARY, padding: 15, borderRadius: 10 },
});

export default SignIn;
