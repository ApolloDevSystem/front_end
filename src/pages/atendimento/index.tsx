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
import { AtendimentoScreenProps, RootStackParamList, servico } from '../types';
import colors from '../../components/colors';
import Item from '../../components/item';
import ModalEscolha from '../../components/modalEscolha';
import TextField from '../../components/textField';
import Concluir from './concluir';
import Select from "../../components/select";
import { RouteProp, useRoute } from '@react-navigation/native';
import { set } from 'date-fns';
import { fetchData } from '../../services/api';

type AtendimentoRouteProp = RouteProp<RootStackParamList, "Atendimento">;

const TaskScreen: React.FC<AtendimentoScreenProps> = ({ navigation }) => {
  const route = useRoute<AtendimentoRouteProp>();
  const { atendimento } = route.params;
  const [observations, setObservations] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<{ id: number; quantidade: number; customPrice?: number, preco?: number }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [concluirVisible, setConcluirVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [dataLocation, setDataLocation] = useState<any>({ longitude: 0, latitude: 0 });
  const [tasks, setTasks] = useState<{ id: number; descricao: string; preco: number }[]>(atendimento.servicos);
  const [servicos, setServicos] = useState<servico[]>([]);
  const [atendimentoData, setAtendimentoData] = useState<{ id: number; observacao: string; selectedTasks: { id: number; quantidade: number; customPrice?: number, preco?: number }[] }>({ id: 0, observacao: '', selectedTasks: [] }); // Estado para armazenar os dados do atendimento

  const fetchServices = async () => {
    const response = await fetchData('servicos');
    setServicos(response);
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  const handleSelectService = (value: string | number) => {
    const serviceId = Number(value);
    const selected = servicos.find(serv => serv.id === serviceId);
    if (!selected) return;

    setTasks(prevTasks => [...prevTasks, { id: selected.id, descricao: selected.descricao, preco: selected.preco }]);
    setServicos(prevServicos => prevServicos.filter(serv => serv.id !== serviceId));
    setSelectedService('');
  };

  const handleComplete = () => {
    console.log('Tarefas selecionadas:', selectedTasks);
    console.log('Observações:', observations);
    console.log('Opção selecionada:', selectedService);

    setAtendimentoData({id: atendimento.id, observacao: observations, selectedTasks: selectedTasks});
    setConcluirVisible(true);
  };

  const buscarCoordenadas = async (cep: string) => {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      const data = await response.json();

      if (data.location) {
        setDataLocation({ latitude: data.location.coordinates.latitude, longitude: data.location.coordinates.longitude });
        console.log("Coordenadas encontradas:", data.location.coordinates);
      } else {
        console.log("Coordenadas não encontradas");
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>('');
  const [wazeUrl, setWazeUrl] = useState<string>('');

  const openMaps = () => {
    buscarCoordenadas(atendimento.cliente_endereco.endereco.cep);
    setGoogleMapsUrl(`https://www.google.com/maps?q=${dataLocation.latitude},${dataLocation.longitude}`);
    setWazeUrl(`https://waze.com/ul?ll=${dataLocation.latitude},${dataLocation.longitude}&navigate=yes`);
    setModalVisible(true);
  };

  const choices = [
    {
      label: 'Google Maps',
      color: '#34A853',
      action: () => Linking.openURL(googleMapsUrl).catch(() =>
        Alert.alert('Erro', 'Não foi possível abrir o Google Maps.'),
      ),
    },
    {
      label: 'Waze',
      color: '#2D89FF',
      action: () => Linking.openURL(wazeUrl).catch(() =>
        Alert.alert('Erro', 'Não foi possível abrir o Waze.'),
      ),
    },
  ];

  const endereco = `${atendimento.cliente_endereco.endereco.bairro}, ${atendimento.cliente_endereco.endereco.logradouro}`

  return (
    <ScrollView style={styles.container}>
      <HeaderSecondary navigation={navigation} />
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>{atendimento.cliente_endereco.cliente.nome}</Text>
          <Text style={styles.subtitle}>Horário Marcado: {atendimento.horario}h</Text>
          <Text style={styles.subtitle}>Endereço: {endereco}</Text>
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
        valorTotal={selectedTasks.reduce((acc, task) => acc + ((task.customPrice ?? task.preco ?? 0) * task.quantidade), 0)}
        atendimentoData={atendimentoData}  // Passando o estado de atendimento para o modal Concluir
        onConfirm={(valorPago: number, desconto: number, metodo: string) => { }}
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
