import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useContext, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { AuthContext } from '@/context/authContext/AuthContext';

export default function Index() {  
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const verifyLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all the fields");
      return;
    }

    try {
      await login(email, password);
      router.push('/(tabs)/home');
      Alert.alert("Discover and share new experiences :)");
    } catch (error) {
      Alert.alert("Check your credentials", "Credentials do not match");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
            nestedScrollEnabled={true}
          >
            <LottieView
              source={require("@/assets/lottie/astro.json")} // Reemplaza con la ruta a tu archivo JSON de Lottie
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.header}>Welcome to InstaMusik</Text>
            <TextInput
              style={styles.input}
              placeholder="User"
              onChangeText={setEmail}
              placeholderTextColor={"grey"}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              placeholderTextColor={"grey"}
              secureTextEntry
            />
            <TouchableOpacity onPress={verifyLogin} style={styles.button}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <Text>-Or-</Text>
            <Link href="/signup" asChild>
              <Button
                onPress={() => login(email, password)}
                color="#b37fff"
                title="Create an Account"
              />
            </Link>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6704f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    width: 150,
    height: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
