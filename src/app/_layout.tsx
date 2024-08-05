import "../global.css";
import { Slot } from "expo-router";
import RecordingProvider from "@/context/RecContext";

export default function Layout() {
  return (
    <RecordingProvider>
      <Slot />
    </RecordingProvider>
  );
}
