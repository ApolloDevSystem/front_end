import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { servico, cliente, endereco } from "../../pages/types";

interface AgendamentoModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    formData: {
        cliente: cliente;
        endereco: endereco;
        linkGoogleMaps: string;
        data: string;
        horario: string;
        servicos: servico[];
    };
    serviceOptions: servico[];
}

const AgendamentoModal: React.FC<AgendamentoModalProps> = ({
    visible,
    onClose,
    onConfirm,
    formData,
    serviceOptions,
}) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Confirme seu Agendamento</Text>
                    <Text>
                        <Text style={styles.label}>Cliente:</Text>{" "}
                        {formData.cliente.nome}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Endereço:</Text>{" "}
                        {formData.endereco.logradouro}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Data:</Text> {formData.data}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Horário:</Text>{" "}
                        {formData.horario}
                    </Text>
                    <Text style={styles.label}>Serviços:</Text>
                    {serviceOptions
                        .filter((option: servico) =>
                            formData.servicos[option.descricao as keyof typeof formData.servicos]
                        )
                        .map((option: servico) => (
                            <Text key={option.descricao}>• {option.descricao}</Text>
                        ))}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={onConfirm}
                        >
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
    },
    buttonContainer: {
        marginTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FF5722',
    },
    confirmButton: {
        marginTop: 12,
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AgendamentoModal;
