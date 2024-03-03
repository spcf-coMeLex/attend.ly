import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";

const tasks = [
  { id: 1, requirement: "Join an international competition", points: 100 },
  { id: 2, requirement: "Win a spelling bee", points: 75 },
  { id: 3, requirement: "Clean the hallway", points: 50 },
];

const EarnPoints = () => {
  const isFocused = useIsFocused();

  const flatListRef = useRef(null);

  const renderItem = useCallback(({ item }) => {
    return (
      <Card
        onPress={() => {
          console.log("Task clicked:", item.requirement);
        }}
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
          <Text style={textStyles.subTitle}>{item.requirement}</Text>
          <Text style={textStyles.caption}>{item.points} pts</Text>
        </View>
      </Card>
    );
  }, []);

  useScrollToTop(flatListRef);

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
          <Text style={textStyles.heading}>Earn Points</Text>
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
            Solve a puzzle and win points!
          </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="arrow-forward-circle" size={40} color="white" />
          </TouchableOpacity>
        </LinearGradient>

        <FlatList
          ref={flatListRef}
          data={tasks}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            rowGap: sizes.large,
            paddingVertical: sizes.xlarge,
          }}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default EarnPoints;
