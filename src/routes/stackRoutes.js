import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../Pages/home";
import { Details } from "../Pages/details";
import { Search } from "../Pages/search";


const Stack = createNativeStackNavigator();

export const StackRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{
                    title: "Detalhes da receita"
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    title: "Veja o que encontramos!"
                }}
            />
        </Stack.Navigator>
    )
}