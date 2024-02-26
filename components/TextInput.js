import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextField } from "react-native-ui-lib";

import { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";

const TextInput = (props) => {
  const getTrailingAccessory = () => {
    let trailingAccessory;

    if (props.isPassword && props.value) {
      trailingAccessory = (
        <TouchableOpacity onPress={props.onTogglePasswordsVisibility}>
          <Ionicons
            name={props.arePasswordsVisible ? "eye-off" : "eye"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      );
    }

    if (props.isDropdown) {
      trailingAccessory = (
        <Ionicons name="chevron-down" size={24} color={colors.primary} />
      );
    }

    if (props.isDate) {
      trailingAccessory = (
        <Ionicons name="calendar" size={24} color={colors.primary} />
      );
    }

    if (trailingAccessory) {
      return (
        <View style={{ position: "absolute", right: sizes.small }}>
          {trailingAccessory}
        </View>
      );
    }

    return trailingAccessory;
  };

  return (
    <TextField
      style={textStyles.subTitle}
      labelStyle={[
        textStyles.subTitle,
        { color: props.isViewing ? colors.tertiary : "gray" },
      ]}
      fieldStyle={{
        ...(!props.isViewing && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "gray",
        }),
        paddingVertical: sizes.medium,
        paddingRight: sizes.xxlarge,
      }}
      readOnly={props.isViewing}
      autoCapitalize={props.isEmail ? "none" : "words"}
      secureTextEntry={props.isPassword && !props.arePasswordsVisible}
      trailingAccessory={!props.isViewing && getTrailingAccessory()}
      {...props}
    />
  );
};

export default memo(TextInput);
