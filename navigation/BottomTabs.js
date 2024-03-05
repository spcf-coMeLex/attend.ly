import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Routes from "./Routes";
import { colors } from "../assets/styles/globalStyles";
import ROLES from "../consts/roles";
import ClassList from "../screens/ClassList";
import EarnPoints from "../screens/EarnPoints";
import HomeStudent from "../screens/HomeStudent";
import HomeTeacher from "../screens/HomeTeacher";
import ScanCode from "../screens/ScanCode";
import Wallet from "../screens/Wallet";
import useAuthStore from "../stores/useAuthStore";

const Tab = createBottomTabNavigator();

const tabIcons = {
  [Routes.FEED]: {
    focusedIcon: "home",
    unfocusedIcon: "home-outline",
  },
  [Routes.DASHBOARD]: {
    focusedIcon: "pie-chart",
    unfocusedIcon: "pie-chart-outline",
  },
  [Routes.CLASS_LIST]: {
    focusedIcon: "people",
    unfocusedIcon: "people-outline",
  },
  [Routes.EARN_POINTS]: {
    focusedIcon: "sparkles",
    unfocusedIcon: "sparkles-outline",
  },
  [Routes.WALLET]: {
    focusedIcon: "wallet",
    unfocusedIcon: "wallet-outline",
  },
  [Routes.SCAN_CODE]: {
    focusedIcon: "scan",
    unfocusedIcon: "scan-outline",
  },
};

const getTabBarIcon = (props, route) => {
  if (!tabIcons[route.name]) {
    return null;
  }

  const { focused, color, size } = props;
  const { focusedIcon, unfocusedIcon } = tabIcons[route.name];

  return (
    <Ionicons
      name={focused ? focusedIcon : unfocusedIcon}
      size={size}
      color={color}
    />
  );
};

const BottomTabs = () => {
  const role = useAuthStore((state) => state.role);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: (props) => getTabBarIcon(props, route),
      })}
    >
      {role === ROLES.STUDENT && (
        <>
          <Tab.Screen name={Routes.FEED} component={HomeStudent} />
          <Tab.Screen name={Routes.EARN_POINTS} component={EarnPoints} />
          <Tab.Screen name={Routes.WALLET} component={Wallet} />
        </>
      )}

      {role === ROLES.TEACHER && (
        <>
          <Tab.Screen name={Routes.DASHBOARD} component={HomeTeacher} />
          <Tab.Screen name={Routes.CLASS_LIST} component={ClassList} />
        </>
      )}

      <Tab.Screen
        name={Routes.SCAN_CODE}
        component={ScanCode}
        options={{ freezeOnBlur: true, unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
