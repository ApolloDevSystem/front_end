import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../colors";

interface CustomDatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const DatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onDateSelect }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
    onDateSelect(formattedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.shadowWrapper}>
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>{selectedDate || "Selecione uma data"}</Text>
        </TouchableOpacity>
      </View>
  
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        themeVariant="light"
        pickerContainerStyleIOS={styles.modalStyle}
        textColor="#142952"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginBottom: 15
  },
  shadowWrapper: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#FFFFFF", // Necessário para sombras no iOS
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Para Android
  },
  button: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#7A869A",
    fontWeight: "bold",
  },
  modalStyle: {
    backgroundColor: "#D0E4FF",
    borderRadius: 12,
  },
});


export default DatePicker;
