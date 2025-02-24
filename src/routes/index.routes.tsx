import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/login';
import Home from '../pages/home';
import Atendimentos from '../pages/atendimentos';
import { RootStackParamList } from '../pages/types';
import AgendamentoScreen from '../pages/agendamento';

const Routes = () => {
    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Login"
            screenOptions={
                {
                    headerShown: false

                }
            }>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Atendimentos" component={Atendimentos} />
            <Stack.Screen name="AgendamentoScreen" component={AgendamentoScreen} />
        </Stack.Navigator>
    );
};

export default Routes;