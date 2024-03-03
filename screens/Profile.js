import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
} from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-ui-lib";
import { Item } from "react-navigation-header-buttons";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import FORM_FIELDS from "../consts/formData";
import STATES from "../consts/states";
import useAuthStore from "../stores/useAuthStore";
import getInitialState from "../utils/getInitialState";
import renderInputItem from "../utils/renderInputItem";

const initialState = getInitialState(STATES);

const Profile = ({ navigation }) => {
  const [profileData, setData] = useReducer(
    (state, data) => ({ ...state, ...data }),
    initialState,
  );
  const logout = useAuthStore((state) => state.logout);
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Item
          title="Log out"
          color={colors.primary}
          buttonStyle={textStyles.body}
          onPress={logout}
        />
      ),
    });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }) =>
      renderInputItem({ key: item.state, item, data: profileData, setData }),
    [profileData],
  );

  const userDataFields = useMemo(() => {
    return FORM_FIELDS.map((item) => ({
      ...item,
      isViewing: true,
    }));
  }, []);

  return (
    <View style={[globalStyles.flexFull, { paddingBottom: insets.bottom }]}>
      <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
        <StatusBar style="dark" />

        <View style={[globalStyles.flexFull, globalStyles.spaceBetween]}>
          <ScrollView
            contentContainerStyle={{
              rowGap: sizes.xxlarge,
              padding: sizes.xlarge,
              paddingBottom: sizes.xxlarge,
            }}
          >
            {userDataFields.map((item) => renderItem({ item }))}
          </ScrollView>

          <Button
            label="Update Profile"
            labelStyle={textStyles.subTitle}
            style={{
              marginHorizontal: sizes.xlarge,
              marginVertical: sizes.medium,
            }}
            enableShadow
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
