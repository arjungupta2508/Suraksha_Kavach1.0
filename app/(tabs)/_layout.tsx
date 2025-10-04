// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../src/context/LanguageContext';

export default function TabLayout() {
  const { t } = useLanguage();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: '#9CA3AF',
        headerStyle: {
          backgroundColor: '#1E40AF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shield" size={size} color={color} />
          ),
        }}
      />

      {/* Scan Tab */}
      <Tabs.Screen
        name="scan"
        options={{
          title: t.tabs.scan,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          ),
        }}
      />

      {/* Emergency Tab */}
      <Tabs.Screen
        name="emergency"
        options={{
          title: t.tabs.emergency,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" size={size} color={color} />
          ),
        }}
      />

      {/* Alerts Tab */}
      <Tabs.Screen
        name="alerts"
        options={{
          title: t.tabs.alerts,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: t.tabs.profile,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      {/* Hide other screens from tab bar */}
      <Tabs.Screen
        name="trends"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="easyMode"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}