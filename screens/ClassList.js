import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Button, Card } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import Routes from "../navigation/Routes";

const classes = [
  {
    id: 1,
    code: "CCIS3A",
    students: 40,
    coverEmoji: "👨🏻‍💻",
  },
  {
    id: 2,
    code: "CCIS4A",
    students: 35,
    coverEmoji: "🎉",
  },
  {
    id: 3,
    code: "CCIS5A",
    students: 30,
    coverEmoji: "🤩",
  },
  {
    id: 4,
    code: "CCIS6A",
    students: 25,
    coverEmoji: "❤️",
  },
];

const ClassList = ({ navigation }) => {
  const isFocused = useIsFocused();

  const flatListRef = useRef(null);

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        onPress={() => {
          navigation.navigate(Routes.SUBJECT_LIST, {
            sectionCode: item.code,
          });
        }}
        style={{
          padding: sizes.large,
          rowGap: sizes.large,
        }}
      >
        <View style={globalStyles.rowCenter}>
          <View style={{ padding: sizes.xsmall, marginRight: sizes.xlarge }}>
            <Text style={textStyles.iconRow}>{item.coverEmoji}</Text>
          </View>

          <View
            style={[
              globalStyles.rowCenter,
              globalStyles.spaceBetween,
              globalStyles.flexFull,
            ]}
          >
            <View style={{ rowGap: sizes.small }}>
              <Text style={textStyles.subHeading}>{item.code}</Text>
              <Text style={textStyles.caption}>
                {item.students} total students
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Button link>
                <Ionicons name="ellipsis-vertical" size={25} />
              </Button>
            </View>
          </View>
        </View>
      </Card>
    ),
    []
  );

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
          <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
            <Text style={textStyles.heading}>Your Classes</Text>

            <View
              style={[
                globalStyles.rowCenter,
                {
                  paddingRight: sizes.small,
                  columnGap: sizes.medium,
                },
              ]}
            >
              <BorderlessButton>
                <Ionicons name="add" size={35} />
              </BorderlessButton>
            </View>
          </View>
        </View>

        <FlatList
          data={classes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            rowGap: sizes.large,
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
