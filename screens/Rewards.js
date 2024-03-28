import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { Card } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";

const rewards = [
  { id: 1, name: "+1 direct to the card", points: 100 },
  { id: 2, name: "+5 points on midterm exam", points: 75 },
  { id: 3, name: "+10 points on quiz", points: 50 },
];

const Rewards = () => {
  const renderItem = useCallback(
    ({ item }) => (
      <Card
        onPress={() => console.log("Reward clicked:", item.name)}
        style={[
          globalStyles.rowCenter,
          {
            padding: sizes.large,
            rowGap: sizes.large,
          },
        ]}
      >
        <Image
          source={require("../assets/images/dfinity.png")}
          style={{
            height: 50,
            width: 100,
            // backgroundColor: "red",
            // marginRight: sizes.small,
          }}
          contentFit="contain"
        />

        <View style={{ rowGap: sizes.small, flex: 1 }}>
          <Text style={textStyles.subTitle}>{item.name}</Text>
          <Text style={textStyles.caption}>{item.points} pts</Text>
        </View>
      </Card>
    ),
    []
  );

  return (
    <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={[colors.secondary, colors.primary, "gray"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          globalStyles.spaceBetween,
          {
            height: 150,
            padding: sizes.large,
            borderRadius: sizes.medium,
          },
        ]}
      >
        <Text style={[textStyles.heading, { color: "white" }]}>
          Available Rewards
        </Text>
        <Text style={[textStyles.caption, { color: "white" }]}>
          {rewards.length} total rewards
        </Text>
      </LinearGradient>

      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          rowGap: sizes.large,
          paddingVertical: sizes.xlarge,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Rewards;
