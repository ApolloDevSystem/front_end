import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface ActionCardProps {
    image?: string | number; 
    title: string;
    subtitle: string;
    category?: string;
    icon?: React.ReactNode;
    onPress: () => void;
}

const Card: React.FC<ActionCardProps> = ({
    image,
    title,
    subtitle,
    category,
    icon,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.contentContainer}>
                {/* Container da imagem */}
                {image && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={
                                typeof image === "string"
                                    ? { uri: image }
                                    : image
                            }
                            style={styles.image}
                        />
                    </View>
                )}

                {/* Textos */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    {category && (
                        <Text style={styles.category}>{category}</Text>
                    )}
                </View>
            </View>

            {/* Ícone */}
            <View style={styles.iconContainer}>{icon}</View>
        </TouchableOpacity>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#142952",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    imageContainer: {
        marginRight: 12,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        color: "#AAD6F9",
        fontSize: 14,
        marginBottom: 2,
    },
    category: {
        color: "#7A869A",
        fontSize: 14,
        fontStyle: "italic",
    },
    iconContainer: {
        marginLeft: 8,
    },
});
