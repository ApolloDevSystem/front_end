import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface AgendamentoModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    formData: {
        cliente: string;
        endereco: string;
        linkGoogleMaps: string;
        data: string;
        horario: string;
        servicos: {
            instalacao: boolean;
            limpeza: boolean;
            manutencaoEletrica: boolean;
        };
    };
    serviceOptions: { label: string; value: string }[];
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
                        {formData.cliente}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Endereço:</Text>{" "}
                        {formData.endereco}
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
                        .filter(
                            (option: { label: string; value: string }) =>
                                formData.servicos[
                                    option.value as keyof typeof formData.servicos
                                ]
                        )
                        .map((option: { label: string; value: string }) => (
                            <Text key={option.value}>• {option.label}</Text>
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
        flexDirection: "row",
        marginTop: 20,
    },
    confirmButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    cancelButton: {
        backgroundColor: "#FF3B30",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default AgendamentoModal;
