import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import Header from '../../components/header';
import Card from '../../components/card-img';
import Legenda from '../../components/legenda';
import colors from '../../components/colors';
import siena from '../../assets/equipamentos/siena.png';

type Equipamento = {
    id: number;
    title: string;
    subtitle: string;
    category?: string;
    icon: React.ReactNode;
    onPress: () => void;
    image?: string | number; 
};

const equipamentos: Equipamento[] = [
    {
        id: 1,
        title: 'Equipamento 1 ',
        subtitle: 'Detalhes do equipamento 1',
        category: 'asd',
        icon: <Legenda color="red" borderRadius={10} />,
        onPress: () => console.log('Atendimento 1'),
        image: siena,
    },
    {
        id: 2,
        title: 'Equipamento 2',
        subtitle: 'Detalhes do equipamento 2',
        category: 'asd',
        icon: <Legenda color="red" borderRadius={10} />,
        onPress: () => console.log('Atendimento 2'),
    },
    {
        id: 3,
        title: 'Equipamento 3',
        subtitle: 'Detalhes do equipamento 3',
        category: 'asd',
        icon: <Legenda color="red" borderRadius={10} />,
        onPress: () => console.log('Atendimento 3'),
    },
];

const Equipamentos = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Header />
                <Text style={styles.title}>EQUIPAMENTOS</Text>
                <View style={styles.status}>
                    <Legenda color="red" text="Em uso" borderRadius={10} />
                    <Legenda color="green" text="Disponível" borderRadius={10} />
                    <Legenda color="gray" text="Indisponível" borderRadius={10} />
                </View>
                <View style={styles.cardsContainer}>
                    {equipamentos.map((equipamento) => (
                        <Card
                            key={equipamento.id}
                            image={equipamento.image}
                            title={equipamento.title}
                            subtitle={equipamento.subtitle}
                            category={equipamento.category}
                            icon={equipamento.icon}
                            onPress={equipamento.onPress}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: colors.secondary,
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    cardsContainer: {
        paddingHorizontal: 10,
    },
});

export default Equipamentos;