import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../colors';
import Legenda from '../legenda';

const Calendar: React.FC = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.toLocaleString('pt-BR', { month: 'long' });
    const currentYear = today.getFullYear();

    // Dias no mês atual
    const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();

    // Dias do mês anterior
    const daysInPrevMonth = new Date(currentYear, today.getMonth(), 0).getDate();

    // Preenchimento para alinhar os dias da semana
    const firstDayOfWeek = new Date(currentYear, today.getMonth(), 1).getDay(); // Domingo = 0
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    // Dias para completar o início da semana
    const prevMonthDays = Array.from(
        { length: firstDayOfWeek },
        (_, index) => daysInPrevMonth - firstDayOfWeek + 1 + index
    );

    // Dias para completar o final da semana
    const remainingSquares = (7 - ((daysArray.length + prevMonthDays.length) % 7)) % 7;
    const nextMonthDays = Array.from({ length: remainingSquares }, (_, index) => index + 1);

    // Combinar todos os dias
    const calendarDays = [...prevMonthDays, ...daysArray, ...nextMonthDays];

    return (
        <View style={styles.container}>
            {/* Header com o mês e ano */}
            <Text style={styles.title}>
                {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}, {currentYear}
            </Text>

            {/* Dias da semana */}
            <View style={styles.weekdays}>
                {['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'].map((day) => (
                    <Text key={day} style={styles.weekdayText}>
                        {day}
                    </Text>
                ))}
            </View>

            {/* Dias do mês */}
            <View style={styles.days}>
                {calendarDays.map((day, index) => {
                    const isToday =
                        day === currentDay &&
                        index >= prevMonthDays.length &&
                        index < prevMonthDays.length + daysArray.length;
                    const isPrevMonth = index < prevMonthDays.length;
                    const isNextMonth = index >= prevMonthDays.length + daysArray.length;
                    const isPastDay =
                        index >= prevMonthDays.length &&
                        index < prevMonthDays.length + daysArray.length &&
                        day < currentDay;

                    return (
                        <View
                            key={index}
                            style={[
                                styles.day,
                                isToday && styles.today,
                                isPastDay && styles.pastDay,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    isToday && styles.todayText,
                                    (isPrevMonth || isNextMonth) && styles.otherMonthText,
                                ]}
                            >
                                {day}
                            </Text>
                        </View>
                    );
                })}
            </View>

            {/* Legenda */}
            <Legenda color={'tertiary'} text={"Presença"} />
        </View>
    );
};

export default Calendar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        padding: 15,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        color: colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    weekdays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    weekdayText: {
        fontWeight: 'bold',
        color: colors.secondary,
    },
    days: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    day: {
        width: '14.2857%', // Ajuste para 7 dias por linha
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        margin: 0,
        borderWidth: 0.3,
        borderColor: '#ccc',
    },
    dayText: {
        color: colors.text,
    },
    today: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    todayText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: 40,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    otherMonthText: {
        color: '#aaa', // Menor visibilidade
    },
    pastDay: {
        backgroundColor: colors.tertiary, // Fundo para dias passados
    },
});
