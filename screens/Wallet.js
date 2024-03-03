import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GradientShimmer from "react-native-gradient-shimmer";
import { Button } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import Routes from "../navigation/Routes";

const Wallet = ({ navigation }) => {
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      {isFocused && <StatusBar style="dark" />}

      <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
        <View
          style={{
            marginTop: sizes.medium,
            marginBottom: sizes.xlarge,
          }}
        >
          <Text style={textStyles.heading}>Your Wallet</Text>
        </View>

        <TouchableOpacity activeOpacity={0.95}>
          <LinearGradient
            colors={[colors.tertiary, colors.primary, "gray"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              globalStyles.rowCenter,
              globalStyles.spaceBetween,
              {
                padding: sizes.large,
                rowGap: sizes.large,
                borderRadius: sizes.medium,
              },
            ]}
          >
            <GradientShimmer
              LinearGradientComponent={LinearGradient}
              height={250}
              width={500}
              duration={4000}
              highlightWidth={140}
              highlightColor="rgba(255, 255, 255, 0.1)"
              backgroundColor="transparent"
              style={StyleSheet.absoluteFill}
            />

            <Image
              source={require("../assets/images/card-mask.png")}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
            <View>
              <Image
                source={require("../assets/images/logo.png")}
                style={{ height: 40, width: 40, marginBottom: 120 }}
              />

              <View
                style={[
                  globalStyles.rowCenter,
                  globalStyles.spaceBetween,
                  { width: "100%" },
                ]}
              >
                <View style={{ rowGap: sizes.small }}>
                  <Text style={[textStyles.title, { color: "white" }]}>
                    ₱ 0.00
                  </Text>
                  <Text style={textStyles.caption}>Total Points</Text>
                </View>

                <View style={{ padding: sizes.small }}>
                  <Text style={[textStyles.title, { color: "white" }]}>
                    02/24
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Button
          label="Connect Wallet"
          labelStyle={textStyles.subTitle}
          outlineColor={colors.primary}
          outline
          style={{
            marginTop: sizes.xlarge,
            columnGap: sizes.small,
          }}
        >
          <Ionicons name="add" size={25} color={colors.primary} />
        </Button>

        <Button
          label="Redeem Rewards"
          labelStyle={textStyles.subTitle}
          outlineColor={colors.primary}
          style={{
            marginTop: sizes.xlarge,
            columnGap: sizes.small,
          }}
          onPress={() => navigation.navigate(Routes.REWARDS)}
        >
          <Ionicons name="arrow-forward-circle" size={25} color="white" />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
