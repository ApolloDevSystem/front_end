import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Atendimentos: undefined;
    Atendimento: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type AtendimentosScreenProps = NativeStackScreenProps<RootStackParamList, 'Atendimentos'>;
export type AtendimentoScreenProps = NativeStackScreenProps<RootStackParamList, 'Atendimento'>;
