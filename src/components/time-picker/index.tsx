import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface CustomTimePickerProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimePicker: React.FC<CustomTimePickerProps> = ({ selectedTime, onTimeSelect }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirm = (time: Date) => {
    const formattedTime = time.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    onTimeSelect(formattedTime);
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showTimePicker}>
        <Text style={styles.buttonText}>{selectedTime || "Selecione um horário"}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        is24Hour
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    color: "#7A869A",
    fontWeight: "bold",
  },
});

export default TimePicker;
