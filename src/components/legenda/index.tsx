import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../colors';

type LegendaProps = {
  color: keyof typeof colors;
  text?: string;
  borderRadius?: number;
};

const Legenda = ({ color, text, borderRadius }: LegendaProps) => {
  return (
    <View style={styles.legend}>
      <View style={[styles.legendColor, { backgroundColor: colors[color], borderRadius: borderRadius }]} />
      <Text style={[styles.legendText, { color: colors[color] }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    // Remova a cor fixa para permitir a personalização
  },
});

export default Legenda;