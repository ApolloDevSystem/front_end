import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../colors";

interface TextFieldProps {
    label: string;
    inputValue: string;
    setInputValue: (value: string) => void;
    placeholder?: string;
    tamanho?: 1 | 2
}

export default function TextField({ label, inputValue, setInputValue, placeholder, tamanho = 1 }: TextFieldProps) {
    const inputHeight = tamanho === 1 ? 40 : 80;

    return (
        <View style={styles.observationContainer} >
            <Text style={styles.observationLabel}>{label}</Text>
            <TextInput
                style={[styles.observationInput, { height: inputHeight }]}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder={placeholder ?? 'Escreva...'}
                multiline
            />
        </View >
    )
}

const styles = StyleSheet.create({
    observationContainer: {
        marginTop: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: colors.text,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    observationLabel: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 8,
    },
    observationInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 8,
        textAlignVertical: 'top',
    },
});