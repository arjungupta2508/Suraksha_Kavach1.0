import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ReportScam() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!message && !image) {
      Alert.alert("Error", "Please enter scam details or upload an image.");
      return;
    }
    // TODO: Send to backend or save locally
    Alert.alert("✅ Thank You", "Your report has been submitted for review.");
    setMessage('');
    setImage(null);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📢 Report a Scam</Text>
      <Text style={styles.subtitle}>
        Help others stay safe by reporting suspicious messages or scam attempts.
      </Text>

      {/* Message Input */}
      <Text style={styles.label}>Scam Message Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Paste suspicious SMS or describe the scam..."
        value={message}
        onChangeText={setMessage}
        multiline
      />

      {/* Image Upload */}
      <Text style={styles.label}>Upload Screenshot (optional)</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Ionicons name="image-outline" size={24} color="#1E40AF" />
        <Text style={styles.uploadText}>
          {image ? "Image Selected ✅" : "Choose an Image"}
        </Text>
      </TouchableOpacity>

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="send" size={24} color="#fff" />
        <Text style={styles.submitText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#6B7280', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1F2937' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 14,
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadText: { marginLeft: 10, fontSize: 15, fontWeight: '500', color: '#1E40AF' },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
});
