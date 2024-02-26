import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, Text } from "react-native";

import BottomTabs from "./BottomTabs";
import Routes from "./Routes";
import { colors } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import AddClass from "../screens/AddClass";
import AddStudent from "../screens/AddStudent";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import ScanCode from "../screens/ScanCode";
import SelectRole from "../screens/SelectRole";
import SignUp from "../screens/SignUp";
import StudentList from "../screens/StudentList";
import useAuthStore from "../stores/useAuthStore";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const identity = useAuthStore((state) => state.identity);
  const isRegistered = useAuthStore((state) => state.isRegistered);

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
          <Stack.Screen name={Routes.SCAN_CODE} component={ScanCode} />
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
              name={Routes.STUDENT_LIST}
              component={StudentList}
              options={({ route }) => ({ title: route.params.className })}
            />
            <Stack.Screen name={Routes.ADD_CLASS} component={AddClass} />
            <Stack.Screen name={Routes.ADD_STUDENT} component={AddStudent} />
          </Stack.Group>
        </>
      ) : null}
    </Stack.Navigator>
  );
};

export default MainNavigation;
