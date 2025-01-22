import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useRouter } from "expo-router";

const AddMedicationHeader = () => {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require("./../assets/images/consult.png")}
        style={{
          height: 280,
          width: "100%",
        }}
      />
      <TouchableOpacity style={{ position: "absolute", padding: 25 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddMedicationHeader;
