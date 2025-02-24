import React from 'react';
import { StyleSheet, View, Text, Image, ImageSourcePropType } from 'react-native';

type LogoProps = {
  title?: string; // O título do logo
  imageSource: ImageSourcePropType; // Fonte da imagem (local ou remota)
};

export default function Logo({ title = 'Apollo', imageSource }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // Deixe circular, se necessário
    // backgroundColor: '#D9D9D9', // Placeholder, caso a imagem não carregue
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});
