import React from 'react';
import { StyleSheet, View, Text, TextInput, TextInputProps } from 'react-native';

type InputProps = {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
} & TextInputProps; // Permite reutilizar todas as props padrão de TextInput

export default function Input({ label, placeholder, secureTextEntry, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#7A869A"
        {...rest} // Passa as props adicionais
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
 