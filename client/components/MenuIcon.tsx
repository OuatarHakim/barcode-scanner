import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface MenuIconProps {
  icon: string;
  text: string;
  onPress: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <View style={styles.iconContainer}>
        <FontAwesome name={icon} size={40} color="#009f89" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  iconText: {
    marginTop: 10,
  },
  iconButton: {
    alignItems: "center",
  },
});

export default MenuIcon;
