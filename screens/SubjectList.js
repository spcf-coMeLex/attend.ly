import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { Button, Card } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import Routes from "../navigation/Routes";

const subjects = [
  {
    id: 1,
    code: "PLL",
    description: "Programming Languages",
    timeIn: "8:00 AM",
    timeOut: "10:00 AM",
  },
  {
    id: 2,
    code: "DMATH",
    description: "Discrete Mathematics",
    timeIn: "10:00 AM",
    timeOut: "12:00 PM",
  },
  {
    id: 3,
    code: "MOR",
    description: "Methods of Research",
    timeIn: "1:00 PM",
    timeOut: "3:00 PM",
  },
  {
    id: 4,
    code: "OSL",
    description: "Operating Systems",
    timeIn: "3:00 PM",
    timeOut: "5:00 PM",
  },
  {
    id: 5,
    code: "EMSL",
    description: "Embedded Systems",
    timeIn: "5:00 PM",
    timeOut: "7:00 PM",
  },
];

const SubjectList = ({ navigation, route }) => {
  const { sectionCode } = route.params;

  const renderItem = ({ item }) => (
    <Card
      onPress={() => {
        navigation.navigate(Routes.STUDENT_LIST, {
          subjectCode: item.code,
          sectionCode,
        });
      }}
      style={{
        padding: sizes.large,
        rowGap: sizes.large,
      }}
    >
      <View
        style={[
          globalStyles.rowCenter,
          globalStyles.spaceBetween,
          globalStyles.flexFull,
        ]}
      >
        <View style={[{ rowGap: sizes.large, width: "80%" }]}>
          <Text style={textStyles.title}>{item.code}</Text>
          <Text style={textStyles.body}>{item.description}</Text>
          <Text style={textStyles.caption}>
            {item.timeIn} - {item.timeOut}
          </Text>
        </View>

        <View>
          <Button link>
            <Ionicons name="chevron-forward" size={30} />
          </Button>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={[colors.tertiary, colors.secondary]}
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
          Class Subjects
        </Text>

        <Text style={[textStyles.caption, { color: "white" }]}>
          {subjects.length} total subjects
        </Text>
      </LinearGradient>

      <FlatList
        data={subjects}
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

export default SubjectList;
