import { Stack } from "expo-router";

export default function RootLayout() {

  /// -> -> -> -> -> ->   - Stack1
  //             -> ->  - Stack2
  //             -> ->  - Stack3
  return (
    <Stack
    >
      <Stack.Screen name="index"
        options={{
          title: "InstaMusik.",
        }}
      />
      
    </Stack>
  );
}