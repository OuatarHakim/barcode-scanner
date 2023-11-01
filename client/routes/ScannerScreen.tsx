import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Menu from "../components/Menu";

export default function ScannerScreen({ route, navigation }: any) {
  //adress de l'api
  const LOCAL_API_ADDRESS = "http://192.168.53.2:8000";

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState<undefined | string>(undefined);

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
    await addProductToCart(data, 200, 1, "increment");
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  /**
   *
   * @param name  product name or code
   * @param price  price
   * @param quantite  quantity
   * @param action increment or decrement if product exist and when you delete
   */
  const addProductToCart = async (
    name: string,
    price: number,
    quantite: number,
    action: string
  ) => {
    const produit = {
      name: name,
      price: price,
      quantite: quantite,
    };

    try {
      //Vérifier si l'élément existe // La base de données a été modifier pour recupérer des données a l'aide de name
      const response = await fetch(`${LOCAL_API_ADDRESS}/items/${name}`, {
        method: "GET",
      });
      console.log("Article à ajouter :", { name: name, action: "increment" });

      if (response.ok) {
        // L'élément existe, on incrémente la quantité
        const putResponse = await fetch(
          `${LOCAL_API_ADDRESS}/items/${name}?action=${action}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ name: name, action: "increment" }),
          }
        );

        if (putResponse.ok) {
          alert("Quantité incrémentée avec succès !");
        } else {
          alert("Erreur lors de l'incrémentation de la quantité");
        }
      } else {
        // Le produit  n'existe pas, on l'ajoute
        const postResponse = await fetch(`${LOCAL_API_ADDRESS}/items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produit),
        });

        if (postResponse.ok) {
          alert("Article ajouté avec succès !");
        } else {
          alert("Erreur lors de l'ajout de l'article");
        }
      }
    } catch (error) {
      alert("Erreur lors de la communication avec le serveur : " + error);
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
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Entrer  le nom de produit"
          onChangeText={(value) => setText(value)}
          value={text}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => addProductToCart(text!, 200, 1, "increment")}
        >
          <Text style={styles.buttonText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>

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
    borderWidth: 2,
    width: "100%",
    height: "50%",
  },
  scanner: {
    flex: 1,
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
    backgroundColor: "#00dd00",
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
    backgroundColor: "#00dd00",
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
    backgroundColor: "#00dd00",
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "lightgray",
  },
});
