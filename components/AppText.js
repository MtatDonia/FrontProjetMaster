import React from "react";

import { StyleSheet, Text} from "react-native";
import colors from "../config/colors";

function AppText({children}) {
    return <Text style={styles.text}>{children}</Text>;
}
const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: colors.black,
        fontWeight: '300',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default AppText;