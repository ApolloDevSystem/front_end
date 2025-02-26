import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../colors';

interface CustomSelectProps<T> {
  label: string;
  objeto: T[];
  keyLabel: keyof T;
  keyPost: keyof T;
  selectedValue: T[keyof T];
  onValueChange: (value: T[keyof T]) => void;
}

const CustomSelect = <T,>({
  label,
  objeto,
  keyLabel,
  keyPost,
  selectedValue,
  onValueChange,
}: CustomSelectProps<T>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
          <Picker.Item label="Selecione..." value="" />
          {objeto.map((item) => (
            <Picker.Item
              key={String(item[keyPost])}
              label={String(item[keyLabel])}
              value={item[keyPost]}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,

  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: colors.text,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default CustomSelect;
