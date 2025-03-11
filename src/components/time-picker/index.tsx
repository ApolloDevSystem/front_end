import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../colors";

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
      <View style={styles.shadowWrapper}>
        <TouchableOpacity style={styles.button} onPress={showTimePicker}>
          <Text style={styles.buttonText}>{selectedTime || "Selecione um horário"}</Text>
        </TouchableOpacity>
      </View>

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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  shadowWrapper: { // Envolve o botão e recebe a sombra
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#ffffff", // Necessário para sombras no iOS
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android
  },
  button: {
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#7A869A",
    fontWeight: "bold",
  },
});


export default TimePicker;
