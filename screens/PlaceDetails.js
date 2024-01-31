import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/colors";
import { useEffect, useLayoutEffect, useState } from "react";

const PlaceDetails = ({ route, navigation }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const selectedPlaceId = route.params.placeId;
  const AllPlacesItem = route.params.AllPlaces;

  const showOnMapHandler = () => {};

  useEffect(() => {
    // Find the place in AllPlacesItem with the matching id
    const selectedPlace = AllPlacesItem.find(
      (place) => place.id === selectedPlaceId
    );

    // Update the state with the selected place
    setSelectedItem(selectedPlace || {});
  }, [selectedPlaceId, AllPlacesItem]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedItem?.title,
    });
  }, [navigation, selectedItem]);

  return (
    <>
      <ScrollView>
        <Image style={styles.Image} source={{ uri: selectedItem.imageUri }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>
              Lat:{selectedItem.location?.lat} Lng:{selectedItem.location?.lng}
            </Text>
          </View>
          <Button title="View on Map" onPress={showOnMapHandler} />
        </View>
      </ScrollView>
    </>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  Image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
