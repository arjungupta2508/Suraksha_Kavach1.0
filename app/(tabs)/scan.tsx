import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system/legacy";

interface ScamResult {
  isScam: boolean;
  confidence: number;
  flags: string[];
  category?: string;
  recommendations: string[];
}

export default function ScanScreen() {
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [scamResult, setScamResult] = useState<ScamResult | null>(null);

  // ---------------- Scam Analysis ----------------
  const analyzeForScam = (text: string): ScamResult => {
    const flags: string[] = [];
    let confidence = 0;
    let category: string | undefined = undefined;

    const patterns = [
      { regex: /urgent|act now|limited time|expires soon|immediate action/i, flag: 'Urgency tactics detected', weight: 15, cat: 'Urgency Scam' },
      { regex: /verify your account|suspended|confirm identity|update payment/i, flag: 'Account phishing attempt', weight: 20, cat: 'Phishing' },
      { regex: /winner|congratulations|prize|lottery|claim.*reward/i, flag: 'Fake prize scheme', weight: 18, cat: 'Prize Scam' },
      { regex: /click here|click link|download|open attachment/i, flag: 'Suspicious link or attachment', weight: 12, cat: 'Malware' },
      { regex: /bank|paypal|amazon|microsoft|apple.*security/i, flag: 'Brand impersonation', weight: 15, cat: 'Phishing' },
      { regex: /send money|wire transfer|gift card|bitcoin|cryptocurrency/i, flag: 'Untraceable payment request', weight: 20, cat: 'Payment Scam' },
      { regex: /social security|ssn|credit card|password|pin/i, flag: 'Sensitive information request', weight: 18, cat: 'Identity Theft' },
      { regex: /refund|tax return|irs|government grant/i, flag: 'Fake refund scheme', weight: 16, cat: 'Impersonation' },
      { regex: /\d{3}-\d{2}-\d{4}/, flag: 'SSN pattern found', weight: 20, cat: 'Identity Theft' },
      { regex: /\d{16}/, flag: 'Credit card pattern found', weight: 20, cat: 'Financial Fraud' },
    ];

    patterns.forEach(({ regex, flag, weight, cat }) => {
      if (regex.test(text)) {
        flags.push(flag);
        confidence += weight;
        if (!category) category = cat;
      }
    });

    confidence = Math.min(confidence, 100);
    const isScam = confidence > 30;

    const recommendations = isScam
      ? [
          "Do not click any links or download attachments",
          "Never share personal or financial information",
          "Verify with the company directly through official channels",
          "Report this message to relevant authorities",
          "Delete the message immediately",
        ]
      : [
          "Message appears safe, but stay vigilant",
          "Always verify unexpected requests",
          "Keep your personal information private",
        ];

    return { isScam, confidence, flags, category, recommendations };
  };

  // ---------------- Handle Image Upload ----------------
  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Gallery access is needed to scan images. Please enable it in settings.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) return;

    const uri = result.assets[0].uri;
    console.log("📸 Picked image:", uri);

    setLoading(true);
    setOcrText('');
    setScamResult(null);

    try {
      // Convert to base64
      const imageData = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

      // Call OCR.Space API
      const formData = new FormData();
      formData.append('base64Image', `data:image/jpeg;base64,${imageData}`);
      formData.append('language', 'eng');
      formData.append('isOverlayRequired', 'false');

      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          apikey: "K88672750788957", // <-- Put your key here
        },
        body: formData,
      });

      const data = await response.json();
      console.log("OCR Response:", data);

      const extracted = data?.ParsedResults?.[0]?.ParsedText?.trim() || '';
      setOcrText(extracted);
      setLoading(false);

      if (extracted.length > 0) {
        setAnalyzing(true);
        const scamAnalysis = analyzeForScam(extracted);
        setScamResult(scamAnalysis);
        setAnalyzing(false);

        Alert.alert(
          scamAnalysis.isScam ? '⚠️ Potential Scam Detected' : '✓ Scan Complete',
          scamAnalysis.isScam
            ? `Risk Level: ${scamAnalysis.confidence}%\nCategory: ${scamAnalysis.category}`
            : 'No scam indicators detected',
          [{ text: 'OK', style: 'default' }]
        );
      } else {
        Alert.alert('No text found', 'Try another image');
      }
    } catch (err) {
      console.error("OCR error:", err);
      setLoading(false);
      setAnalyzing(false);
      Alert.alert('Error', 'Something went wrong while scanning the image.');
    }
  };

  const getRiskColor = (confidence: number) => {
    if (confidence >= 80) return '#EF4444';
    if (confidence >= 50) return '#F59E0B';
    return '#10B981';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scam Detection Scanner</Text>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleImageUpload}
        disabled={loading || analyzing}
      >
        <Text style={styles.uploadButtonText}>📷 Upload Screenshot & Scan</Text>
      </TouchableOpacity>

      {(loading || analyzing) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>
            {loading ? 'Extracting text...' : 'Analyzing for scams...'}
          </Text>
        </View>
      )}

      {scamResult && (
        <View style={[styles.resultCard, { borderLeftColor: getRiskColor(scamResult.confidence) }]}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>{scamResult.isScam ? '⚠️ Scam Alert' : '✓ Safe'}</Text>
            <View style={[styles.confidenceBadge, { backgroundColor: getRiskColor(scamResult.confidence) }]}>
              <Text style={styles.confidenceText}>{scamResult.confidence}% Risk</Text>
            </View>
          </View>

          {scamResult.category && <Text style={styles.category}>Category: {scamResult.category}</Text>}

          {scamResult.flags.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🚩 Red Flags Detected:</Text>
              {scamResult.flags.map((flag, index) => (
                <Text key={index} style={styles.flagItem}>• {flag}</Text>
              ))}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Recommendations:</Text>
            {scamResult.recommendations.map((rec, index) => (
              <Text key={index} style={styles.recItem}>{index + 1}. {rec}</Text>
            ))}
          </View>
        </View>
      )}

      <ScrollView style={styles.textBox}>
        <Text style={styles.textBoxTitle}>Extracted Text:</Text>
        <Text selectable style={styles.extractedText}>{ocrText || 'No text extracted yet.'}</Text>
      </ScrollView>
    </View>
  );
}

// --------- styles remain same as your version ---------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 20, textAlign: 'center' },
  uploadButton: { backgroundColor: '#3B82F6', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  uploadButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  loadingContainer: { alignItems: 'center', marginVertical: 20 },
  loadingText: { marginTop: 10, color: '#6B7280', fontSize: 14 },
  resultCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, borderLeftWidth: 4 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  confidenceBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  confidenceText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  category: { fontSize: 14, color: '#6B7280', marginBottom: 12, fontWeight: '600' },
  section: { marginTop: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  flagItem: { fontSize: 13, color: '#EF4444', marginBottom: 4, lineHeight: 20 },
  recItem: { fontSize: 13, color: '#059669', marginBottom: 6, lineHeight: 20 },
  textBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16, maxHeight: 250 },
  textBoxTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  extractedText: { fontSize: 13, color: '#1F2937', lineHeight: 20 },
});
