import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import Colors from "../constant/Colors";
import { TypeList, WhenToTake } from "./../constant/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  FormatDate,
  formatDateForTxt,
  formatTime,
} from "../service/ConvertDateTime";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/FireBaseConfig";
import { getLocalStorage } from "../service/Storage";
import { useRouter } from "expo-router";

const AddMedicationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function saveMedication() {
    const docId = Date.now().toString();
    const user = await getLocalStorage("userDetail");

    // Check if all fields are filled
    if (
      !formData?.name ||
      !formData?.type ||
      !formData?.dose ||
      !formData?.startDate ||
      !formData?.endDate ||
      !formData?.reminder
    ) {
      Alert.alert("Missing Fields", "Please select all fields ⚠️");
      return;
    }

    setLoading(true);

    try {
      await setDoc(doc(db, "medication", docId), {
        ...formData,
        userEmail: user?.email,
        docId: docId,
      });
      Alert.alert("Success!", "Medication added successfully ✅", [
        {
          text: "OK",
          onPress: () => router.push("(tabs)"),
        },
      ]);
      console.log("Medication saved ✅");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert("Error", "Failed to save medication. Please try again ⚠️");
    }
  }

  return (
    <View
      style={{
        padding: 25,
      }}>
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.inputGroup}>
        <AntDesign
          style={styles.icon}
          name="medicinebox"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Medicine name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>
      {/* Type List 💊 */}
      <FlatList
        data={TypeList}
        horizontal
        style={{
          marginTop: 5,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onHandleInputChange("type", item)}
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name === formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}>
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name === formData?.type?.name ? "white" : "black",
                },
              ]}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* DOSAGE INPUT 🧪 */}
      <View style={styles.inputGroup}>
        <Ionicons
          name="eyedrop-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Dosage Ex. 2ml, 5ml etc."
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>
      {/* DOSAGE-TIMING DROPDOWN ⏲️*/}
      <View style={styles.inputGroup}>
        <Ionicons
          name="time-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue) => onHandleInputChange("when", itemValue)}
          style={{
            width: "90%",
          }}>
          {WhenToTake.map((item, index) => (
            <Picker.Item label={item} value={item} key={index} />
          ))}
        </Picker>
      </View>

      {/* Start And End Date 📅 */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          onPress={() => setShowStartDate(true)}
          style={[styles.dateInputGrp, { flex: 1 }]}>
          <Ionicons
            name="calendar-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.txt}>
            {formatDateForTxt(formData?.startDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            mode="date"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                onHandleInputChange("startDate", FormatDate(selectedDate));
              }
              setShowStartDate(false);
            }}
            value={
              formData?.startDate ? new Date(formData.startDate) : new Date()
            }
          />
        )}
        <TouchableOpacity
          style={[styles.dateInputGrp, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}>
          <Ionicons
            name="calendar-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.txt}>
            {formatDateForTxt(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            mode="date"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                onHandleInputChange("endDate", FormatDate(selectedDate));
              }
              setShowEndDate(false);
            }}
            value={formData?.endDate ? new Date(formData.endDate) : new Date()}
          />
        )}
      </View>

      {/* SET REMINDERS 🔔 */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={[styles.dateInputGrp, { flex: 1 }]}>
          <Ionicons
            name="timer-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.txt}>
            {formData?.reminder ?? "Select Reminder"}
          </Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          onChange={(event) => {
            onHandleInputChange(
              "reminder",
              formatTime(event.nativeEvent.timestamp)
            );
            setShowTimePicker(false);
          }}
          value={formData?.reminder ?? new Date()}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={() => saveMedication()}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={styles.buttonTxt}>Add New Medication</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: "white",
  },
  txtInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.GRAY,
  },
  typeText: {
    fontSize: 16,
  },
  txt: {
    fontSize: 16,
    padding: 10,
    flex: 1,
    marginLeft: 10,
  },
  dateInputGrp: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
    marginTop: 25,
  },
  buttonTxt: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
});

export default AddMedicationForm;
