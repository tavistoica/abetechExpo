import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";

const MonthPicker = (props) => {
  const handlePickedOptionChange = (value) => {
    props.getPickedOption(value);
  };

  const fillPicker = () => {
    const optionsArray = [];
    for (let i = 1; i <= 12; i++) {
      optionsArray.push({
        key: i,
        label: i < 10 ? `0${i}` : `${i}`,
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
      placeholder={{ label: "month", value: null }}
      items={fillPicker()}
      Icon={() => {
        return <Chevron size={1.5} color="gray" />;
      }}
    />
  );
};

export default MonthPicker;
