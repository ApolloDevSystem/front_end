import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../colors';

type LegendaProps = {
  color: keyof typeof colors;
  text?: string;
  borderRadius?: number;
  order?: '1-2' | '2-1';
  text_color?: string;
};

const Legenda = ({ color, text, borderRadius, order = '1-2', text_color }: LegendaProps) => {
  return (
    <View style={styles.legend}>
      {order === '1-2' ? (
        <>
          <View style={[styles.legendColor, { backgroundColor: colors[color], borderRadius: borderRadius }]} />
          <Text style={[styles.legendText, { color: colors[color] }]}>{text}</Text>
        </>
      ) : (
        <>
          <Text style={[styles.legendText,  text_color ? {color: text_color} : { color: colors[color] }]}>{text}</Text>
          <View style={[styles.legendColor, { backgroundColor: colors[color], borderRadius: borderRadius }]} />
        </>

      )}
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
    marginHorizontal: 5,
  },
  legendText: {
    // Remova a cor fixa para permitir a personalização
  },
});

export default Legenda;