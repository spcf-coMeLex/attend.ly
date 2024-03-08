import Ionicons from "@expo/vector-icons/Ionicons";
import { useScrollToTop } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { BarChart, ProgressChart } from "react-native-chart-kit";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Card,
  Carousel,
  PageControlPosition,
  Timeline,
  TimelineLineTypes,
} from "react-native-ui-lib";
import { StateTypes } from "react-native-ui-lib/src/components/timeline/types";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import chartConfig from "../consts/chartConfig";
import Routes from "../navigation/Routes";
import useProfileStore from "../stores/useProfileStore";
import greetings from "../utils/greetings";

const screenWidth = Dimensions.get("window").width;

const activities = [
  {
    message: "Mel Mathew went to class.",
    date: "Feb 17",
    time: "9:14 am",
  },
  {
    message: "Mel Mathew got out of class.",
    date: "Feb 17",
    time: "4:00 pm",
  },
  {
    message: "Mel Mathew did not go to class.",
    date: "Feb 18",
    time: "9:15 am",
    isAlert: true,
  },
  {
    message: "Mel Mathew went to class late.",
    date: "Feb 19",
    time: "9:20 am",
    isAlert: true,
  },
  {
    message: "Mel Mathew went to class.",
    date: "Feb 20",
    time: "9:14 am",
  },
];

const HomeTeacher = ({ navigation }) => {
  const scrollViewRef = useRef(null);

  const profile = useProfileStore((state) => state.profile);

  useScrollToTop(scrollViewRef);

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
              {profile?.firstName}
            </Text>
          </View>

          <View
            style={[
              globalStyles.rowCenter,
              {
                paddingRight: sizes.small,
                columnGap: sizes.medium,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.PROFILE)}
              activeOpacity={0.5}
            >
              <Ionicons name="person-circle" size={40} color="white" />
            </TouchableOpacity>

            {/* <View style={[globalStyles.row, { marginTop: sizes.medium }]}>
              <Chip
                label="Teacher"
                labelStyle={{ color: "white" }}
                backgroundColor={colors.tertiary}
                containerStyle={{ borderColor: colors.tertiary }}
              />
            </View> */}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            rowGap: sizes.large,
            paddingBottom: sizes.xlarge,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Carousel
            pageControlPosition={PageControlPosition.UNDER}
            pageControlProps={{
              enlargeActive: true,
            }}
            style={{ paddingBottom: sizes.medium }}
          >
            <Card
              style={{
                padding: sizes.large,
                rowGap: sizes.large,
                // marginHorizontal: sizes.small,
              }}
            >
              <Text style={textStyles.subHeading}>Today's Statistics</Text>

              <View style={[globalStyles.center, { rowGap: sizes.large }]}>
                <View
                  style={[
                    globalStyles.rowCenter,
                    { columnGap: sizes.xxlarge, padding: sizes.small },
                  ]}
                >
                  <ProgressChart
                    data={{
                      data: [0.8],
                    }}
                    hideLegend
                    radius={60}
                    strokeWidth={30}
                    width={160}
                    height={160}
                    chartConfig={chartConfig}
                  />

                  <View style={{ rowGap: sizes.medium }}>
                    <View>
                      <Text style={[textStyles.subTitle, { color: "gray" }]}>
                        Present
                      </Text>
                      <Text style={textStyles.heading}>30</Text>
                    </View>
                    <View>
                      <Text style={[textStyles.subTitle, { color: "gray" }]}>
                        Absent
                      </Text>
                      <Text style={textStyles.heading}>5</Text>
                    </View>
                  </View>
                </View>

                <Text style={textStyles.caption}>Current Subject: PLL</Text>
              </View>
            </Card>

            <Card
              style={{
                padding: sizes.large,
                rowGap: sizes.large,
                marginHorizontal: sizes.medium,
              }}
            >
              <Text style={textStyles.subHeading}>Past 5 Days</Text>

              <View
                style={[
                  globalStyles.rowCenter,
                  { columnGap: sizes.xxlarge, padding: sizes.medium },
                ]}
              >
                <BarChart
                  data={{
                    labels: ["Feb 18", "Feb 19", "Feb 20", "Feb 21", "Feb 22"],
                    datasets: [
                      {
                        data: [20, 21, 26, 22, 24],
                      },
                    ],
                  }}
                  width={screenWidth / 1.3}
                  height={180}
                  yLabelsOffset={30}
                  chartConfig={chartConfig}
                  segments={3}
                  fromZero
                  showValuesOnTopOfBars
                  // withHorizontalLabels={false}
                  // withInnerLines={false}
                />
              </View>
            </Card>
          </Carousel>

          <View>
            <View style={{ marginBottom: sizes.small }}>
              <Text style={[textStyles.subHeading, { color: colors.primary }]}>
                Recent Activities
              </Text>
            </View>

            {activities.map((activity, index) => {
              const isFirst = index === 0;
              const isLast = index === activities.length - 1;

              return (
                <Timeline
                  key={"activity-" + index}
                  {...(!isFirst && {
                    topLine: {
                      type: TimelineLineTypes.DASHED,
                      state: activity.isAlert
                        ? StateTypes.ERROR
                        : StateTypes.SUCCESS,
                    },
                  })}
                  {...(!isLast && {
                    bottomLine: {
                      type: TimelineLineTypes.DASHED,
                      state: activity.isAlert
                        ? StateTypes.ERROR
                        : StateTypes.SUCCESS,
                    },
                  })}
                  point={{
                    state: activity.isAlert
                      ? StateTypes.ERROR
                      : StateTypes.SUCCESS,
                  }}
                >
                  <Card
                    style={{
                      padding: sizes.large,
                      rowGap: sizes.small,
                      marginLeft: sizes.medium,
                      width: "100%",
                    }}
                  >
                    <Text style={textStyles.body}>{activity.message}</Text>
                    <Text style={textStyles.caption}>
                      {activity.date} | {activity.time}
                    </Text>
                  </Card>
                </Timeline>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeTeacher;
