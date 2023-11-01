/*import React from "react";
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
        <FontAwesome name={icon} size={40} color="#00dd00" />
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

export default MenuIcon;*/

import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MenuIconProps {
  iconName: string;
  text: string;
  onPress: () => void;
  isHighlighted: boolean;
}

const MenuIcon: React.FC<MenuIconProps> = ({
  iconName,
  text,
  onPress,
  isHighlighted,
}) => {
  const iconColor = isHighlighted ? "#00dd00" : "gray";

  return (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={iconName} size={30} color={iconColor} />
        <Text style={{ color: iconColor }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  iconButton: {
    alignItems: "center",
  },
});

export default MenuIcon;
