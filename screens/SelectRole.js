import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Card } from "react-native-ui-lib";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import ROLES from "../consts/roles";
import Routes from "../navigation/Routes";
import useAuthStore from "../stores/useAuthStore";

const roleOptions = [
  {
    role: ROLES.STUDENT,
    icon: "🙋🏽‍♂️",
    title: "Student",
  },
  {
    role: ROLES.TEACHER,
    icon: "👩🏻‍🏫",
    title: "Teacher",
  },
];

const SelectRole = ({ navigation }) => {
  const [selected, setSelected] = useState("");

  const logout = useAuthStore((state) => state.logout);

  const handleContinue = useCallback(() => {
    switch (selected) {
      case ROLES.STUDENT:
        navigation.navigate(Routes.SCAN_CODE);
        // navigation.navigate(Routes.SIGN_UP, { role: ROLES.STUDENT });
        break;
      case ROLES.TEACHER:
        navigation.navigate(Routes.SIGN_UP, { role: ROLES.TEACHER });
        break;
    }
  }, [navigation, selected]);

  return (
    <SafeAreaView style={[globalStyles.flexFull, globalStyles.androidPadding]}>
      <StatusBar style="auto" animated />

      <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
        <View style={[globalStyles.row, { justifyContent: "flex-end" }]}>
          <TouchableOpacity
            onPress={logout}
            style={{
              margin: sizes.medium,
              padding: sizes.small,
            }}
          >
            <Text style={[textStyles.link, { textAlign: "right" }]}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.flexCenter}>
          <View style={{ marginBottom: sizes.xxlarge }}>
            <Text style={textStyles.heading}>Select your role</Text>
          </View>

          <View
            style={[
              globalStyles.rowCenter,
              {
                columnGap: sizes.xxlarge,
              },
            ]}
          >
            {roleOptions.map((option) => (
              <Card
                key={option.role}
                selected={selected === option.role}
                selectionOptions={{
                  color: colors.primary,
                  indicatorSize: sizes.xxlarge,
                }}
                onPress={() => setSelected(option.role)}
                style={[
                  globalStyles.center,
                  {
                    padding: sizes.xlarge,
                    rowGap: sizes.medium,
                  },
                ]}
              >
                <Text style={textStyles.icon}>{option.icon}</Text>
                <Text style={textStyles.title}>{option.title}</Text>
              </Card>
            ))}
          </View>
        </View>

        <Button
          label="Continue"
          labelStyle={textStyles.subTitle}
          style={{
            marginHorizontal: sizes.xlarge,
            marginVertical: sizes.medium,
          }}
          enableShadow
          onPress={handleContinue}
          disabled={!selected}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectRole;
