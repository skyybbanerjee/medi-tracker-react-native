import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import { auth } from "../../config/FireBaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "expo-router";
import { setLocalStorage } from "../../service/Storage";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [userName, setUserName] = React.useState();

  const OnCreateAccount = () => {
    if (!email || !password || !userName) {
      Alert.alert("Warning", "Please fill all fields ⚠️");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: userName,
        });
        await setLocalStorage("userDetail", user);
        router.push("(tabs)");
        console.log("User created:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", error);

        if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Warning", "Email already in use ⚠️");
        } else {
          Alert.alert("Error", "Error creating account");
        }
      });
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Create New Account</Text>
      <View style={{ marginTop: 25 }}>
        <Text>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          style={styles.textInput}
          onChangeText={(value) => setUserName(value)}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
        <Text style={{ fontSize: 17, color: "white" }}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("/login/signIn")}>
        <Text style={{ fontSize: 17, color: Colors.PRIMARY }}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
  },
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCreate: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});

export default SignUp;
