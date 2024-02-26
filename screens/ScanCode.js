import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import { BorderlessButton } from "react-native-gesture-handler";
import { Button } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import ROLES from "../consts/roles";
import Routes from "../navigation/Routes";

const RegisterStudent = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [torch, toggleTorch] = useReducer((state) => !state, false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const onQRScanned = useCallback(({ data }) => {
    if (data === code) {
      return;
    }

    console.log("QR Scanned:", data);
    setCode(data);
  }, []);

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      <View style={{ paddingHorizontal: sizes.large, paddingTop: sizes.large }}>
        <View
          style={{
            marginTop: sizes.medium,
            marginBottom: sizes.xlarge,
          }}
        >
          <View style={[globalStyles.rowCenter, { columnGap: sizes.medium }]}>
            <BorderlessButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={35} color={colors.primary} />
            </BorderlessButton>
            <Text style={textStyles.heading}>{route.name}</Text>
          </View>
        </View>
      </View>

      <View style={[globalStyles.flexFull, globalStyles.spaceBetween]}>
        {permission?.granted ? (
          <CameraView
            style={globalStyles.flexFull}
            enableTorch={torch}
            barCodeScannerSettings={{
              barCodeTypes: ["qr"],
            }}
            onBarcodeScanned={onQRScanned}
          >
            <BarcodeMask
              edgeColor={colors.primary}
              showAnimatedLine={false}
              height="40%"
            />
            <Button
              onPress={toggleTorch}
              backgroundColor={torch ? "white" : "rgba(255,255,255,0.2)"}
              style={{
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
              }}
            >
              <Ionicons
                name="flashlight"
                size={35}
                color={torch ? colors.primary : "white"}
              />
            </Button>
          </CameraView>
        ) : (
          <View style={globalStyles.flexCenter}>
            <Text style={textStyles.subTitle}>Camera permission required.</Text>
          </View>
        )}

        <View
          style={{ paddingHorizontal: sizes.large, paddingBottom: sizes.large }}
        >
          <Button
            label="Continue"
            labelStyle={textStyles.subTitle}
            style={{
              marginHorizontal: sizes.xlarge,
              marginVertical: sizes.medium,
            }}
            enableShadow
            // disabled={!code}
            onPress={() =>
              navigation.navigate(Routes.SIGN_UP, { role: ROLES.STUDENT, code })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterStudent;
