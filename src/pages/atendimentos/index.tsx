import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderSecondary from '../../components/headerSecondary';
import Card from '../../components/card';
import Legenda from '../../components/legenda';
import colors from '../../components/colors';
import Details from './details';
import { Atendimento, AtendimentosScreenProps } from '../types';
import { fetchData } from '../../services/api'; // Importando a função de requisição

const Atendimentos: React.FC<AtendimentosScreenProps> = ({ navigation }) => {
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const carregarAtendimentos = async () => {
            try {
                const data = await fetchData('atendimentos');
                const atendimentosComStatus = data.map((atendimento: Atendimento) => ({
                    ...atendimento,
                    status: calcularStatus(atendimento.horario)
                }));
                setAtendimentos(atendimentosComStatus);
            } catch (error) {
                console.error("Erro ao buscar atendimentos:", error);
            } finally {
                setLoading(false);
            }
        };

        carregarAtendimentos();
    }, []);

    const calcularStatus = (horario: string) => {
        const horaAtual = new Date();
        const [hora, minuto] = horario.split(':').map(Number);
        const horaAtendimento = new Date();
        horaAtendimento.setHours(hora, minuto, 0, 0);

        if (horaAtendimento < horaAtual) {
            return 'red'; // Em atraso
        } else if (horaAtendimento.toDateString() === horaAtual.toDateString()) {
            return 'gray'; // Em aberto
        }
    };

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

                {loading ? (
                    <ActivityIndicator size="large" color={colors.secondary} />
                ) : (
                    <View style={styles.cardsContainer}>
                        {atendimentos.map((atendimento) => (
                            <Card
                                key={atendimento.id}
                                title={atendimento.cliente_endereco.cliente.nome}
                                subtitle={`Endereço: ${atendimento.cliente_endereco.endereco.logradouro}`}
                                icon={<Details hour={atendimento.horario} status={atendimento.status} />}
                                onPress={() => navigation.navigate("Atendimento", {atendimento})}
                            />
                        ))}
                    </View>
                )}
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