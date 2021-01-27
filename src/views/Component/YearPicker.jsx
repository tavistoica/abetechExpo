import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";

const YearPicker = (props) => {
  const handlePickedOptionChange = (value) => {
    props.getPickedOption(value);
  };

  const fillPicker = () => {
    const optionsArray = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i <= currentYear + 30; i++) {
      optionsArray.push({
        label: `${i}`,
        value: i,
      });
    }
    return optionsArray;
  };

  return (
    <RNPickerSelect
      onValueChange={(value) => handlePickedOptionChange(value)}
      useNativeAndroidPickerStyle={false}
      style={{
        iconContainer: {
          top: 5,
          right: 0,
        },
        inputIOSContainer: {
          alignContent: "center",
          alignItems: "center",
        },
        inputAndroidContainer: {
          alignContent: "center",
          alignItems: "center",
        },
      }}
      placeholder={{ label: "year", value: null }}
      items={fillPicker()}
      Icon={() => {
        return <Chevron size={1.5} color="gray" />;
      }}
    />
  );
};

export default YearPicker;
