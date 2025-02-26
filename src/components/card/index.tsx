import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode; // Agora aceita qualquer componente React, incluindo <Image>
  onPress?: () => void;
}

const Card: React.FC<ActionCardProps> = ({ title, subtitle, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.iconContainer}>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#142952',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#AAD6F9',
    fontSize: 12,
    opacity: 0.8,
  },
});
