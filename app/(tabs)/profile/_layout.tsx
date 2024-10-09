import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext, useState } from "react";
import { DataContext } from "@/context/dataContext/DataContext";
import { newDataProps } from "@/context/dataContext/DataReducer";
export default function RootLayout() {

  const [info, setInfo] = useState(undefined as newDataProps | undefined);
  const username = info?.username ? info.username.toString() : "";

  return (
    <Stack
    >
      <Stack.Screen name="index"
        options={{
          title: username,
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
      <Stack.Screen name="details/[id]"
        options={{
          title: "Post detail",
          
        }}
      /> 
    </Stack>
  );
}