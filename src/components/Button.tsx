import React from 'react';
import { StyleSheet, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void; // Callback do evento de clique
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#243D59',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
