import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

import globalStyles, { sizes } from "../assets/styles/globalStyles";

const AddStudent = () => {
  return (
    <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
      <StatusBar style="dark" />
    </View>
  );
};

export default AddStudent;
