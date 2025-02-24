import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import HeaderSecondary from '../../components/headerSecondary';
import Card from '../../components/card';
import Legenda from '../../components/legenda';
import colors from '../../components/colors';
import Details from './details';
import { AtendimentosScreenProps } from '../types';

type Atendimento = {
    id: number;
    title: string;
    subtitle: string;
    icon: JSX.Element;
    onPress: () => void;
  };
  
  const Atendimentos: React.FC<AtendimentosScreenProps> = ({ navigation, route }) => {
    const atendimentos: Atendimento[] = [
      {
        id: 1,
        title: 'Atendimento 1',
        subtitle: 'Detalhes do atendimento 1',
        icon: <Details hour="08:00" status="green" />,
        onPress: () => navigation.navigate("Atendimento"),
      },
      {
        id: 2,
        title: 'Atendimento 2',
        subtitle: 'Detalhes do atendimento 2',
        icon: <Details hour="09:00" status="gray" />,
        onPress: () => navigation.navigate("Atendimento"),
      },
      {
        id: 3,
        title: 'Atendimento 3',
        subtitle: 'Detalhes do atendimento 3',
        icon: <Details hour="10:00" status="red" />,
        onPress: () => navigation.navigate("Atendimento"),
      },
    ];
    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderSecondary navigation={navigation} />
                <Text style={styles.title}>ATENDIMENTOS</Text>
                <View style={styles.status}>
                    <Legenda color="red" text="Em atraso" borderRadius={10} />
                    <Legenda color="green" text="Concluído" borderRadius={10} />
                    <Legenda color="gray" text="Em aberto" borderRadius={10} />
                </View>
                <View style={styles.cardsContainer}>
                    {atendimentos.map((atendimento) => (
                        <Card
                            key={atendimento.id}
                            title={atendimento.title}
                            subtitle={atendimento.subtitle}
                            icon={atendimento.icon}
                            onPress={atendimento.onPress}
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

export default Atendimentos;