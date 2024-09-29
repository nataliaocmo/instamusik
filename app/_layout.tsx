import { AuthProvider } from "@/context/authContext/AuthContext";
import { Stack } from "expo-router";
import "../utils/firebaseConfig"

export default function RootLayout() {
  return (
    
    <AuthProvider>
        <Stack
          screenOptions={{
              headerShown:false
          }}
      >
        <Stack.Screen name="main" options={{title:'Begin'}}  />
        <Stack.Screen name="signin" options={{title:'SignIn'}} />
        <Stack.Screen name="signup" options={{title: 'SignUp'}}  />
        <Stack.Screen name="(tabs)"  />
     </Stack>
    </AuthProvider>
    
  );
}