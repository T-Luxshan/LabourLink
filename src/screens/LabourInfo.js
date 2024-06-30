// Importing necessary modules from React and React Native
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppBar from "../components/AppBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LabourProfileComponent from "../components/LabourProfileComponent";
import ServiceBoxBar from "../components/ServiceBoxBar";
import ScrollReviewer from "../components/ScrollReviewer";
// import PageButton from "../components/PageButton";
import { getLabourByEmail } from "../services/LabourDetailsService";
import { getLabourByAbout } from "../services/LabourDetailsService";
import { getLabourByRating } from "../services/LabourDetailsService";
import { getLabourByTotalservice } from "../services/LabourDetailsService";
import { Button } from "react-native-paper";
import LabourPerformanceModel from "../components/LabourPerfomanceModel";
import {updateUserStatus} from "../services/userService"

// LabourInfo component definition
const LabourInfo = () => {
  // console.props(props);
  const navigation = useNavigation(); // Get navigation object using useNavigation hook
  const route = useRoute();
  const { email, JobRole, ProfileImage } = route.params;
  const jobRole = JobRole.toUpperCase();
  const tempProfile =
    "https://firebasestorage.googleapis.com/v0/b/labourlink-e7ecf.appspot.com/o/ProfilePhoto%2Fboy.png?alt=media&token=b9013246-c51f-4bb8-b68b-1465e24e8583";

  useEffect(() => {
    fetchLabour(email);
  }, [email]);

  useEffect(() => {
    fetchAbout(email);
  }, [email]);

  const [labour, setLabour] = useState("");
  const [LabourProfile, setAbout] = useState("");
  const [labourrating, setrating] = useState("");
  const [labourTotalservice, setTotalServices] = useState("");
  const [labourcard, setLabourCard] = useState([]);

  // const [labourId, setEmail] = useState(labourEmail);

  const fetchLabour = (email) => {
    getLabourByEmail(email)
      .then((respose) => {
        // console.log(respose);
        setLabour(respose.data);
      })
      .catch((error) => {
        console.log("Error in fetching labour", error);
      });
  };
  const fetchAbout = (email) => {
    getLabourByAbout(email)
      .then((respose) => {
        // console.log(respose);
        setAbout(respose.data);
      })
      .catch((error) => {
        console.log("Error in fetching About", error);
      });
  };
  useEffect(() => {
    fetchrating(email);
  }, [email]);

  const fetchrating = (email) => {
    getLabourByRating(email)
      .then((respose) => {
        // console.log(respose);
        setrating(respose.data);
      })
      .catch((error) => {
        console.log("Error in fetching rating", error);
      });
  };

  useEffect(() => {
    fetchTotalServices(email, "COMPLETED"); // Fetch total services with a specific stage
  }, [email]);

  const fetchTotalServices = (email, stage) => {
    getLabourByTotalservice(email, stage)
      .then((response) => {
        // console.log(response.data);
        setTotalServices(response.data.length); // Assuming response.data is an array of services
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("Total services not found for the given email and stage");
          setTotalServices("Not found"); // Set a default value if no services are found
        } else {
          console.log("Error in fetching total services", error);
        }
      });
  };

  const handleLabourPerfomance = () => {
    navigation.navigate("labour-perfomance", {
      email: email,
    });
  };

  const handlePress = () => {
    // Navigate to 'BookAppointment' screen
    navigation.navigate("BookAppointment", {
      labourId: email,
      jobRole: jobRole,
      labourCard: {},
      labourName: labour.name,
      labourJobTitle: labour.jobRole.join(" | "),
      labourRating: labourrating,
      profileImage: ProfileImage,
    });
  };
  const handlePressChat = () => {
    updateUserStatusToDB(labour)
    navigation.navigate("ChatAreaScreen",{
      SelectedUserName: labour.name,
      SelectedUserEmail: email,
    });
  };

  const updateUserStatusToDB = async (labour) => {
    console.log(labour);

    try {
      const response = await updateUserStatus(email, { status: "ONLINE" });
      console.log(response);
      console.log("User status changed successfully");
      // Optionally, you can reset the form or show a success message to the user
    } catch (error) {
      console.error("Error updating user status:", error);
      // Handle errors such as displaying an error message to the user
    }
  };

  return (
    // Wrapping the entire component with SafeAreaProvider to handle safe areas for different devices
    <SafeAreaProvider>
      {/* Main container view */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* AppBar component with title */}
        {/* <AppBar Title={labour.name}/> */}

        {/* Labour profile component */}
        <LabourProfileComponent
          profileImage={{ uri: ProfileImage ? ProfileImage : tempProfile }}
          style={styles.profileImage} // Profile image
          name={labour ? labour.name : "Name not found"} // Name of the labour
          jobTitle={labour ? labour.jobRole.join(" | ") : "Role not found"} // Job title
          rating={labourrating} // Rating
        />

        {/* Container for displaying service information */}

        <View style={styles.infoContainer}>
          <ServiceBoxBar
            Cardtext="Total Services"
            Cardno={labourTotalservice ? labourTotalservice : "Not found"}
          />
          <ServiceBoxBar
            Cardtext="Rating"
            Cardno={labourrating ? labourrating : "Not found"}
          />
        </View>

        {/* Container for labour information */}
        <View style={styles.labor}>
          {/* Title for labour information section */}
          <Text style={styles.title}>Labor Information</Text>
          {/* Displaying various information about the labour */}
          <Text style={styles.info}>
            Name: {labour ? labour.name : "Name not found"}
          </Text>

          <Text style={styles.info}>
            Gender:{" "}
            {LabourProfile.gender ? LabourProfile.gender : "Gender not found"}
          </Text>

          <Text style={styles.info}>
            language:{" "}
            {LabourProfile.languages
              ? LabourProfile.languages.join(", ")
              : "languages not found"}
          </Text>

          {/* // <Text style={styles.info}>language: languages not found</Text>  */}

          {/* Container for displaying about information */}
          <View style={styles.about}>
            {/* Title for about section */}
            <Text style={styles.info}>About:</Text>
            {/* Description about the labour */}
            <Text style={styles.indentedText}>
              {LabourProfile.aboutMe
                ? LabourProfile.aboutMe
                : "About Me not found"}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => handleLabourPerfomance()}>
          <Text style={{ color: "#FB9741", margin: 5 }}>
            View labour perfomance
          </Text>
        </TouchableOpacity>

        {/* Container for displaying scroll reviewer and page button */}
        <View>
          {/* ScrollReviewer component for displaying reviews */}
          <ScrollReviewer email={email} jobRole={jobRole} />
          {/* PageButton component for navigating to different pages */}
          {/* <PageButton screen="BookAppointment"/> */}
          <Button mode="contained" onPress={handlePress} style={styles.button}>
            Book Now
          </Button>
          <Button
            mode="contained"
            onPress={handlePressChat}
            style={styles.button2}
          >
            Start Chat
          </Button>
        </View>

        {/* Button to navigate to BookAppointment screen */}
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Take up entire space
    marginTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 1,
    alignItems: "center",
    gap: 0,
    // marginVertical:10,
  },

  labor: {
    marginTop: 0,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 16,
    marginBottom: 5,
  },

  about: {
    flexDirection: "row",
    marginTop: 8,
  },

  indentedText: {
    marginLeft: 10,
    fontSize: 16,
    marginRight: 40,
  },
  button: {
    marginBottom: 10,
    backgroundColor: "orange",
    width: 350,
    height: 50,
    marginLeft: 10,
    borderRadius: 50,
    // Adjust the marginTop for spacing
  },
  button2: {
    marginBottom: 100,
    backgroundColor: "#00204A",
    width: 350,
    height: 50,
    marginLeft: 10,
    borderRadius: 50,
    // Adjust the marginTop for spacing
  },
});

// Exporting LabourInfo component
export default LabourInfo;
