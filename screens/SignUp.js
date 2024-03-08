import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Button } from "react-native-ui-lib";
import { useShallow } from "zustand/react/shallow";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import FORM_FIELDS from "../consts/formData";
import ROLES from "../consts/roles";
import STATES from "../consts/states";
import { useQRCodeContext } from "../contexts/QRCodeContext";
import { createEmployee, createStudent } from "../services/apiService";
import useAuthStore from "../stores/useAuthStore";
import useICPFetching from "../stores/useICPFetching";
import useProfileStore from "../stores/useProfileStore";
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
    initialState
  );
  const [errors, setErrors] = useState({});

  const { role } = route.params;

  const { identity, getActor, setIsRegistered } = useAuthStore(
    useShallow((state) => ({
      identity: state.identity,
      getActor: state.getActor,
      setIsRegistered: state.setIsRegistered,
    }))
  );
  const fetchRoleAndProfile = useProfileStore(
    (state) => state.fetchRoleAndProfile
  );
  const { isFetching, setIsFetching } = useICPFetching(
    useShallow((state) => ({
      isFetching: state.isFetching,
      setIsFetching: state.setIsFetching,
    }))
  );
  const { qrValue } = useQRCodeContext();

  const registerMutation = useMutation({
    mutationFn: role === ROLES.TEACHER ? createEmployee : createStudent,
    onSuccess: async ({ data }) => {
      const actor = getActor();

      const createUser =
        role === ROLES.TEACHER ? actor.createTeacher : actor.createStudent;

      setIsFetching(true);
      try {
        await createUser({
          ...data,
          // Optional fields
          id: data.id || [],
          middleName: data.middleName || [],
        });

        await fetchRoleAndProfile(identity);
        setIsRegistered(true);
      } catch (e) {
        console.log("Error", e);
      } finally {
        setIsFetching(false);
      }
    },
    onError: ({ response }) => {
      const {
        data: { errors },
      } = response;

      console.log("Errors", errors);
      console.log(response);
      setErrors(errors);
    },
  });

  const handleRegister = useCallback(async () => {
    // if (!registerMutation.isPending) {
    //   const actor = getActor();

    //   let registrationData = formData;

    //   // Add principalId to registration data
    //   setIsFetching(true);
    //   try {
    //     const principal = await actor.whoami();
    //     registrationData.principalId = principal.toText();
    //   } catch (e) {
    //     console.log(e);
    //   } finally {
    //     setIsFetching(false);
    //   }

    //   // Add qr value to registration data
    //   if (role === ROLES.STUDENT) {
    //     registrationData = {
    //       ...registrationData,
    //       ...qrValue,
    //     };
    //   }

    //   registerMutation.mutate(registrationData);
    // }
    setIsRegistered(true);
  }, [formData, identity, qrValue, registerMutation.isPending]);

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
    [errors, formData]
  );

  const signUpFields = useMemo(() => {
    return FORM_FIELDS.filter(
      (field) => !field.forRole || field.forRole === role
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
              label={
                registerMutation.isPending || isFetching ? " " : "Register"
              }
              labelStyle={textStyles.subTitle}
              style={{
                marginHorizontal: sizes.xlarge,
                marginVertical: sizes.medium,
              }}
              enableShadow
              disabled={registerMutation.isPending || isFetching}
              onPress={handleRegister}
            >
              {(registerMutation.isPending || isFetching) && (
                <ActivityIndicator />
              )}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterTeacher;
