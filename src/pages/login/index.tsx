import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
const LogoImage = require("../../assets/img/logo_color.png");
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [username, setUsername] = React.useState('a');
    const [password, setPassword] = React.useState('a');

    const validarLogin = () => {
        if (username.trim() === '' || password.trim() === '') {
            Alert.alert('Erro', 'Usuário e senha são obrigatórios.');
            return;
        }

        // Aqui você pode adicionar mais validações, como verificar o formato do email, etc.

        // Se as validações passarem, navegue para a próxima tela
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Logo imageSource={LogoImage} />
            <Input
                label="Usuário:"
                placeholder="Digite seu usuário"
                value={username}
                onChangeText={setUsername}
            />
            <Input
                label="Senha:"
                placeholder="Digite sua senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={validarLogin} />
            <Text style={styles.footerText}>KM5 REFRIGERAÇÕES LTDA</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#51789E',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    footerText: {
        marginTop: 20,
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

