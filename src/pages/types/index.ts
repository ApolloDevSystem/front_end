import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Atendimento = {
    id: number;
    title: string;
    subtitle: string;
    status: string;
    horario: string;
    cliente_endereco: {
        cliente: {
            nome: string;
        }
        endereco: {
            logradouro: string;
            cep: string;
            bairro: string;

        }
    },
    servicos: servico[]
};

export type servico = {
    id: number;
    descricao: string;
    preco: number;
}

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Atendimentos: undefined;
    Agendamento: undefined;
    Equipamentos: undefined;
    Atendimento: {atendimento: Atendimento};
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type AtendimentosScreenProps = NativeStackScreenProps<RootStackParamList, 'Atendimentos'>;
export type AtendimentoScreenProps = NativeStackScreenProps<RootStackParamList, 'Atendimento'>;
