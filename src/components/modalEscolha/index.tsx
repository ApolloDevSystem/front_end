import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import colors from "../colors";

interface Choice {
    label: string; // Texto do botão
    color: string; // Cor do botão
    action: () => void; // Ação ao clicar no botão
}

interface ModalEscolhaProps {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    choices: Choice[]; // Lista de opções dinâmicas
}

export default function ModalEscolha({ modalVisible, setModalVisible, choices }: ModalEscolhaProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Escolha uma Opção</Text>
                    {choices.map((choice, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.button, { backgroundColor: choice.color }]}
                            onPress={() => {
                                choice.action();
                                setModalVisible(false); // Fecha o modal após a ação
                            }}
                        >
                            <Text style={styles.buttonText}>{choice.label}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#f44e3f',
        marginTop: 10,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderRadius: 8,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
