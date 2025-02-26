import CheckBox from "expo-checkbox";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import colors from "../colors";

interface ItemProps {
    task: {
        id: string;
        descricao: string;
        price: number;
    };
    selectedItems: { id: string; quantity: number; customPrice?: number }[];
    setSelectedItems: (updateFn: (prev: { id: string; quantity: number; customPrice?: number }[]) => { id: string; quantity: number; customPrice?: number }[]) => void;
}

export default function Item({ task, selectedItems, setSelectedItems }: ItemProps) {
    const selectedItem = selectedItems.find((item) => item.id === task.id);
    const [quantity, setQuantity] = useState(selectedItem ? selectedItem.quantity : 1);
    const [customPrice, setCustomPrice] = useState<number>(selectedItem?.customPrice || task.price);

    useEffect(() => {
        if (!selectedItem) {
            setCustomPrice(task.price);
            setQuantity(1);
        }
    }, [task.id, selectedItem]);

    const toggleTask = (taskId: string) => {
        if (selectedItem) {
            // Remover item
            setSelectedItems((prev) => prev.filter((item) => item.id !== taskId));
        } else {
            // Adicionar item com quantidade e preço atual
            setSelectedItems((prev) => [
                ...prev,
                { id: taskId, quantity: quantity, customPrice: customPrice },
            ]);
        }
    };

    const updateQuantity = (newQuantity: string) => {
        const parsedQuantity = parseInt(newQuantity, 10);
        const validQuantity = isNaN(parsedQuantity) || parsedQuantity < 0 ? 0 : parsedQuantity; // Impede quantidade 0 ou negativa
        setQuantity(validQuantity);

        if (selectedItem) {
            setSelectedItems((prev) =>
                prev.map((item) =>
                    item.id === task.id ? { ...item, quantity: validQuantity } : item
                )
            );
        }
    };

    const updateCustomPrice = (newPrice: string) => {
        const cleanedPrice = newPrice.replace("R$", "").replace(",", ".").trim();
        const parsedPrice = parseFloat(cleanedPrice) || task.price; // Se não for um número válido, utiliza o preço original
        setCustomPrice(parsedPrice);

        if (selectedItem) {
            setSelectedItems((prev) =>
                prev.map((item) =>
                    item.id === task.id ? { ...item, customPrice: parsedPrice } : item
                )
            );
        }
    };

    const formattedPrice = customPrice ? "R$ " + (quantity !== 0 ? customPrice * quantity : customPrice).toString() : ""
    const totalPrice = (customPrice * quantity).toFixed(2).replace(".", ",");

    return (
        <View style={styles.taskItem} key={task.id}>
            <CheckBox
                value={!!selectedItem}
                onValueChange={() => toggleTask(task.id)}
            />
            <Text style={styles.taskName}>{task.descricao}</Text>

            {task.price === 0 ? (
                <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={formattedPrice}
                    onChangeText={updateCustomPrice}
                    placeholder="Preço"
                />
            ) : (
                <Text style={styles.taskPrice}>R$ {totalPrice}</Text>
            )}

            {selectedItem && (
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={quantity.toString()}
                    onChangeText={updateQuantity}
                    placeholder="Quantidade"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        shadowColor: colors.text,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    taskName: {
        flex: 1,
        fontSize: 16,
        color: colors.textSecondary,
        marginLeft: 8,
    },
    taskPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        textAlign: "center",
        marginLeft: 8,
        borderRadius: 4,
    },
    priceInput: {
        borderColor: "#ccc",
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
    },
});
