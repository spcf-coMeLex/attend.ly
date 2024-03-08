import React from "react";
import { Colors, DateTimePicker, Picker } from "react-native-ui-lib";

import { sizes } from "../assets/styles/globalStyles";
import TextInput from "../components/TextInput";

const renderInputItem = ({ key, item, data, setData, value }) => {
  // if (item.isViewing) {
  //   const { placeholder, ...rest } = item;
  //   item = rest;
  // }

  if (item.isDate) {
    const date = new Date((data && data[item.state]) || value);

    return (
      <DateTimePicker
        key={key}
        dialogProps={{
          containerStyle: {
            paddingBottom: sizes.xxlarge,
            backgroundColor: Colors.$backgroundDefault,
          },
        }}
        value={((data && data[item.state]) || value) && date}
        onChange={(text) => {
          if (!item.state) {
            setData(text);
            return;
          }
          setData({ [item.state]: text });
        }}
        editable={!item.isViewing}
        renderInput={(props) => (
          <TextInput
            label={item.label}
            value={props.value}
            placeholder={item.placeholder}
            {...item}
          />
        )}
      />
    );
  }

  if (item.isDropdown) {
    return (
      <Picker
        key={key}
        value={(data && data[item.state]) || value || ""}
        placeholder={item.placeholder}
        items={item.dropdownData}
        onChange={(text) => {
          if (!item.state) {
            setData(text);
            return;
          }
          setData({ [item.state]: text });
        }}
        useWheelPicker
        topBarProps={{
          cancelLabel: "Cancel",
          containerStyle: { padding: sizes.large },
        }}
        useSafeArea
        editable={!item.isViewing}
        renderPicker={(selectedItem) => (
          <TextInput
            label={item.label}
            value={selectedItem}
            placeholder={item.placeholder}
            {...item}
          />
        )}
      />
    );
  }

  return (
    <TextInput
      key={key}
      label={item.label}
      value={(data && data[item.state]) || value || ""}
      placeholder={item.placeholder}
      onChangeText={(text) => {
        if (!item.state) {
          setData(text);
          return;
        }
        setData({ [item.state]: text });
      }}
      arePasswordsVisible={item.arePasswordsVisible}
      onTogglePasswordsVisibility={item.togglePasswordsVisibility}
      {...item}
    />
  );
};

export default renderInputItem;
