import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import { Card } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import useTime from "../hooks/useTime";
import Routes from "../navigation/Routes";
import greetings from "../utils/greetings";

const HomeStudent = ({ navigation }) => {
  const time = useTime();

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      <StatusBar style="light" />

      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { height: 200 }]}
      />

      <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
        <View
          style={[
            globalStyles.row,
            {
              marginTop: sizes.medium,
              marginBottom: sizes.xlarge,
              columnGap: sizes.xsmall,
            },
          ]}
        >
          <View style={globalStyles.flexFull}>
            <Text style={[textStyles.title, { color: "white" }]}>
              {greetings()},
            </Text>
            <Text style={[textStyles.heading, { color: "white" }]}>
              Mel Mathew
            </Text>
          </View>

          <View
            style={[
              globalStyles.rowCenter,
              { paddingRight: sizes.small, columnGap: sizes.medium },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.PROFILE)}
              activeOpacity={0.5}
            >
              <Ionicons name="person-circle" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            rowGap: sizes.xlarge,
            paddingBottom: sizes.xlarge,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Card
            style={[
              globalStyles.center,
              {
                padding: sizes.large,
                rowGap: sizes.large,
              },
            ]}
          >
            <Text style={[textStyles.subHeading, { color: colors.primary }]}>
              {format(time, "EEEE MMM d, yyyy")}
            </Text>
            <View
              style={[
                globalStyles.center,
                {
                  rowGap: sizes.large,
                  marginVertical: sizes.small,
                },
              ]}
            >
              <Text style={textStyles.subTitle}>
                Please scan this to your teacher:
              </Text>
              <QRCode value="hello" size={150} />
            </View>
            <Text style={textStyles.subHeading}>{format(time, "h:mm a")}</Text>
          </Card>

          <Card
            style={{
              padding: sizes.large,
              rowGap: sizes.large,
            }}
          >
            <Text style={textStyles.subHeading}>Rewards</Text>
            <Text style={textStyles.caption}>You have no rewards yet.</Text>
          </Card>

          <Card
            style={{
              padding: sizes.large,
              rowGap: sizes.large,
            }}
          >
            <Text style={textStyles.subHeading}>Achievements</Text>
            <Text style={textStyles.caption}>
              You have no achievements yet.
            </Text>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeStudent;
