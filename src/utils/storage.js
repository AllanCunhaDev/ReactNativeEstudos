import AsyncStorage from "@react-native-async-storage/async-storage";

const getFavorites = async (key) => {
    const favorites = await AsyncStorage.getItem(key);
    return JSON.parse(favorites) || [];
}

const saveFavorites = async (key, newItem) => {
    let myFavorites = await getFavorites(key);
    let hasItem = myFavorites.some(item => item.id === newItem.id);
    if (hasItem) {
        console.log("TESTANDO")
        return;
    }
    myFavorites.push(newItem);

    await AsyncStorage.setItem(key, JSON.stringify(myFavorites));
    console.log("SALVO")
}

const removeFavorites = async (id) => {
    let receips = await getFavorites("@appreceitas")

    let myFavorites = receips.filter(item => {
        return (item.id !== id)
    })
    await AsyncStorage.setItem("@appreceitas", JSON.stringify(myFavorites));
    console.log("Removed")
    return myFavorites
}

const isFavorites = async (receip) => {
    let myReceips = await getFavorites("@appreceitas");
    const favorite = myReceips.find(item => item.id === receip.id);
    if (favorite) {
        return true;
    }
    return false;
}

export {
    getFavorites,
    saveFavorites,
    removeFavorites,
    isFavorites
}