import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useMemo, useReducer } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Button } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import FORM_FIELDS from "../consts/formData";
import STATES from "../consts/states";
import useAuthStore from "../stores/useAuthStore";
import getInitialState from "../utils/getInitialState";
import renderInputItem from "../utils/renderInputItem";

const initialState = getInitialState(STATES);

const RegisterTeacher = ({ navigation, route }) => {
  const [arePasswordsVisible, togglePasswordsVisibility] = useReducer(
    (state) => !state,
    false,
  );
  const [formData, setData] = useReducer(
    (state, data) => ({ ...state, ...data }),
    initialState,
  );

  const { role } = route.params;

  const register = useAuthStore((state) => state.registerTest);

  const renderItem = useCallback(
    ({ item }) => {
      if (item.isPassword) {
        item = {
          ...item,
          arePasswordsVisible,
          togglePasswordsVisibility,
        };
      }
      return renderInputItem({
        key: item.state,
        item,
        data: formData,
        setData,
      });
    },
    [arePasswordsVisible, formData],
  );

  const signUpFields = useMemo(() => {
    return FORM_FIELDS.filter(
      (field) => !field.forRole || field.forRole === role,
    );
  }, [role]);

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      <KeyboardAvoidingView
        style={globalStyles.flexFull}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
          <View
            style={{
              marginTop: sizes.medium,
              marginBottom: sizes.xlarge,
            }}
          >
            <View style={[globalStyles.rowCenter, { columnGap: sizes.medium }]}>
              <BorderlessButton onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color={colors.primary}
                />
              </BorderlessButton>
              <Text style={textStyles.heading}>{route.name}</Text>
            </View>
          </View>

          <View style={[globalStyles.flexFull, globalStyles.spaceBetween]}>
            <ScrollView
              contentContainerStyle={{
                rowGap: sizes.xxlarge,
                padding: sizes.xlarge,
                paddingBottom: sizes.xxlarge,
              }}
            >
              {signUpFields.map((item) => renderItem({ item }))}
            </ScrollView>

            <Button
              label="Register"
              labelStyle={textStyles.subTitle}
              style={{
                marginHorizontal: sizes.xlarge,
                marginVertical: sizes.medium,
              }}
              enableShadow
              onPress={() => register(role)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterTeacher;
