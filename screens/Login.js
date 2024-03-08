import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { Button, View } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import useAuthStore from "../stores/useAuthStore";
import useICPFetching from "../stores/useICPFetching";

const Login = () => {
  const isFetching = useICPFetching((state) => state.isFetching);
  const login = useAuthStore((state) => state.login);
  // const login = useAuthStore((state) => state.loginTest);

  return (
    <>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.1)", "transparent"]}
        locations={[0, 0.8, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 200,
        }}
      />

      <SafeAreaView style={globalStyles.flexFull}>
        <StatusBar style="light" animated />
        <View
          style={[
            globalStyles.flexFull,
            globalStyles.spaceBetween,
            { padding: sizes.xlarge },
          ]}
        >
          <View style={globalStyles.flexCenter}>
            <View
              style={[
                globalStyles.center,
                {
                  rowGap: sizes.medium,
                },
              ]}
            >
              <Image
                source={require("./../assets/images/logo.png")}
                style={{ height: 120, width: 120 }}
              />

              <Text style={textStyles.logo}>Attend.ly</Text>
              <View
                style={[
                  globalStyles.rowCenter,
                  { columnGap: sizes.small, marginTop: sizes.small },
                ]}
              >
                <Text style={textStyles.body}>Powered by: </Text>
                <Image
                  source={require("./../assets/images/dfinity.png")}
                  style={{ height: 35, width: 60 }}
                />
              </View>
            </View>
          </View>

          <Button
            label={isFetching ? " " : "Login with Internet Identity"}
            labelStyle={textStyles.subTitle}
            style={{
              marginHorizontal: sizes.xlarge,
              marginVertical: sizes.medium,
            }}
            enableShadow
            onPress={login}
            disabled={isFetching}
          >
            {isFetching && <ActivityIndicator />}
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
