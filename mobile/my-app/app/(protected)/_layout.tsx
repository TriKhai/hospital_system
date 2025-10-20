import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}
