import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { primary, white } from "../styles/colors";

const TabHeader = ({ title }) => {
  return (
    <View>
      <Text style={styles.headerBar}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: primary,
    color: white,
    fontSize: 20,
    padding: 20,
    textAlign: "center",
    marginBottom: 30,
  },
});

export default TabHeader;
