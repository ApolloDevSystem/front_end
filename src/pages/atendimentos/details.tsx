import { View, Text, StyleSheet } from "react-native";
import colors from "../../components/colors";
import Legenda from "../../components/legenda";

type DetailProps = {
    hour: string;
    status:  keyof typeof colors;
}

const Details = ({hour, status}:DetailProps) => {
    return (
        <View style={styles.container}>
            <Legenda color={status} text={hour} borderRadius={10} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      hour: {
        marginRight: 10,
        color: colors.text,
      },
})

export default Details