import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
        initialRouteName="Home"
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Pixel Geek" }}
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
