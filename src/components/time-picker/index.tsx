import React from "react";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TimePickerProps {
  label?: string;
  value: Date;
  onChange: (time: Date) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange }) => {
  return (
    <View>
      {label && <Text>{label}</Text>}
      <DateTimePicker
        value={value}
        mode="time"
        display="default"
        onChange={(event, selectedTime) => {
          if (selectedTime) onChange(selectedTime);
        }}
      />
    </View>
  );
};

export default TimePicker;
