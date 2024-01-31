import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";

const LocationPicker = ({ onPickLocation }) => {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const [pickedLocation, setPickedLocation] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [isFocused, route]);

  const verifyPermission = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "you need to grant permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation(location);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let mapPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    mapPreview = <Text>Location is Picked.(i dont have map)</Text>;
  }

  return (
    <>
      <View>
        <View style={Styles.mapPreview}>{mapPreview}</View>
        <View style={Styles.actions}>
          <Button title="Locate User" onPress={getLocationHandler} />
          <Button title="Pick on Map" onPress={pickOnMapHandler} />
        </View>
      </View>
    </>
  );
};

export default LocationPicker;

const Styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
