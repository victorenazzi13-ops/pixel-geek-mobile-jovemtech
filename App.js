import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native"; // Importados para o funcionamento do Logout

// IMPORTAÇÃO DAS TELAS
import LoginScreen from "./screens/LoginScreen"; 
import HomeScreen from "./screens/HomeScreen";
import ClientesScreen from "./screens/ClientesScreen";
import CurriculosScreen from "./screens/CurriculosScreen";

import { initDatabase } from "./database";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0f172a",
          },

          headerTintColor: "#facc15",

          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 22,
          },

          headerShadowVisible: false,

          animation: "slide_from_right",
        }}
      >
        {/* TELA DE LOGIN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* TELA HOME (COM BOTÃO DE LOGOUT NA BARRA SUPERIOR) */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({ 
            title: "Pixel Geek",
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {
                  navigation.replace('Login');
                }}
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: '#ef4444', fontWeight: 'bold', fontSize: 14 }}>Sair 🚪</Text>
              </TouchableOpacity>
            )
          })}
        />

        <Stack.Screen
          name="Clientes"
          component={ClientesScreen}
          options={{ title: "Cadastro de Nerdolas" }}
        />

        <Stack.Screen
          name="Curriculos"
          component={CurriculosScreen}
          options={{ title: "Currículos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}