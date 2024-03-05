import "react-native-polyfill-globals/auto";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "react-native-ui-lib";
import { useShallow } from "zustand/react/shallow";

import globalStyles, { colors } from "./assets/styles/globalStyles";
import { QRCodeProvider } from "./contexts/QRCodeContext";
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
    require("./assets/images/card-mask.png"),
  ]);

  const { isReady, identity, fetchKeyAndIdentity, setIdentity } = useAuthStore(
    useShallow((state) => ({
      isReady: state.isReady,
      fetchKeyAndIdentity: state.fetchKeyAndIdentity,
      setIdentity: state.setIdentity,
      role: state.role,
    })),
  );

  const queryClient = new QueryClient();

  useEffect(() => {
    const handleSetIdentity = ({ url }) => {
      if (url && !identity) {
        const { queryParams } = Linking.parse(url);
        const delegation = queryParams.delegation;

        if (delegation) {
          setIdentity(delegation);
          console.log("Done setting identity");
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleSetIdentity);

    return () => {
      subscription.remove();
    };
  }, [identity]);

  useEffect(() => {
    fetchKeyAndIdentity();
  }, []);

  if (!isReady || !assets || !fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={globalStyles.flexFull}>
        <BottomSheetModalProvider>
          <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
            <QRCodeProvider>
              <MainNavigation />
            </QRCodeProvider>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
