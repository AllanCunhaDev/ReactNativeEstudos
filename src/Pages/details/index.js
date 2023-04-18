import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { Ingredients } from "../../components/ingredients";
import { Instructions } from "../../components/instructions";
import { Video } from "../../components/video";
import { isFavorites, saveFavorites, removeFavorites, getFavorites } from "../../utils/storage";

export function Details() {
    const route = useRoute();
    const navigation = useNavigation();
    const [showVideo, setShowVideo] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useLayoutEffect(() => {

        const getStatusFavorite = async () => {
            const receipsFavorites = await isFavorite(route.params?.data)
            setIsFavorite(receipsFavorites);
        }
        getStatusFavorite();

        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
            headerRight: () => (
                <Pressable onPress={() => handleFavoriteReceips(route.params.data)}>
                    {isFavorite ? (
                        <Entypo
                            name="heart"
                            size={28}
                            color="#FF4141"
                        />
                    ) : (
                        <Entypo
                            name="heart-outlined"
                            size={28}
                            color="#FF4141"
                        />
                    )}
                </Pressable>

            )
        })

    }, [navigation, route.params?.data, isFavorite])

    const handleFavoriteReceips = async (receip) => {
        if (isFavorite) {
            await removeFavorites(receip.id);
            setIsFavorite(false);
        } else {
            await saveFavorites("@appreceitas", receip);
            setIsFavorite(true);
        }
    }

    const handleOpenVideo = () => {
        setShowVideo(true);
    }
    const shareRecipe = async () => {
        try {
            await Share.share({
                url: 'http://google.com',
                message: `Receita: ${route.params?.data.name}
                \nIngredientes:${route.params?.data.total_ingredients}
                \n Vi lá no App de Receitas`,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 14 }} style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenVideo}>
                <View style={styles.playIcon}>
                    <AntDesign
                        name="playcircleo"
                        size={60}
                        color={"#FAFAFA"}
                    />
                </View>
                <Image
                    source={{ uri: route.params.data.cover }}
                    style={styles.cover}
                />
            </Pressable>

            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{route.params.data.name}</Text>
                    <Text style={styles.ingredientesText}>Ingredientes ({route.params.data.total_ingredients})</Text>
                </View>
                <Pressable onPress={shareRecipe}>
                    <Feather name="share-2" size={24} color="#121212" />
                </Pressable>
            </View>

            {route.params.data.ingredients.map((item) => (
                <Ingredients key={item.id} data={item} />
            ))}

            <View style={styles.instructionArea}>
                <Text style={styles.instructionText}>Modo de preparo</Text>
                <Feather
                    name="arrow-down"
                    size={24}
                    color="#FFF"
                />
            </View>
            {route.params?.data.instructions.map((item, index) => (
                <Instructions key={item.id} data={item} index={index} />

            ))}

            <Modal visible={showVideo} animationType="slide">
                <Video
                    handleClose={() => setShowVideo(false)}
                    videoUrl={route.params?.data.video}
                />
            </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3F9FF",
        paddingTop: 14,
        paddingStart: 14,
        paddingEnd: 14,
    },
    cover: {
        height: 200,
        borderRadius: 14,
        width: "100%",
    },
    playIcon: {
        position: "absolute",
        zIndex: 9,
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        marginTop: 14,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 4,
    },
    ingredientesText: {
        marginBottom: 14,
        fontSize: 16,
    },
    headerDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    instructionArea: {
        backgroundColor: "#4cbe6c",
        flexDirection: "row",
        gap: 10,
        padding: 8,
        borderRadius: 4,
        marginBottom: 14,
    },
    instructionText: {
        fontSize: 18,
        fontWeight: 500,
        color: "#FFFFFF",
    }
})