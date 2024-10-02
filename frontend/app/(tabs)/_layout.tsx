import React from "react";
import { Tabs } from "expo-router";
import { Home, MessagesSquare, Shapes, User2 } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#f97215",
      }}    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="suggestion"
        options={{
          title: "Suggestion",
          headerShown: false,
          tabBarIcon: ({ color }) => <MessagesSquare color={color} />,
        }}
      />
      <Tabs.Screen
        name="compare"
        options={{
          title: "Compare",
          headerShown: false,
          tabBarIcon: ({ color }) => <Shapes color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <User2 color={color} />,
        }}
      />
    </Tabs>
  );
}
