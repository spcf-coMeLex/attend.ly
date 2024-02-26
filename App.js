import "react-native-polyfill-globals/auto";
import { NavigationContainer } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "react-native-ui-lib";
import { useShallow } from "zustand/react/shallow";

import globalStyles, { colors } from "./assets/styles/globalStyles";
import MainNavigation from "./navigation/MainNavigation";
import useAuthStore from "./stores/useAuthStore";

SplashScreen.preventAutoHideAsync();

Colors.loadColors({
  $textPrimary: colors.primary,
  $backgroundPrimaryHeavy: colors.primary,
});

const App = () => {
  const [fontsLoaded] = useFonts({
    "Lexend-Regular": require("./assets/fonts/Lexend/Lexend-Regular.ttf"),
    "Lexend-Medium": require("./assets/fonts/Lexend/Lexend-Medium.ttf"),
    "Lexend-SemiBold": require("./assets/fonts/Lexend/Lexend-SemiBold.ttf"),
  });

  const [assets] = useAssets([
    require("./assets/images/icon-back.png"),
    require("./assets/images/logo.png"),
    require("./assets/images/dfinity.png"),
  ]);

  const { isReady, fetchKeyAndIdentity, setIdentity } = useAuthStore(
    useShallow((state) => ({
      isReady: state.isReady,
      fetchKeyAndIdentity: state.fetchKeyAndIdentity,
      setIdentity: state.setIdentity,
    })),
  );

  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      const delegation = queryParams.delegation;

      if (delegation) {
        setIdentity(delegation);
        console.log("Done setting identity");
      }
    }
  }, [url]);

  useEffect(() => {
    fetchKeyAndIdentity();
  }, []);

  if (!isReady || !assets || !fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={globalStyles.flexFull}>
      <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
        <MainNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
