import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Menu from "../components/Menu";

export default function ShoppingCart({ navigation }: any) {
  const [shoppingCart, setShoppingCart] = useState<
    { id: string; name: string; price: number; quantite: number }[]
  >([]);
  const LOCAL_API_ADRESS = "http://192.168.53.2:8000";

  //update cart
  const updateShoppingCart = async () => {
    try {
      const response = await fetch(`${LOCAL_API_ADRESS}/items`);
      if (!response.ok) {
        console.error("Erreur lors de la récupération d");
        return;
      }

      const data = await response.json();
      setShoppingCart(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles : " + error);
    }
  };

  /**
   *  update quantity of poduct
   * @param name product name
   * @param action action : increment or decrement
   */
  const updateProductQuantity = async (name: string, action: string) => {
    try {
      const response = await fetch(
        `${LOCAL_API_ADRESS}/items/${name}?action=${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name, action: action }),
        }
      );

      if (response.ok) {
        console.log("Quantité mise à jour avec succès");
      } else {
        alert("Erreur lors de la mise à jour de la quantité du produit");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la communication avec le serveur : " + error
      );
    }
  };
  /**
   *  delete product
   * @param itemId id number
   */
  const retirerProduit = async (itemId: number) => {
    try {
      const response = await fetch(`${LOCAL_API_ADRESS}/items/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Produit retiré avec succès");
        updateShoppingCart();
      } else {
        alert("Erreur lors de la suppression du produit");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du produit : " + error);
    }
  };

  useEffect(() => {
    updateShoppingCart();
  }, [shoppingCart]);

  // calcule prix total
  const calculateTotalPrice = () => {
    let totalPrice = shoppingCart.reduce((total, item) => {
      return total + item.price * item.quantite;
    }, 0);
    return totalPrice;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {shoppingCart.map((item) => (
          <View style={styles.itemContainer} key={item.id}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.itemQuantityContainer}>
              <Icon
                name="remove"
                size={24}
                color="#ff0000"
                onPress={() => {
                  updateProductQuantity(item.name, "decrement");
                }}
              />
              <Text style={styles.itemQuantity}>{item.quantite}</Text>
              <Icon
                name="add"
                size={24}
                color="#00ff00"
                onPress={() => {
                  updateProductQuantity(item.name, "increment");
                }}
              />
            </View>
            <Text style={styles.itemPrice}>{item.quantite * item.price}$</Text>
            <Button
              title="Retirer"
              onPress={() => {
                retirerProduit(parseInt(item.id));
              }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total à payer: {calculateTotalPrice()}$
        </Text>
        <Button
          title="Payer"
          onPress={() => {
            navigation.navigate("checkout", { items: shoppingCart });
          }}
        />
      </View>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  scrollView: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalContainer: {
    display: "flex",
    alignItems: "center",
    bottom: 80,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
