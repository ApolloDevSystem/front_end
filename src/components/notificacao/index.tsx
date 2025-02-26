import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

type NotificationProps = {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
};

const NotificationsModal: React.FC<NotificationProps> = ({ isModalVisible, setIsModalVisible }) => {
  // Exemplo de notificações
  const notifications = [
    { id: '1', message: 'Nova mensagem recebida' },
    { id: '2', message: 'Sua tarefa foi concluída' },
    { id: '3', message: 'Atualização de sistema disponível' },
  ];

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Notificações</Text>
          {notifications.map((notification) => (
            <Text key={notification.id} style={styles.notificationText}>
              {notification.message}
            </Text>
          ))}
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationsModal;