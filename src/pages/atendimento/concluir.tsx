import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import Select from '../../components/select';


interface ConcluirProps {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    valorTotal: number;
    onConfirm: (valorPago: number, desconto: number, metodo: string) => void;
}

export default function Concluir({
    modalVisible,
    setModalVisible,
    valorTotal,
    onConfirm,
}: ConcluirProps) {
    const [desconto, setDesconto] = useState(0);
    const [valorPago, setValorPago] = useState(0);
    const [metodo, setMetodo] = useState('Dinheiro');

    const handleConfirm = () => {
        onConfirm(valorPago, desconto, metodo);
        setModalVisible(false);
    };

    const metodos = [
        { label: 'Dinheiro', value: 'Dinheiro' },
        { label: 'Cartão de Crédito', value: 'Cartão de Crédito' },
        { label: 'Cartão de Débito', value: 'Cartão de Débito' },
        { label: 'PIX', value: 'PIX' },
    ]

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Pagamento</Text>
                    <Text style={styles.label}>Valor Total: R$ {valorTotal.toFixed(2)}</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Desconto:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={desconto.toString()}
                            onChangeText={(text) => setDesconto(Number(text) || 0)}
                            placeholder="0,00"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Valor Pago:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={valorPago.toString()}
                            onChangeText={(text) => setValorPago(Number(text) || 0)}
                            placeholder="0,00"
                        />
                    </View>

                    <Select objeto={metodos} label="Método de Pagamento:" keyLabel={"label"} keyPost={"value"} selectedValue={metodo} onValueChange={setMetodo} />

                    <TouchableOpacity
                        style={[styles.button, styles.pixButton, {backgroundColor: metodo === 'PIX' ? '#4CAF50' : '#ccc'}]}
                        onPress={() => console.log('Gerar QR Code para PIX')}
                        disabled={metodo !== 'PIX'}
                    >
                        <Text style={styles.buttonText}>Gerar QR Code PIX</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
                    </TouchableOpacity>

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
        width: '90%',
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        width: '100%',
    },
    select: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 4,
    },
    button: {
        marginTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    pixButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    confirmButton: {
        marginTop: 12,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FF5722',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
