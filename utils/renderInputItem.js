import React from "react";
import { Colors, DateTimePicker, Picker } from "react-native-ui-lib";

import { sizes } from "../assets/styles/globalStyles";
import TextInput from "../components/TextInput";

const renderInputItem = ({ item, data, setData }) => {
  // if (item.isViewing) {
  //   const { placeholder, ...rest } = item;
  //   item = rest;
  // }

  if (item.isDate) {
    return (
      <DateTimePicker
        dialogProps={{
          containerStyle: {
            paddingBottom: sizes.xxlarge,
            backgroundColor: Colors.$backgroundDefault,
          },
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
        value={data[item.state]}
        placeholder={item.placeholder}
        items={item.dropdownData}
        onChange={(text) => setData({ [item.state]: text })}
        useWheelPicker
        topBarProps={{
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
      label={item.label}
      value={data[item.state]}
      placeholder={item.placeholder}
      onChangeText={(text) => setData({ [item.state]: text })}
      arePasswordsVisible={item.arePasswordsVisible}
      onTogglePasswordsVisibility={item.togglePasswordsVisibility}
      {...item}
    />
  );
};

export default renderInputItem;
