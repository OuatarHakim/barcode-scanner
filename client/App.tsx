import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./routes/HomeScreen";
import ScannerScreen from "./routes/ScannerScreen";
import ShoppingCart from "./routes/ShoppingCart";
const Stack = createNativeStackNavigator();

/**
 * Fichier Racine du projet App.
 * @constructor
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Panier" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
