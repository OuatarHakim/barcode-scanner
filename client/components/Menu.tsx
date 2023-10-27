import React from "react";
import { View, StyleSheet } from "react-native";
import MenuIcon from "./MenuIcon";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MenuIcon
          icon="home"
          text="Accueil"
          onPress={() => navigation.navigate("Accueil")}
        />
        <MenuIcon
          icon="qrcode"
          text="Scanner"
          onPress={() => navigation.navigate("Scanner")}
        />
        <MenuIcon
          icon="shopping-cart"
          text="Panier"
          onPress={() => navigation.navigate("Panier")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Menu;
