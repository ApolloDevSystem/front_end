import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/login';
import Home from '../pages/home';
import Atendimentos from '../pages/atendimentos';
import Atendimento from '../pages/atendimento';
import { RootStackParamList } from '../pages/types';

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
            <Stack.Screen name="Atendimento" component={Atendimento} />
        </Stack.Navigator>
    );
};

export default Routes;