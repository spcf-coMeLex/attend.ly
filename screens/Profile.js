import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
} from "react";
import { FlatList, SafeAreaView, View } from "react-native";
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Item
          title="Log out"
          color={colors.tertiary}
          // renderButton={() => (
          //   <Ionicons name="create" size={25} color={colors.primary} />
          // )}'
          onPress={logout}
        />
      ),
    });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }) => renderInputItem({ item, data: profileData, setData }),
    [profileData],
  );

  const userFields = useMemo(() => {
    return FORM_FIELDS.map((item) => ({
      ...item,
      isViewing: true,
    }));
  }, []);

  return (
    <SafeAreaView style={globalStyles.flexFull}>
      <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
        <StatusBar style="dark" />

        <View style={[globalStyles.flexFull, globalStyles.spaceBetween]}>
          <FlatList
            data={userFields}
            keyExtractor={(item) => item.state}
            contentContainerStyle={{
              rowGap: sizes.xxlarge,
              padding: sizes.large,
            }}
            renderItem={renderItem}
          />

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
    </SafeAreaView>
  );
};

export default Profile;
