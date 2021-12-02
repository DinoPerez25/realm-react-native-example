import React, { useEffect, useState } from "react";
import { View, TextInput, Alert, StyleSheet } from "react-native";
import { useAuth } from "../../Contexts/AuthContext";
import { Button, Text, Modal, Spinner } from '@ui-kitten/components';

export function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp, signIn } = useAuth();

  useEffect(() => {
    if (user != null) {
      navigation.navigate("MenuSection");
    }
  }, [user]);

  const onPressSignIn = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };
  const onPressSignUp = async () => {
    try {
      setLoading(true);
      await signUp(email, password);
      await signIn(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>

      <Modal visible={loading} backdropStyle={styles.backdrop}>
        <Spinner></Spinner>
      </Modal>
      <Text>Iniciar sesión:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Correo"
          style={styles.inputStyle}
          autoCapitalize="none"
          keyboardType="email-address"

        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Contraseña"
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button onPress={onPressSignIn} disabled={loading}>Iniciar sesión</Button>
        </View>
        <View style={styles.button}>
          <Button
            onPress={onPressSignUp}
            size='small'
            appearance='ghost'
            disabled={loading}>
            Registrase
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    with: '100%',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '70%',
    marginVertical: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingLeft: 15,
    width: '100%',
  },
  buttonsContainer: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 5,
  }
});
