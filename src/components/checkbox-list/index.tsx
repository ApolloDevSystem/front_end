import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Ícones Feather (pode trocar por MaterialIcons)

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
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(newSelected);
  };

  return (
    <View>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <TouchableOpacity
            key={option.value}
            style={styles.checkboxContainer}
            onPress={() => toggleSelection(option.value)}
          >
            <Text style={styles.label}>{option.label}</Text>
            <Icon
              name={isSelected ? "check-square" : "square"}
              size={24}
              color={isSelected ? "#142952" : "#7A869A"} // Cor personalizável
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#142952",
    marginLeft: 10, // Espaço entre o ícone e o texto
  },
});

export default CheckboxList;
