import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Atendimento = {
    id: number;
    title: string;
    subtitle: string;
    status: string;
    horario: string;
    cliente_endereco: {
        cliente: cliente,
        endereco: endereco     
    }
    servicos: servico[]
};

export type servico = {
    id: number;
    descricao: string;
    preco: number;
}

export type cliente = {
    id: number;
    nome: string;
}

export type endereco = {
    id: number
    logradouro: string;
    cep: string;
    bairro: string;
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
export type AgendamentoScreenProps = NativeStackScreenProps<RootStackParamList, 'Agendamento'>;
