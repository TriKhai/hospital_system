import { Stack } from "expo-router";
import "./global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    // <Stack>
    //   <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    //   {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    //   {/* <Stack.Screen name="movie/[id]" options={{ headerShown: false }} /> */}
    // </Stack>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Slot /> 
      </PersistGate>
    </Provider>
  );
}
