// app/(tabs)/easyMode.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../src/context/LanguageContext';

export default function EasyMode() {
  const router = useRouter();
  const { t } = useLanguage();
  const [largeText, setLargeText] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <ScrollView style={[styles.container, highContrast && { backgroundColor: '#000' }]}>
      <Text style={[styles.title, largeText && { fontSize: 32 }, highContrast && { color: '#fff' }]}>
        {t.easyMode.title}
      </Text>
      <Text style={[styles.subtitle, largeText && { fontSize: 22 }, highContrast && { color: '#fff' }]}>
        {t.easyMode.subtitle}
      </Text>

      {/* Scan SMS */}
      <TouchableOpacity 
        style={styles.featureButton} 
        onPress={() => router.push('/scan')}
      >
        <Ionicons name="chatbubble-ellipses" size={50} color="#fff" />
        <Text style={[styles.featureText, largeText && { fontSize: 26 }]}>
          {t.easyMode.scanSMS}
        </Text>
      </TouchableOpacity>

      {/* Scan Image */}
      <TouchableOpacity 
        style={styles.featureButton} 
        onPress={() => router.push('/scan')}
      >
        <Ionicons name="image" size={50} color="#fff" />
        <Text style={[styles.featureText, largeText && { fontSize: 26 }]}>
          {t.easyMode.scanImage}
        </Text>
      </TouchableOpacity>

      {/* View Trends */}
      <TouchableOpacity 
        style={styles.featureButton} 
        onPress={() => router.push('/')}
      >
        <Ionicons name="trending-up" size={50} color="#fff" />
        <Text style={[styles.featureText, largeText && { fontSize: 26 }]}>
          {t.easyMode.viewTrends}
        </Text>
      </TouchableOpacity>

      {/* Alerts */}
      <TouchableOpacity 
        style={styles.featureButton} 
        onPress={() => router.push('/alerts')}
      >
        <Ionicons name="notifications" size={50} color="#fff" />
        <Text style={[styles.featureText, largeText && { fontSize: 26 }]}>
          {t.easyMode.alerts}
        </Text>
      </TouchableOpacity>

      {/* Emergency Call */}
      <TouchableOpacity 
        style={[styles.featureButton, { backgroundColor: 'red' }]} 
        onPress={() => Alert.alert(t.easyMode.emergencyTitle, t.easyMode.emergencyMessage)}
      >
        <Ionicons name="call" size={50} color="#fff" />
        <Text style={[styles.featureText, largeText && { fontSize: 26 }]}>
          {t.easyMode.emergencyHelp}
        </Text>
      </TouchableOpacity>

      {/* Settings */}
      <View style={styles.settings}>
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setLargeText(!largeText)}
        >
          <Text style={styles.toggleText}>
            {largeText ? t.easyMode.normalText : t.easyMode.largeText}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setHighContrast(!highContrast)}
        >
          <Text style={styles.toggleText}>
            {highContrast ? t.easyMode.normalMode : t.easyMode.highContrast}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Back */}
      <TouchableOpacity 
        style={[styles.featureButton, { backgroundColor: '#6B7280' }]} 
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={40} color="#fff" />
        <Text style={[styles.featureText, largeText && { fontSize: 26 }]}>
          {t.easyMode.backToHome}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1F2937', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', color: '#4B5563', marginBottom: 30 },
  featureButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
  },
  featureText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 20,
  },
  settings: {
    marginVertical: 20,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#E5E7EB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  toggleText: { fontSize: 18, fontWeight: '500', color: '#111827' }
});