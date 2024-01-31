import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params && route.params.place) {
      const newPlace = route.params.place;

      // Check if the new place is already in the loadedPlaces array
      const isAlreadyAdded = loadedPlaces.some(
        (place) => place.id === newPlace.id
      );

      if (!isAlreadyAdded) {
        // Add the new place only if it's not already in the list
        setLoadedPlaces((currPlaces) => [...currPlaces, newPlace]);
      }
    }
  }, [isFocused, route, loadedPlaces]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
