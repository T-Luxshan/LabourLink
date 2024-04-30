// MapViewScreen.js

// Importing necessary modules from React and React Native
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ScrollView, TouchableOpacity } from "react-native";
//import ProfilScrollView from "../components/ProfileScrollView"
import LabourProfileComponent from "../components/LabourProfileComponent";
import BookAppointment from "../screens/BookAppointment";
// import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook (commented out)
//import { useNavigation } from '@react-navigation/native'; 

// MapViewScreen component definition
const MapViewScreen = ({navigation}) => {
  // Initial region for the map
  const initialRegion = {
    latitude: 6.79503, // Latitude of the initial map center
    longitude: 79.90168, // Longitude of the initial map center
    latitudeDelta: 0.0922, // Delta for latitude (zoom level) of the initial map view
    longitudeDelta: 0.0421, // Delta for longitude (zoom level) of the initial map view
  };

  // Worker locations data categorized by their type
  const workerLocations = {
    plumber: [
      { id: 1, name: "Plumber 1", latitude: 6.7952, longitude: 79.9018 }, // Example plumber 1 location
      { id: 2, name: "Plumber 2", latitude: 6.7841, longitude: 79.9017 }, // Example plumber 2 location
    ],
    driver: [
      { id: 3, name: "Driver 1", latitude: 6.7955, longitude: 79.901 }, // Example driver 1 location
      { id: 4, name: "Driver 2", latitude: 6.785, longitude: 79.9005 }, // Example driver 2 location
    ],
    // Add more worker types and locations as needed
  };

  // State variables for managing map state and user location
  const [region, setRegion] = useState(initialRegion); // Current region of the map
  const [location, setLocation] = useState(null); // User's current location
  const [errorMsg, setErrorMsg] = useState(null); // Error message related to location access
  const [selectedWorkerType, setSelectedWorkerType] = useState(null); // Currently selected worker type for searching
  const [selectedMarker, setSelectedMarker] = useState(null); // Selected marker for displaying details

  // Fetching user's current location on component mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Function to handle search for workers of a specific type
  const handleSearch = (workerType) => {
    const defaultWorker = workerLocations[workerType][0];
    setSelectedMarker(defaultWorker);
    setSelectedWorkerType(workerType);
  };
  const handleProfileClick = () => {
    // Navigate to LabourInfo screen
    navigation.navigate('LabourInfo', {
      // Pass any necessary parameters to LabourInfo screen
      // For example, you can pass worker details here
    });
  };

  // JSX rendering
  return (
    <View style={styles.Mapcomponentcontainer}>
      <View style={styles.mapViewContainer}>
        {/* MapView component for displaying the map */}
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true} // Show user's location on the map
          zoomEnabled={true} // Enable zoom functionality
          zoomControlEnabled={true} // Enable zoom control
          initialRegion={region} // Initial region of the map
        >
          {/* Rendering markers for the selected worker type */}
          {selectedWorkerType &&
            workerLocations[selectedWorkerType].map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name} // Marker title
              />
            ))}
        </MapView>
        {/* ScrollView for displaying profiles of workers */}
        <ScrollView>
        <TouchableOpacity onPress={handleProfileClick}>
            <LabourProfileComponent
              profileImage={require("../assets/Images/profile_photo3.png")}
              name="John Smith"
              jobTitle="Electrician"
              rating={4}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <LabourProfileComponent
              profileImage={require("../assets/Images/profile_photo3.png")}
              name="John Smith"
              jobTitle="Electrician"
              rating={4}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <LabourProfileComponent
              profileImage={require("../assets/Images/profile_photo3.png")}
              name="John Smith"
              jobTitle="Electrician"
              rating={4}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <LabourProfileComponent
              profileImage={require("../assets/Images/profile_photo3.png")}
              name="John Smith"
              jobTitle="Electrician"
              rating={4}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <LabourProfileComponent
              profileImage={require("../assets/Images/profile_photo3.png")}
              name="John Smith"
              jobTitle="Electrician"
              rating={4}
            />
          </TouchableOpacity>
          {/* Additional LabourProfileComponent instances can be added here */}
        </ScrollView>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  Mapcomponentcontainer: {
    flex: 1, // Take up entire space
  },
  mapStyle: {
    width: "100%", 
    height: 300, 
    marginTop: 0, // No margin from the top
  },
  mapViewContainer: {
    flex: 1, 
  },
});

// Exporting MapViewScreen component
export default MapViewScreen;
