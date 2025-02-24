import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const TaskScreen: React.FC = () => {
  const [observations, setObservations] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const tasks = [
    { id: '1', name: 'Limpeza', price: 130.0 },
    { id: '2', name: 'Troca de Peça', price: 250.0 },
    { id: '3', name: 'Instalação', price: 500.0 },
    { id: '4', name: 'Programar em Assembly', price: 99999.0 },
    { id: '5', name: 'Trocar o Óleo', price: 15.0 },
  ];

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleComplete = () => {
    console.log('Tarefas selecionadas:', selectedTasks);
    console.log('Observações:', observations);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Casa Aasdlkas</Text>
        <Text style={styles.subtitle}>Horário Marcado: 16h</Text>
        <Text style={styles.subtitle}>Endereço: Rua das Carambolas, nº0.</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationText}>ACESSAR LOCALIZAÇÃO</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Tarefas */}
      {tasks.map((task) => (
        <View style={styles.taskItem} key={task.id}>
          <CheckBox
            value={selectedTasks.includes(task.id)}
            onValueChange={() => toggleTask(task.id)}
          />
          <Text style={styles.taskName}>{task.name}</Text>
          <Text style={styles.taskPrice}>R$ {task.price.toFixed(2)}</Text>
        </View>
      ))}

      {/* Observações */}
      <View style={styles.observationContainer}>
        <Text style={styles.observationLabel}>Observações:</Text>
        <TextInput
          style={styles.observationInput}
          value={observations}
          onChangeText={setObservations}
          placeholder="Adicione observações..."
          multiline
        />
      </View>

      {/* Botão Concluir */}
      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeButtonText}>Concluído</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#1d4ed8',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  taskName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  taskPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  observationContainer: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  observationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  observationInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 12,
    textAlignVertical: 'top',
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  completeButton: {
    marginTop: 16,
    backgroundColor: '#1d4ed8',
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
