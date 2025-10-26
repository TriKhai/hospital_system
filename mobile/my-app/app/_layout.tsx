import "./global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { loadUser } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function AppContent() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
      return;
    }

    if (user?.role) {
      switch (user.role) {
        case "ADMIN":
          router.replace("/(admin)");
          break;
        // case "DOCTOR":
        //   router.replace("/(protected)");
        //   break;
        // case "PATIENT":
        //   router.replace("/(protected)");
        //   break;
        default:
          router.replace("/(public)");
      }
    }
  }, [isAuthenticated, user]);

  return <Slot />;
}

export default function RootLayout() {

  return (
    // <Stack>
    //   <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    //   {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    //   {/* <Stack.Screen name="movie/[id]" options={{ headerShown: false }} /> */}
    // </Stack>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}
