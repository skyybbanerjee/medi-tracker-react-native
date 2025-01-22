import { ScrollView } from "react-native";
import React from "react";
import AddMedicationHeader from "../../components/AddMedicationHeader";
import AddMedicationForm from "../../components/AddMedicationForm";

const AddNewMedication = () => {
  return (
    <ScrollView>
      <AddMedicationHeader />
      <AddMedicationForm />
    </ScrollView>
  );
};

export default AddNewMedication;
