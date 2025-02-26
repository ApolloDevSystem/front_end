import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import * as Linking from 'expo-linking';
import HeaderSecondary from '../../components/headerSecondary';
import { AtendimentoScreenProps } from '../types';
import colors from '../../components/colors';
import Item from '../../components/item';
import ModalEscolha from '../../components/modalEscolha';
import TextField from '../../components/textField';
import Concluir from './concluir';
import Select from "../../components/select";

const TaskScreen: React.FC<AtendimentoScreenProps> = ({ navigation }) => {
  const [observations, setObservations] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<{ id: string; quantity: number; customPrice?: number, price?: number }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [concluirVisible, setConcluirVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>('');
  
  // Estado para armazenar as tarefas e serviços dinamicamente
  const [tasks, setTasks] = useState([
    { id: '1', descricao: 'Limpeza', price: 130.0 },
    { id: '2', descricao: 'Troca de Peça', price: 250.0 },
    { id: '3', descricao: 'Instalação', price: 500.0 },
    { id: '5', descricao: 'Trocar o Óleo', price: 15.0 },
  ]);

  const [servicos, setServicos] = useState([
    { id: '4', descricao: 'Lavagem' },
    { id: '6', descricao: 'Revisão' },
    { id: '7', descricao: 'Pintura' },
  ]);

  // Função para adicionar o serviço à lista de tarefas e remover da lista de serviços
  const handleSelectService = (serviceId: string) => {
    const selected = servicos.find(serv => serv.id === serviceId);
    if (!selected) return;

    setTasks(prevTasks => [...prevTasks, { ...selected, price: 0 }]);
    setServicos(prevServicos => prevServicos.filter(serv => serv.id !== serviceId));
    setSelectedService('');
  };

  const handleComplete = () => {
    console.log('Tarefas selecionadas:', selectedTasks);
    console.log('Observações:', observations);
    console.log('Opção selecionada:', selectedService);
    setConcluirVisible(true);
  };

  const latitude = -23.55052;
  const longitude = -46.633308;
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

  const openMaps = () => {
    setModalVisible(true);
  };

  const choices = [
    {
      label: 'Google Maps',
      color: '#34A853',
      action: () => Linking.openURL(googleMapsUrl).catch(() =>
        Alert.alert('Erro', 'Não foi possível abrir o Google Maps.')
      ),
    },
    {
      label: 'Waze',
      color: '#2D89FF',
      action: () => Linking.openURL(wazeUrl).catch(() =>
        Alert.alert('Erro', 'Não foi possível abrir o Waze.')
      ),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <HeaderSecondary navigation={navigation} />
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>Nome do CLiente</Text>
          <Text style={styles.subtitle}>Horário Marcado: 16h</Text>
          <Text style={styles.subtitle}>Endereço: Rua das Carambolas, nº0.</Text>
          <TouchableOpacity style={styles.locationButton} onPress={openMaps}>
            <Text style={styles.locationText}>ACESSAR LOCALIZAÇÃO</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Tarefas */}
        {tasks.map((task) => (
          <Item key={task.id} task={task} selectedItems={selectedTasks} setSelectedItems={setSelectedTasks} />
        ))}

        {/* Select para adicionar serviços */}
        {servicos.length > 0 && (
          <Select
            label="Adicionar serviços"
            objeto={servicos}
            keyLabel="descricao"
            keyPost="id"
            selectedValue={selectedService}
            onValueChange={handleSelectService}
          />
        )}

        {/* Observações */}
        <TextField label="Observação" inputValue={observations} setInputValue={setObservations} tamanho={2} />

        {/* Botão Concluir */}
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Concluído</Text>
        </TouchableOpacity>
      </View>

      <Concluir
        modalVisible={concluirVisible}
        setModalVisible={setConcluirVisible}
        valorTotal={selectedTasks.reduce((acc, task) => acc + (task.customPrice || task.price) * task.quantity, 0)}
        onConfirm={(valorPago: number, desconto: number, metodo: string) => {}}
      />

      <ModalEscolha modalVisible={modalVisible} setModalVisible={setModalVisible} choices={choices} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  main: {
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  locationButton: {
    marginTop: 8,
    backgroundColor: '#e0e7ff',
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
  locationText: {
    color: colors.quatrenary,
    fontWeight: 'bold',
  },
  completeButton: {
    marginTop: 16,
    backgroundColor: colors.tertiary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskScreen;
