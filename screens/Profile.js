import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
} from "react";
import { Alert, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "react-native-ui-lib";
import { Item } from "react-navigation-header-buttons";
import { useShallow } from "zustand/react/shallow";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import FORM_FIELDS from "../consts/formData";
import STATES from "../consts/states";
import useAuthStore from "../stores/useAuthStore";
import useProfileStore from "../stores/useProfileStore";
import getInitialState from "../utils/getInitialState";
import renderInputItem from "../utils/renderInputItem";

const initialState = getInitialState(STATES);

const Profile = ({ navigation }) => {
  const [isViewing, toggleViewMode] = useReducer((state) => !state, true);
  const [profileData, setData] = useReducer(
    (state, data) => ({ ...state, ...data }),
    initialState
  );
  const { profile, role } = useProfileStore(
    useShallow((state) => ({ profile: state.profile, role: state.role }))
  );
  const logout = useAuthStore((state) => state.logout);
  const insets = useSafeAreaInsets();

  // Sync profile data with the store
  useEffect(() => {
    if (profile) {
      setData(profile);
    }
  }, [profile]);

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
    [profileData]
  );

  const userDataFields = useMemo(() => {
    return FORM_FIELDS.filter(
      (field) => !field.forRole || field.forRole === role
    ).map((item) => ({
      ...item,
      isViewing,
    }));
  }, [isViewing, role]);

  const handleUpdateProfile = useCallback(() => {
    if (!isViewing) {
      Alert.alert("Are you sure?", "Do you want to save changes?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            toggleViewMode();
          },
        },
      ]);
    } else {
      toggleViewMode();
    }
  }, [isViewing]);

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
            label={isViewing ? "Update Profile" : "Save Changes"}
            labelStyle={textStyles.subTitle}
            style={{
              marginHorizontal: sizes.xlarge,
              marginVertical: sizes.medium,
            }}
            backgroundColor={isViewing ? colors.primary : "green"}
            enableShadow
            onPress={handleUpdateProfile}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
