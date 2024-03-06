import Ionicons from "@expo/vector-icons/Ionicons";
import { useScrollToTop } from "@react-navigation/native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import QRCode from "react-native-qrcode-svg";
import { Button, Card } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import useTime from "../hooks/useTime";
import Routes from "../navigation/Routes";
import getCoordinates from "../utils/getCoordinates";
import greetings from "../utils/greetings";

const MAX_TO_SHOW = 3;
const SCHOOL_NAME = "Systems Plus College Foundation";
const LAT_DELTA = 0.01;
const LON_DELTA = 0.02;

const achievements = [
  { id: 1, name: "Competed in CodeVita", emoji: "🏆" },
  { id: 2, name: "IRCITE Hackathon", emoji: "🏅" },
  { id: 3, name: "PSITE Quiz Bee", emoji: "🥈" },
  { id: 4, name: "Math Quiz Bee", emoji: "🥉" },
];

const badges = [
  { id: 1, name: "January Challenge", emoji: "🎖️" },
  { id: 2, name: "February Challenge", emoji: "🎖️" },
];

const qrValue = JSON.stringify({
  student: "Mel Mathew",
  attendance: "true",
  subject: "PLL",
});

const HomeStudent = ({ navigation }) => {
  const [schoolCoordinates, setSchoolCoordinates] = useState(null);
  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(true);

  const time = useTime();

  const scrollViewRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Request for location permissions
    Location.requestForegroundPermissionsAsync();

    // Get the coordinates of the school
    getCoordinates(SCHOOL_NAME)
      .then((coords) =>
        setSchoolCoordinates({
          ...coords,
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA,
        }),
      )
      .finally(() => {
        setIsLoadingCoordinates(false);
      });
  }, []);

  const onUserLocationPress = useCallback(() => {
    if (isLoadingCoordinates) {
      return;
    }
    setIsLoadingCoordinates(true);

    Location.getLastKnownPositionAsync()
      .then((location) => {
        mapRef.current?.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LAT_DELTA,
            longitudeDelta: LON_DELTA,
          },
          1000,
        );
      })
      .finally(() => {
        setIsLoadingCoordinates(false);
      });
  }, [isLoadingCoordinates]);

  const onSchoolLocationPress = useCallback(() => {
    if (isLoadingCoordinates) {
      return;
    }

    mapRef.current?.animateToRegion(schoolCoordinates, 1000);
  }, [isLoadingCoordinates, schoolCoordinates]);

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
          ref={scrollViewRef}
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
              <QRCode value={qrValue} size={150} />
            </View>
            <View style={[globalStyles.center, { rowGap: sizes.medium }]}>
              <Text style={textStyles.subHeading}>
                {format(time, "h:mm a")}
              </Text>
              <Text style={textStyles.caption}>Current Subject: DMATH</Text>
              {/* <Text style={textStyles.caption}>Upcoming Subject: DMATH</Text> */}
            </View>
          </Card>

          <Card
            style={[
              globalStyles.row,
              globalStyles.spaceBetween,
              {
                padding: sizes.large,
                rowGap: sizes.large,
              },
            ]}
          >
            <View style={{ rowGap: sizes.large }}>
              <Text style={textStyles.subTitle}>Upcoming Subject</Text>
              <Text style={textStyles.subHeading}>PLL</Text>
              <Text style={textStyles.caption}>9:00 AM - 12:00 PM</Text>
            </View>

            <View>
              <View
                style={{
                  backgroundColor: "lightgray",
                  padding: sizes.small,
                  borderRadius: sizes.small,
                }}
              >
                <Text style={textStyles.body} numberOfLines={6}>
                  30 minutes left
                </Text>
              </View>
            </View>
          </Card>

          <Card
            style={{
              padding: sizes.large,
              rowGap: sizes.large,
            }}
          >
            <View
              style={[
                globalStyles.row,
                globalStyles.spaceBetween,
                { width: "100%" },
              ]}
            >
              <Text style={textStyles.subHeading}>Achievements</Text>
              {achievements.length > MAX_TO_SHOW && (
                <Button
                  label="Show More"
                  labelStyle={textStyles.caption}
                  link
                />
              )}
            </View>

            {/* <Text style={textStyles.caption}>You have no rewards yet.</Text> */}

            <View style={globalStyles.rowCenter}>
              {achievements.slice(0, MAX_TO_SHOW).map((achievement) => (
                <TouchableOpacity
                  key={achievement.id}
                  style={{
                    height: 120,
                    width: 120,
                    alignItems: "center",
                    justifyContent: "center",
                    rowGap: sizes.medium,
                  }}
                >
                  <Text style={textStyles.iconRow}>{achievement.emoji}</Text>
                  <Text
                    style={[
                      textStyles.body,
                      { textAlign: "center", width: "80%" },
                    ]}
                  >
                    {achievement.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Card
            style={{
              padding: sizes.large,
              rowGap: sizes.large,
            }}
          >
            <View
              style={[
                globalStyles.row,
                globalStyles.spaceBetween,
                { width: "100%" },
              ]}
            >
              <Text style={textStyles.subHeading}>Badges</Text>
              {badges.length > MAX_TO_SHOW && (
                <Button
                  label="Show More"
                  labelStyle={textStyles.caption}
                  link
                />
              )}
            </View>

            {/* <Text style={textStyles.caption}>
              You have no achievements yet.
            </Text> */}

            <View style={globalStyles.rowCenter}>
              {badges.slice(0, MAX_TO_SHOW).map((badge) => (
                <TouchableOpacity
                  key={badge.id}
                  style={{
                    height: 120,
                    width: 120,
                    alignItems: "center",
                    justifyContent: "center",
                    rowGap: sizes.medium,
                  }}
                >
                  <Text style={textStyles.iconRow}>{badge.emoji}</Text>
                  <Text
                    style={[
                      textStyles.body,
                      { textAlign: "center", width: "80%" },
                    ]}
                  >
                    {badge.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Card
            style={{
              padding: sizes.large,
              rowGap: sizes.large,
            }}
          >
            <Text style={textStyles.subHeading}>Your School</Text>

            <MapView
              ref={mapRef}
              showsUserLocation
              // followsUserLocation
              region={schoolCoordinates}
              style={{
                width: "100%",
                height: 200,
                borderRadius: sizes.medium,
              }}
            >
              {schoolCoordinates && <Marker coordinate={schoolCoordinates} />}
            </MapView>

            <View
              style={[
                globalStyles.rowCenter,
                {
                  columnGap: sizes.medium,
                  position: "absolute",
                  bottom: sizes.xlargeH,
                  right: sizes.xlargeH,
                },
              ]}
            >
              {isLoadingCoordinates && (
                <ActivityIndicator size="small" color={colors.primary} />
              )}

              <Button
                backgroundColor="rgba(0,0,0,0.2)"
                enableShadow
                size="small"
                onPress={onSchoolLocationPress}
              >
                <Ionicons name="navigate" size={25} color="white" />
              </Button>

              <Button
                backgroundColor="rgba(0,0,0,0.2)"
                enableShadow
                size="small"
                onPress={onUserLocationPress}
              >
                <Ionicons name="person" size={25} color="white" />
              </Button>
            </View>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeStudent;
