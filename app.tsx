// App.tsx
import 'expo-router/entry';   // ✅ expo-router entry point (do not remove)
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { initializeDB } from './src/constants/db/index'; // <-- updated import

export default function App() {
  // Initialize DB when app starts
  useEffect(() => {
    (async () => {
      try {
        await initializeDB(); // <-- use this instead of initDb()
        console.log("✅ Database initialized");
      } catch (err) {
        console.error("❌ DB init error:", err);
      }
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Expo Router handles navigation from /app folder */}
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
