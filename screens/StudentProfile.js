import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { BarChart } from "react-native-chart-kit";
import { BorderlessButton } from "react-native-gesture-handler";
import { Button, Card } from "react-native-ui-lib";
import { Item } from "react-navigation-header-buttons";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import { STATUS, STATUS_COLORS } from "../consts/attendanceStatus";
import chartConfig from "../consts/chartConfig";
import calendarTheme from "../utils/calendarTheme";
import renderInputItem from "../utils/renderInputItem";

const screenWidth = Dimensions.get("window").width;

const attendanceOverview = [
  { label: "Total Attendance", value: 120 },
  { label: "Absents", value: 10 },
  { label: "Lates", value: 3 },
];

const monthlyAttendanceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      data: [15, 20, 21, 22, 20],
    },
  ],
};

const dailyAttendanceData = {
  "2024-02-16": { marked: true, dotColor: STATUS_COLORS.PRESENT },
  "2024-02-17": { marked: true, dotColor: STATUS_COLORS.LATE },
  "2024-02-18": { marked: true, dotColor: STATUS_COLORS.PRESENT },
  "2024-02-19": { marked: true, dotColor: STATUS_COLORS.PRESENT },
};

const StudentProfile = ({ navigation, route }) => {
  const [points, setPoints] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const { studentName } = route.params;

  const [firstName, middleName, lastName] = studentName.split(" "); // Testing purposes only
  const studentProfile = [
    { label: "First Name", value: firstName },
    { label: "Middle Name", value: middleName },
    { label: "Last Name", value: lastName },
    { label: "Age", value: "21" },
    { label: "Gender", value: ["Male", "Female"][Math.random() > 0.5 ? 0 : 1] },
    { label: "Birthday", value: new Date().toDateString() },
    { label: "Address", value: "Angeles City, Pampanga" },
    { label: "Parent's Email", value: "parent@gmail.com" },
    {
      label: "Points accumulated",
      value: Math.round(Math.min(250, Math.random() * 100)),
    },
  ];

  const bottomSheetModalRef = useRef(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Item
          renderButton={() => (
            <BorderlessButton onPress={handlePresentModal}>
              <Ionicons name="add-circle" size={25} color={colors.tertiary} />
            </BorderlessButton>
          )}
        />
      ),
    });
  }, [navigation]);

  const snapPoints = useMemo(() => ["75%", "90%"], []);

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        opacity={0.5}
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);

  return (
    <View style={[globalStyles.flexFull, { padding: sizes.large }]}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={{
          rowGap: sizes.xlarge,
          paddingBottom: sizes.xlarge,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Card
          style={{
            padding: sizes.large,
            rowGap: sizes.large,
          }}
        >
          <Text style={textStyles.subHeading}>Student Profile</Text>

          {studentProfile.map((item, index) => (
            <View
              key={index}
              style={[
                globalStyles.rowCenter,
                globalStyles.spaceBetween,
                globalStyles.flexFull,
              ]}
            >
              <View style={[{ rowGap: sizes.large, width: "80%" }]}>
                <Text style={textStyles.subTitle}>{item.label}</Text>
                <Text style={textStyles.caption}>{item.value}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card
          style={{
            padding: sizes.large,
            rowGap: sizes.large,
          }}
        >
          <Text style={textStyles.subHeading}>Attendance Overview</Text>

          <View
            style={[
              globalStyles.rowCenter,
              { columnGap: sizes.xxlarge, padding: sizes.medium },
            ]}
          >
            <BarChart
              data={monthlyAttendanceData}
              width={screenWidth / 1.3}
              height={180}
              yLabelsOffset={30}
              chartConfig={chartConfig}
              segments={3}
              fromZero
              showValuesOnTopOfBars
            />
          </View>

          <View style={{ rowGap: sizes.large }}>
            {attendanceOverview.map((item, index) => (
              <View
                key={index}
                style={[
                  globalStyles.rowCenter,
                  globalStyles.spaceBetween,
                  globalStyles.flexFull,
                ]}
              >
                <Text style={textStyles.caption}>{item.label}: </Text>
                <Text style={[textStyles.body, { color: "black" }]}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Card
          style={{
            padding: sizes.large,
            rowGap: sizes.large,
          }}
        >
          <Text style={textStyles.subHeading}>Daily Attendance</Text>

          <Calendar
            theme={calendarTheme}
            markingType="dot"
            markedDates={dailyAttendanceData}
          />

          <View
            style={{
              padding: sizes.large,
              rowGap: sizes.large,
            }}
          >
            {Object.values(STATUS).map((status, index) => (
              <View
                key={index}
                style={[
                  globalStyles.rowCenter,
                  globalStyles.flexFull,
                  { columnGap: sizes.medium },
                ]}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 100,
                    backgroundColor: STATUS_COLORS[status.toUpperCase()],
                  }}
                />
                <Text style={textStyles.body}>{status}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Button
          label="Export Attendance Data"
          labelStyle={textStyles.subTitle}
          labelProps={{ margin: sizes.medium }}
          row={false}
          style={{
            marginTop: sizes.medium,
          }}
          enableShadow
          link
        >
          <Ionicons name="share" size={40} color={colors.primary} />
        </Button>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={{
            padding: sizes.xlarge,
            rowGap: sizes.xlarge,
          }}
        >
          <View style={{ marginBottom: sizes.medium }}>
            <Text style={textStyles.title}>Give points to this student</Text>
          </View>

          <View style={{ marginBottom: sizes.medium, rowGap: sizes.xlarge }}>
            {renderInputItem({
              item: {
                label: "Points",
                placeholder: "Enter points",
                isDropdown: true,
                dropdownData: [
                  {
                    label: "Please select points:",
                    value: "",
                    activeColor: "gray",
                    inactiveColor: "gray",
                  },
                  { label: "0.5 (High)", value: "0.5" },
                  { label: "0.3 (Average)", value: "0.3" },
                  { label: "0.1 (Low)", value: "0.1" },
                ],
              },
              setData: setPoints,
              value: points,
            })}

            {renderInputItem({
              item: {
                label: "Type",
                placeholder: "Enter type",
                isDropdown: true,
                dropdownData: [
                  {
                    label: "Please select type:",
                    value: "",
                    activeColor: "gray",
                    inactiveColor: "gray",
                  },
                  { label: "Recitation", value: "Recitation" },
                  { label: "Assignment", value: "Assignment" },
                  { label: "Quiz", value: "Quiz" },
                  { label: "Project", value: "Project" },
                ],
              },
              setData: setType,
              value: type,
            })}

            {renderInputItem({
              item: {
                label: "Message",
                placeholder: "Enter message",
              },
              setData: setMessage,
              value: message,
            })}
          </View>

          <Button
            label="Submit"
            labelStyle={textStyles.title}
            style={{
              marginTop: sizes.medium,
            }}
            enableShadow
            onPress={() => {
              setPoints("");
              setType("");
              setMessage("");

              bottomSheetModalRef.current?.close();
            }}
          />

          <Button
            label="Close"
            labelStyle={textStyles.title}
            style={{
              marginTop: sizes.medium,
            }}
            link
            enableShadow
            onPress={() => bottomSheetModalRef.current?.close()}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default StudentProfile;
