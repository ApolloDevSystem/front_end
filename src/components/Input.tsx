import React from 'react';
import { StyleSheet, View, Text, TextInput, TextInputProps } from 'react-native';
import colors from './colors';

type InputProps = {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  labelColor?: string; // Agora é opcional para evitar erro se não for passado
} & TextInputProps;

export default function Input({ label, placeholder, labelColor = "#FFFFFF", secureTextEntry, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#7A869A"
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputWrapper: { // Aplica sombra na View que envolve o TextInput
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // No Android, sombra mais forte
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

