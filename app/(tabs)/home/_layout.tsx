import { Link, Stack } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "InstaMusik.",
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Link href={"/(tabs)/home/notifications"} asChild>
                <TouchableOpacity>
                  <FontAwesome5
                  name="bell" // Notifications icon
                  size={24}
                  style={{ marginRight: 25 }}
                />
                </TouchableOpacity>
              </Link>
              <Link href={"/(tabs)/home/message"} asChild>
                <TouchableOpacity>
                  <FontAwesome5
                  name="envelope" // Message icon
                  size={24}
                  style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="message"
        options={{
          title: "Messages",
          headerRight: () => (
            <FontAwesome5
              name="envelope" // Message icon
              size={24}
              style={{ marginRight: 15 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
          headerRight: () => (
            <FontAwesome5
              name="bell" // Notifications icon
              size={24}
              style={{ marginRight: 15 }}
            />
          ),
        }}
      />
    </Stack>
  );
}
