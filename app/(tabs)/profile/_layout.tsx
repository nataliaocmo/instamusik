import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function RootLayout() {
  return (
    <Stack
    >
      <Stack.Screen name="index"
        options={{
          title: "InstaMusik.",
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
               <Link href={"/(tabs)/profile/settings"} asChild>
                <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
              </Link>
              
            </View>
          ),
          
        }}
      />
      <Stack.Screen name="editProfile"
        options={{
          title: "Edit Profile",
          
        }}
      />
      <Stack.Screen name="settings"
        options={{
          title: "Settings",
          
        }}
      />
      
      
      
    </Stack>
  );
}