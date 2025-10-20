import { FontAwesome } from "@expo/vector-icons";

export type TabItem = {
  name: string;
  title: string;
  icon: keyof typeof FontAwesome.glyphMap;
};
