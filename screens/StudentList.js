import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { Card } from "react-native-ui-lib";

import globalStyles, { sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";

const students = [
  {
    id: 1,
    name: "Mel Mathew Palana",
  },
  {
    id: 2,
    name: "Alexander Camaddo",
  },
];

const StudentList = () => {
  const renderItem = useCallback(
    ({ item }) => (
      <Card
        onPress={() => console.log("Student clicked")}
        style={{
          padding: sizes.large,
          rowGap: sizes.large,
        }}
      >
        <Text style={textStyles.title}>{item.name}</Text>
        <Text style={textStyles.body}>ID: {item.id}</Text>
      </Card>
    ),
    [],
  );

  return (
    <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
      <StatusBar style="dark" />

      {/* <View
            style={{
              marginTop: sizes.medium,
              marginBottom: sizes.xlarge,
            }}
          >
            <View style={[globalStyles.rowCenter, globalStyles.spaceBetween]}>
              <View
                style={[globalStyles.rowCenter, { columnGap: sizes.small }]}
              >
                <BorderlessButton onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back"
                    size={35}
                    color={colors.primary}
                  />
                </BorderlessButton>

                <Text style={textStyles.subHeading}>{className} Students</Text>
              </View>

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
          </View> */}

      <FlatList
        data={students}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          rowGap: sizes.xlarge,
          paddingBottom: sizes.xlarge,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default StudentList;
