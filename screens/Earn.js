import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";

const rewards = [
  { reward: "+5 points on quiz", requirement: "50 needed" },
  { reward: "+10 points on quiz", requirement: "100 needed" },
];

const Earn = () => {
  const isFocused = useIsFocused();

  const renderItem = useCallback(({ item }) => {
    return (
      <Card
        onPress={() => {
          console.log("Reward clicked:", item.reward);
        }}
        row
        style={{
          padding: sizes.large,
          rowGap: sizes.large,
        }}
      >
        <Card.Image
          source={require("../assets/images/dfinity.png")}
          height={100}
          width={100}
          cover="contain"
        />
        <View style={{ rowGap: sizes.small }}>
          <Text style={textStyles.subTitle}>{item.reward}</Text>
          <Text style={textStyles.caption}>{item.requirement}</Text>
        </View>
      </Card>
    );
  }, []);

  return (
    <SafeAreaView style={globalStyles.flexFull}>
      {isFocused && <StatusBar style="dark" />}

      <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
        <View
          style={{
            marginTop: sizes.medium,
            marginBottom: sizes.xlarge,
          }}
        >
          <Text style={textStyles.heading}>Available Rewards</Text>
        </View>

        <LinearGradient
          colors={[colors.primary, colors.secondary]}
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
          <Text style={[textStyles.subTitle, { color: "white" }]}>
            Solve a riddle and earn points!
          </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="arrow-forward-circle" size={40} color="white" />
          </TouchableOpacity>
        </LinearGradient>

        <FlatList
          data={rewards}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            rowGap: sizes.xlarge,
            paddingVertical: sizes.xlarge,
          }}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Earn;
