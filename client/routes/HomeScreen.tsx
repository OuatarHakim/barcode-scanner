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
import { FontAwesome } from "@expo/vector-icons";
import Menu from "../components/Menu";

export default function HomeScreen({ route, navigation }: any) {
  const [cart, setCart] = useState([]);
  const isFocused = useIsFocused();

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
