import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Menu from "../components/Menu";

export default function ScannerScreen({ route, navigation }: any) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  let panier: { [key: string]: number } = {};

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    await additem(data.replace("item_id=", ""));
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  const additem = async (itemId: string) => {
    if (isNaN(parseInt(itemId))) {
      alert("Article introuvable,essayez à nouveau");
    }
    let rep;
    try {
      rep = await fetch(`http://localhost:8000/items/${itemId}`, {
        method: "GET",
      });
    } catch (e) {
      return;
    }
    const res = await rep.json();
    if (!res) {
      alert("Article introuvale");
      return;
    } else {
      const id = res.id;
    }
  };
  if (hasPermission === null) {
    return <Text style={styles.text}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => additem(/* itemId ici */)}
      >
        <Text style={styles.buttonText}>Ajouter au panier</Text>
      </TouchableOpacity>

      {scanned && (
        <TouchableOpacity
          style={styles.scanAgainButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.scanAgainButtonText}>Scanner à nouveau</Text>
        </TouchableOpacity>
      )}

      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerContainer: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "coral",
    overflow: "hidden",
    marginBottom: 20,
  },
  scanner: {
    flex: 1,
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "coral",
  },
  textInput: {
    width: "70%",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  button: {
    backgroundColor: "#009f89",
    padding: 15,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  scanAgainButton: {
    backgroundColor: "#009f89",
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    marginTop: 10,
  },
  scanAgainButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  viewCartButton: {
    backgroundColor: "#009f89",
    padding: 15,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    marginTop: 20,
  },
  viewCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
