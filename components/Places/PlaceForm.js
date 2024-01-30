import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
  const [enteredTitle, setEnterTitle] = useState("");

  const changeHandlerTitle = (enteredText) => {
    setEnterTitle(enteredText);
  };
  return (
    <>
      <ScrollView style={Style.form}>
        <View>
          <Text style={Style.label}>Title</Text>
          <TextInput
            style={Style.input}
            onChangeText={changeHandlerTitle}
            value={enteredTitle}
          />
        </View>
        <ImagePicker />
        <LocationPicker />
      </ScrollView>
    </>
  );
};

export default PlaceForm;

const Style = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
