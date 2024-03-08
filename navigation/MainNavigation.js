import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, Text } from "react-native";
import { useShallow } from "zustand/react/shallow";

import BottomTabs from "./BottomTabs";
import Routes from "./Routes";
import { colors } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import ROLES from "../consts/roles";
import AddSection from "../screens/AddSection";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Rewards from "../screens/Rewards";
import ScanCode from "../screens/ScanCode";
import SelectRole from "../screens/SelectRole";
import SignUp from "../screens/SignUp";
import StudentList from "../screens/StudentList";
import StudentProfile from "../screens/StudentProfile";
import SubjectList from "../screens/SubjectList";
import useAuthStore from "../stores/useAuthStore";
import useProfileStore from "../stores/useProfileStore";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const { identity, isRegistered } = useAuthStore(
    useShallow((state) => ({
      identity: state.identity,
      isRegistered: state.isRegistered,
    }))
  );

  const role = useProfileStore((state) => state.role);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.primary,
        animation: "simple_push",
      }}
    >
      {!identity && (
        <Stack.Screen
          name={Routes.LOGIN}
          component={Login}
          options={{
            animationTypeForReplace: "pop",
          }}
        />
      )}

      {identity && !isRegistered ? (
        <>
          <Stack.Screen name={Routes.SELECT_ROLE} component={SelectRole} />
          <Stack.Screen
            name={Routes.SCAN_CODE}
            component={ScanCode}
            initialParams={{ stackView: true }}
          />
          <Stack.Screen name={Routes.SIGN_UP} component={SignUp} />
        </>
      ) : null}

      {identity && isRegistered ? (
        <>
          <Stack.Screen
            name={Routes.HOME}
            component={BottomTabs}
            options={{ animation: "fade_from_bottom" }}
          />

          <Stack.Group
            screenOptions={{
              headerShown: true,
              headerTitle: ({ children }) => (
                <Text style={textStyles.title}>{children}</Text>
              ),
              ...(Platform.OS === "android" && {
                headerBackImageSource: require("../assets/images/icon-back.png"),
              }),
            }}
          >
            <Stack.Screen name={Routes.PROFILE} component={Profile} />
            <Stack.Screen
              name={Routes.STUDENT_PROFILE}
              component={StudentProfile}
              options={({ route }) => {
                const { studentName } = route.params;

                if (studentName.length > 20) {
                  return {
                    title: studentName.substring(0, 10) + "...",
                  };
                }

                return { title: studentName };
              }}
            />

            {role === ROLES.TEACHER && (
              <>
                <Stack.Screen
                  name={Routes.ADD_SECTION}
                  component={AddSection}
                />
                <Stack.Screen
                  name={Routes.SUBJECT_LIST}
                  component={SubjectList}
                  options={({ route }) => ({ title: route.params.className })}
                />
                <Stack.Screen
                  name={Routes.STUDENT_LIST}
                  component={StudentList}
                  options={({ route }) => ({ title: route.params.subjectName })}
                />
              </>
            )}

            {role === ROLES.STUDENT && (
              <Stack.Screen name={Routes.REWARDS} component={Rewards} />
            )}
          </Stack.Group>
        </>
      ) : null}
    </Stack.Navigator>
  );
};

export default MainNavigation;
