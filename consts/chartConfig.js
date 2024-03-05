const chartConfig = {
  // Gives white background
  backgroundGradientFrom: "transparent",
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,

  // Label and chart colors
  color: (opacity = 1) => `rgba(0, 83, 156, ${opacity})`,

  formatYLabel: (label) => Math.round(label),
  propsForLabels: {
    fontColor: "red",
  },
  barPercentage: 0.8,
};

export default chartConfig;
