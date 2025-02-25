import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Atendimentos: undefined;
    AgendamentoScreen: undefined;
    Equipamentos: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;