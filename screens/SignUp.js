import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useMemo, useReducer, useState } from "react";
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
import { createEmployee } from "../services/apiService";
import useAuthStore from "../stores/useAuthStore";
import getInitialState from "../utils/getInitialState";
import renderInputItem from "../utils/renderInputItem";

const initialState = getInitialState(STATES);

const RegisterTeacher = ({ navigation, route }) => {
  // const [arePasswordsVisible, togglePasswordsVisibility] = useReducer(
  //   (state) => !state,
  //   false,
  // );
  const [formData, setData] = useReducer(
    (state, data) => ({ ...state, ...data }),
    initialState,
  );
  const [errors, setErrors] = useState({});

  const { role } = route.params;

  const setAsRegistered = useAuthStore((state) => state.setAsRegistered);

  const registerMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => setAsRegistered(role),
    onError: (data) => {
      const {
        response: {
          data: { errors },
        },
      } = data;

      console.log(data.response);
      console.log("Errors", errors);
      setErrors(errors);
    },
  });

  const handleRegister = useCallback(() => {
    if (!registerMutation.isPending) {
      registerMutation.mutate({ role, ...formData });
    }
  }, [formData, registerMutation.isPending]);

  const renderItem = useCallback(
    ({ item }) => {
      // if (item.isPassword) {
      //   item = {
      //     ...item,
      //     arePasswordsVisible,
      //     togglePasswordsVisibility,
      //   };
      // }

      if (errors && errors[item.state]) {
        item = {
          ...item,
          enableErrors: !!errors[item.state],
          validationMessage: errors[item.state],
        };
      }

      return renderInputItem({
        key: item.state,
        item,
        data: formData,
        setData,
      });
    },
    [errors, formData],
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
              onPress={handleRegister}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterTeacher;
