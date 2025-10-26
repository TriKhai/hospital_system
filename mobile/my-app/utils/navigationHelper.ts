import { router } from "expo-router";

export function navigateBackByRole(role?: string) {
  switch (role) {
    case "ADMIN":
      router.replace("/(auth)/login");
      break;
    case "DOCTOR":
      router.replace("/(auth)/login");
      break;
    case "PATIENT":
      router.replace("/(public)");
      break;
    default:
      router.replace("/(auth)/login");
      break;
  }
}
