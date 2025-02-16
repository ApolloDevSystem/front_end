import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxListProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ options, selectedValues, onChange }) => {
  const toggleSelection = (value: string) => {
    let newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(newSelected);
  };

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity key={option.value} onPress={() => toggleSelection(option.value)}>
          <Text>{option.label} {selectedValues.includes(option.value) ? "✅" : "⬜"}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CheckboxList;
