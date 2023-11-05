import { useStripe } from "@stripe/stripe-react-native";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  Button,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
} from "react-native";

export default function CheckoutScreen({ route }: any) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");

  const apiUrl = Constants.expoConfig.extra.apiUrl;
  const userId = "cus_OmpJZapHkM2keT";

  const items = route.params.items;

  let amount = items.reduce((total: number, item: any) => {
    return (total += item.price * item.quantite);
  }, 0);

  let itemsId: number[] = [];

  items.forEach((item: { id: number; quantite: number }) => {
    for (let i = 0; i < item.quantite; i++) {
      itemsId.push(item.id);
    }
  });

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${apiUrl}/payments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pending_items: items,
        customer_id: userId,
      }),
    });

    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: false,
    });

    if (!error) {
      setPaymentIntentId(paymentIntent);
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      const paymentIntent = `pi_${paymentIntentId.split("_")[1]}`;
      const response = await fetch(
        `${apiUrl}/payments/check/${paymentIntent}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: userId,
          }),
        }
      );

      if (response.status == 200)
        Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      <Button disabled={!loading} title="Checkout" onPress={openPaymentSheet} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} key={item.id}>
            <Text style={styles.itemName}>Produit: {item.name}</Text>
            <Text style={styles.itemQuantity}>
              Nombre d'unité: {item.quantite}
            </Text>
            <Text style={styles.itemCost}>
              Prix: {(item.price / 100).toFixed(2)} €
            </Text>
            <Text style={styles.itemTotal}>
              Total : {((item.price * item.quantite) / 100).toFixed(2)} €
            </Text>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: {(amount / 100).toFixed(2)} €
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    marginVertical: 8,
  },
  itemName: {
    fontSize: 18,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#888",
  },
  itemCost: {
    fontSize: 16,
    color: "#333",
  },
  itemTotal: {
    fontSize: 16,
    color: "#444",
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginTop: 16,
  },
});
