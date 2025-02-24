import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../components/colors";
import Legenda from "../../components/legenda";

type DetailProps = {
    hour: string;
    status:  keyof typeof colors;
}

const Details = ({hour, status}:DetailProps) => {
    
    return (
        <TouchableOpacity style={styles.container} >
            <Legenda color={status} text={hour} borderRadius={10} order='2-1'/>
        </TouchableOpacity>
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