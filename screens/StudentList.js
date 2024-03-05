import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, Share, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import { Button, Card, LoaderScreen } from "react-native-ui-lib";
import { Item } from "react-navigation-header-buttons";

import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import textStyles from "../assets/styles/textStyles";
import { STATUS, STATUS_COLORS } from "../consts/attendanceStatus";
import Routes from "../navigation/Routes";

const students = [
  {
    id: 1,
    name: "Mel Mathew Palana",
    points: 100,
    status: STATUS.PRESENT,
  },
  {
    id: 2,
    name: "Alexander John Camaddo",
    points: 90,
    status: STATUS.ABSENT,
  },
  {
    id: 3,
    name: "Prince Charles Clemente",
    points: 80,
    status: STATUS.LATE,
  },
  {
    id: 4,
    name: "Cathlyn Mae Lapid",
    points: 70,
    status: STATUS.PENDING,
  },
];

const StudentList = ({ navigation, route }) => {
  const [isQrLoading, setIsQRLoading] = useState(false);

  const { sectionCode, subjectCode } = route.params;
  const qrValue = JSON.stringify({ sectionCode, subjectCode });

  const qrCodeRef = useRef(null);
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
              <Ionicons name="qr-code" size={20} color={colors.tertiary} />
            </BorderlessButton>
          )}
        />
      ),
    });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        onPress={() =>
          navigation.navigate(Routes.STUDENT_PROFILE, {
            studentName: item.name,
          })
        }
        style={{
          padding: sizes.large,
          rowGap: sizes.large,
        }}
      >
        <View
          style={[
            globalStyles.rowCenter,
            globalStyles.spaceBetween,
            globalStyles.flexFull,
          ]}
        >
          <View style={[{ rowGap: sizes.large, width: "80%" }]}>
            <Text style={textStyles.title}>{item.name}</Text>

            <View style={[globalStyles.rowCenter, { columnGap: sizes.small }]}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 100,
                  backgroundColor: STATUS_COLORS[item.status.toUpperCase()],
                }}
              />
              <Text style={textStyles.caption}>{item.status}</Text>
            </View>

            <Text style={textStyles.caption}>{item.points} pts</Text>
          </View>

          <View>
            <Button link>
              <Ionicons name="chevron-forward" size={30} />
            </Button>
          </View>
        </View>
      </Card>
    ),
    [],
  );

  const onShareQrCode = useCallback(() => {
    const uri = FileSystem.cacheDirectory + "qr-code.png";

    setIsQRLoading(true);

    qrCodeRef.current.toDataURL((data) => {
      FileSystem.writeAsStringAsync(uri, data, {
        encoding: FileSystem.EncodingType.Base64,
      }).catch((error) => console.log("Error writing file:", error));
    });

    FileSystem.getInfoAsync(uri)
      .then((info) => {
        setIsQRLoading(false);

        if (info.exists) {
          Share.share({
            message: "Join my class",
            url: `file://${uri}`,
          }).catch((error) => console.log("Error sharing:", error));
        }
      })
      .catch((error) => {
        setIsQRLoading(false);
        console.log("Error getting file info:", error);
      });
  }, []);

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

      <LinearGradient
        colors={[colors.tertiary, "gray"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          globalStyles.spaceBetween,
          {
            height: 150,
            padding: sizes.large,
            borderRadius: sizes.medium,
          },
        ]}
      >
        <View style={{ rowGap: sizes.small }}>
          <Text style={[textStyles.heading, { color: "white" }]}>
            Your Students
          </Text>
          <Text style={[textStyles.body, { color: "white" }]}>
            DMATH (9:00 AM - 4:00 PM)
          </Text>
        </View>

        <Text style={[textStyles.caption, { color: "white" }]}>
          {students.length} total students
        </Text>
      </LinearGradient>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          rowGap: sizes.large,
          paddingVertical: sizes.xlarge,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        {isQrLoading && (
          <LoaderScreen overlay messageStyle={{ color: "white" }} />
        )}

        <BottomSheetView
          style={[globalStyles.spaceBetween, { height: snapPoints[0] }]}
        >
          <BottomSheetView
            style={[
              globalStyles.center,
              {
                padding: sizes.xlarge,
                rowGap: sizes.xlarge,
              },
            ]}
          >
            <View style={{ marginBottom: sizes.medium }}>
              <Text style={textStyles.title}>
                Scan QR Code to join this class
              </Text>
            </View>

            <QRCode
              getRef={(ref) => (qrCodeRef.current = ref)}
              value={qrValue}
              enableLinearGradient
              linearGradient={[colors.primary, colors.secondary]}
              logo={require("../assets/images/logo.png")}
              logoSize={50}
              size={200}
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

          <BottomSheetView>
            <Button
              label="Share"
              labelStyle={textStyles.subTitle}
              labelProps={{ margin: sizes.medium }}
              row={false}
              style={{
                marginTop: sizes.medium,
              }}
              enableShadow
              link
              onPress={onShareQrCode}
            >
              <Ionicons name="share" size={45} color={colors.primary} />
            </Button>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default StudentList;
