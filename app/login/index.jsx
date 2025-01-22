import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  return (
    <ScrollView>
      <View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
          }}>
          <Image
            source={require("./../../assets/images/login.png")}
            style={styles?.imageStyle}
          />
        </View>
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.PRIMARY,
            height: "100%",
           
          }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}>
            Stay On Track, Stay Healthy!
          </Text>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 17,
              marginTop: 20,
            }}>
            Track your meds, take control of your health. Stay consistent, stay
            confident
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/login/signUp")}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,

                color: Colors.PRIMARY,
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          color: "white",
          marginTop: 4,
        }}>
        Note: By Clicking 'CONTINUE' button, you will agree to our 'terms &
        conditions'.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 210,
    height: 450,
    borderRadius: 23,
  },
  button: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 99,
    marginTop: 25,
  },
});

export default LoginScreen;
