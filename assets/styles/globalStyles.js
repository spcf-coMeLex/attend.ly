import { StatusBar, StyleSheet } from "react-native";

export const sizes = {
  xsmall: 3,
  small: 5,
  medium: 10,
  large: 15,
  xlarge: 20,
  xlargeH: 25,
  xxlarge: 30,
};

export const colors = {
  primary: "#00539CFF",
  secondary: "#EEA47FFF",
  tertiary: "#192F6A",
};

const globalStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  androidPadding: {
    paddingTop: StatusBar.currentHeight,
  },
});

export default globalStyles;
