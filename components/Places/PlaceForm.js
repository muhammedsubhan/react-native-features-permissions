import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/Place";

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnterTitle] = useState("");
  const [pickedLocaiton, setPickedLocation] = useState("");
  const [selectImage, setSelectImage] = useState("");

  const changeHandlerTitle = (enteredText) => {
    setEnterTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setSelectImage(imageUri.uri);
  };

  const pickLocationHandler = useCallback((locaiton) => {
    setPickedLocation(locaiton);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectImage, pickedLocaiton);
    onCreatePlace(placeData);
    // console.log(enteredTitle);
    // console.log(pickedLocaiton);
    // console.log(selectImage);
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
        <ImagePicker onTakenImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
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
