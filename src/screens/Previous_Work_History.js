import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";

const Previous_Work_History = () => {
  const workDetails = [
    { name: "Mr.Shanthan", time: "@20.12.2023 | 10 am-2 p.m" },
    { name: "Mrs.Shaar", time: "@02.01.2023 | 8 am-1 p.m" },
    { name: "Mrs.Kulam", time: "@01.12.2023 | 02 pm-07 p.m" },
    { name: "Mr.Shanthan", time: "@11.11.2023 | 11 am-03 p.m" },
    { name: "Mr.Shanthan", time: "@20.12.2023 | 10 am-2 p.m" },
    { name: "Mrs.Shaar", time: "@02.01.2023 | 8 am-1 p.m" },
    { name: "Mrs.Kulam", time: "@01.12.2023 | 02 pm-07 p.m" },
    { name: "Mr.Shanthan", time: "@11.11.2023 | 11 am-03 p.m" },
    { name: "Mr.Shanthan", time: "@20.12.2023 | 10 am-2 p.m" },
    { name: "Mrs.Shaar", time: "@02.01.2023 | 8 am-1 p.m" },
    { name: "Mrs.Kulam", time: "@01.12.2023 | 02 pm-07 p.m" },
    { name: "Mr.Shanthan", time: "@11.11.2023 | 11 am-03 p.m" },
  ];

  return (
    <ScrollView>
      <View style={{ marginTop: 10 }}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Previous Work History</Text>
        </View> */}

        {workDetails.map((work, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.workDetail}>Customer Name: {work.name}</Text>
              <Text style={styles.workTime}>{work.time}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    marginBottom: 30,
    color: "#FF7600",
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 10,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  workDetail: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2F3239",
  },
  workTime: {
    fontSize: 13,
    color: "#2F3239",
    marginTop: 5,
  },
});

export default Previous_Work_History;
