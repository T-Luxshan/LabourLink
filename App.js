import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Labour_page from "./screens/Labour_page";

export default function App() {
  return (
    <View style={styles.container}>
      <Labour_page  />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
