import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  Button,
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { FontAwesome } from "@expo/vector-icons";
import Menu from "../components/Menu";

export default function HomeScreen({ route, navigation }: any) {
  const [cart, setCart] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getPanier = async function () {
      const panier = await SecureStore.getItemAsync("panier");

      if (panier != null) {
        setCart(JSON.parse(panier));
      }
    };
    getPanier();
  }, [isFocused]);

  return <Menu />;
}

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
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    marginTop: 10,
  },
});
