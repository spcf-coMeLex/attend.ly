import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Card } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import Routes from "../navigation/Routes";

const classes = [
  {
    name: "CCIS5A",
    students: 30,
    startTime: "9:00 AM",
    endTime: "4:00 PM",
    coverEmoji: "🤩",
  },
  {
    name: "CCIS6A",
    students: 25,
    startTime: "7:00 AM",
    endTime: "3:00 PM",
    coverEmoji: "❤️",
  },
];

const ClassList = ({ navigation }) => {
  const isFocused = useIsFocused();

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        onPress={() =>
          navigation.navigate(Routes.STUDENT_LIST, {
            className: item.name,
          })
        }
        style={{
          padding: sizes.large,
          rowGap: sizes.large,
        }}
      >
        <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
          <View style={{ rowGap: sizes.large }}>
            <View style={{ rowGap: sizes.small }}>
              <Text style={textStyles.subHeading}>{item.name}</Text>
              <Text style={textStyles.caption}>{item.students} students</Text>
            </View>

            <View>
              <Text style={textStyles.caption}>Schedule:</Text>
              <Text style={textStyles.body}>
                {item.startTime} - {item.endTime}
              </Text>
            </View>
          </View>

          <View style={{ marginRight: sizes.small }}>
            <Text style={textStyles.iconRow}>{item.coverEmoji}</Text>
          </View>
        </View>
      </Card>
    ),
    [],
  );

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
          <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
            <Text style={textStyles.heading}>Your Classes</Text>

            <View
              style={[
                globalStyles.rowCenter,
                { paddingRight: sizes.small, columnGap: sizes.medium },
              ]}
            >
              <BorderlessButton>
                <Ionicons name="add" size={40} />
              </BorderlessButton>
            </View>
          </View>
        </View>

        <FlatList
          data={classes}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            rowGap: sizes.xlarge,
            paddingBottom: sizes.xlarge,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default ClassList;
