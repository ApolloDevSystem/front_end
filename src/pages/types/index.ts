import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

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
        }
    }
};


export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Atendimentos: undefined;
    Atendimento: {atendimento: Atendimento};
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type AtendimentosScreenProps = NativeStackScreenProps<RootStackParamList, 'Atendimentos'>;
export type AtendimentoScreenProps = NativeStackScreenProps<RootStackParamList, 'Atendimento'>;
