import { View, Text, StyleSheet } from "react-native"

export function Logo() {
    return (
        <View style={styles.logoContainer}>
            <Text style={styles.logo}>Guia de Receitas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
logoContainer: {
    backgroundColor: "#4CBE6C",
    alignSelf: "flex-start",
    padding: 8,
    paddingLeft: 16,
    paddingRight: 24,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 32,
    marginBottom: 8,
},
logo:{
fontSize: 18,
fontWeight: 'bold',
color: "#FFF",
}


})