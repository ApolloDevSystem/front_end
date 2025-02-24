import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const NotificationIcon = require('../../assets/icons/notificacao.png');
const ReturnIcon = require('../../assets/icons/return.png');
import NotificationsModal from '../notificacao';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../pages/types';

type HeaderProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {

    const [isModalVisible, setIsModalVisible] = React.useState(false)

    const backPage = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.returnIcon} onPress={() => backPage()}>
                <Image source={ReturnIcon} style={styles.returnIcon} />
            </TouchableOpacity>
            {/*pegar nome do context*/}
            <Text style={styles.userName}>FRANCISCO CHAGAS</Text>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.notificationIcon} onPress={() => setIsModalVisible(true)}>
                    <Image source={NotificationIcon} style={styles.notificationIcon} />
                </TouchableOpacity>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>FC</Text>
                </View>
            </View>
            <NotificationsModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#142952',
        padding: 10,
        marginTop: 25,
        height: 60,
        // borderStartEndRadius: 20,
        // borderEndEndRadius: 20,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    returnIcon: {
        //marginLeft: 5,
        width: 24,
        height: 24,
    },
    userName: {
        color: '#fff',
        fontWeight: 'bold',
    },
    notificationIcon: {
        width: 24,
        height: 24,
        borderRadius: 10,
        marginRight: 10,
    },
    avatar: {
        width: 35,
        height: 35,
        backgroundColor: '#ffca28',
        borderRadius: 17.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontWeight: 'bold',
        color: '#142952',
    },
});
