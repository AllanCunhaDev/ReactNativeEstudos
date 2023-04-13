import { useState, useEffect } from "react";
import {
    View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,
    FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { Logo } from "../../components/logo";
import { FoodsList } from "../../components/foodList";
import Api from "../../services/api"


export function Home() {

    const [inputValue, setInputValue] = useState("");
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        try {
            valueApi = async () => {
                const response = await Api.get("/foods")
                setFoods(response.data);
            }
        } catch (error) {

        }
        valueApi();
    }, [])

    const handleSubmit = () => {
        console.log("Buscando")
        console.log(inputValue)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Logo />
            <Text style={styles.title}>Encontre a receita</Text>
            <Text style={styles.title}>que combina com você</Text>

            <View style={styles.form}>
                <TextInput
                    placeholder="Digite o nome da Receita"
                    style={styles.input}
                    value={inputValue}
                    onChangeText={(param) => setInputValue(param)}
                />
                <TouchableOpacity onPress={handleSubmit}>
                    <Ionicons name="search" color="#4CBE6C" size={28} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={foods}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodsList data={item}/>}
            />


        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F9FF",
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#0e0e0e",
    },
    form: {
        backgroundColor: "#FFF",
        width: "100%",
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#ECECEC",
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        width: "90%",
        maxWidth: "90%",
        height: 54,

    }
})