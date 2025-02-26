import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Alert, Image } from 'react-native';
import Header from '../../components/header';
import Calendar from '../../components/calendar';
import ActionCard from '../../components/card';

const ItinerarioIcon = require('../../assets/icons/itinerario.png');
const AgendarIcon = require('../../assets/icons/agendar.png');
const CarroIcon = require('../../assets/icons/carro.png');
import type { HomeScreenProps } from "../types";

function Home({ navigation }: HomeScreenProps) {

  const goToAtendimentos = () => {
    navigation.navigate('Atendimentos');
  }
  const goToAgendamentos = () => {
    navigation.navigate('AgendamentoScreen');
  }
  const goToEquipamentos = () => {
    navigation.navigate('Equipamentos');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <Calendar />
        <ActionCard
          title="ATENDIMENTOS"
          subtitle="VEJA SEUS ATENDIMENTOS DO DIA"
          icon={<Image source={ItinerarioIcon} style={styles.icon} />}
          onPress={() => goToAtendimentos()}
        />
        <ActionCard
          title="EQUIPAMENTOS E VEÍCULOS"
          subtitle="GERENCIE EQUIPAMENTOS E VEÍCULOS"
          icon={<Image source={CarroIcon} style={styles.icon}/>}
          onPress={() => goToEquipamentos()}
        />
        <ActionCard
          title="AGENDAR"
          subtitle="SOLICITE O AGENDAMENTO DE UM SERVIÇO"
          icon={<Image source={AgendarIcon} style={styles.icon}/>}
          onPress={() => goToAgendamentos()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
