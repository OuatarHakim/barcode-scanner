import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./routes/HomeScreen";
import ScannerScreen from "./routes/ScannerScreen";
import ShoppingCart from "./routes/ShoppingCart";
import CheckoutScreen from "./CheckoutScreen";
import HistoryScreen from "./routes/HistoryScreen";
import Constants from "expo-constants";
const Stack = createNativeStackNavigator();
const stripePK = Constants.manifest.extra.stripePK; // Assurez-vous d'avoir le bon chemin d'accès à votre clé publiable Stripe
import { StripeProvider } from "@stripe/stripe-react-native";

/**
 * Fichier Racine du projet App.
 * @constructor
 */
export default function App() {
  return (
    <StripeProvider
      publishableKey={stripePK}
      merchantIdentifier="merchant.com.example"
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Accueil" component={HomeScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="Panier" component={ShoppingCart} />
          <Stack.Screen name="checkout" component={CheckoutScreen} />
          <Stack.Screen name="Historique" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
