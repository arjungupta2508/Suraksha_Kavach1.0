import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ScanScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeMessage = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message to scan');
      return;
    }

    setScanning(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const keywords = ['otp', 'urgent', 'click', 'verify', 'account', 'suspended', 'lottery', 'winner', 'prize'];
      const lowerMessage = message.toLowerCase();
      const foundKeywords = keywords.filter(k => lowerMessage.includes(k));
      
      const riskScore = Math.min(95, foundKeywords.length * 15 + Math.random() * 20);
      const isScam = riskScore > 60;

      setResult({
        score: Math.round(riskScore),
        isScam,
        keywords: foundKeywords,
        analysis: isScam 
          ? 'High risk of scam detected. Do not respond or click any links.'
          : 'Message appears safe. However, always verify sender identity.'
      });
      setScanning(false);
    }, 2000);
  };

  const clearScan = () => {
    setMessage('');
    setResult(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Message</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Scanner Card */}
      <View style={styles.scannerCard}>
        <View style={styles.scannerHeader}>
          <Ionicons name="shield-checkmark" size={32} color="#1E40AF" />
          <Text style={styles.scannerTitle}>AI-Powered Scam Detection</Text>
        </View>
        
        <Text style={styles.inputLabel}>Paste your message below:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter SMS, WhatsApp, or email message..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={6}
          value={message}
          onChangeText={setMessage}
          textAlignVertical="top"
        />

        <TouchableOpacity 
          style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
          onPress={analyzeMessage}
          disabled={scanning}
        >
          <Ionicons name="scan" size={20} color="#fff" />
          <Text style={styles.scanButtonText}>
            {scanning ? 'Analyzing...' : 'Scan Message'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {result && (
        <View style={styles.resultCard}>
          <View style={[
            styles.resultHeader,
            { backgroundColor: result.isScam ? '#FEE2E2' : '#D1FAE5' }
          ]}>
            <Ionicons 
              name={result.isScam ? "alert-circle" : "checkmark-circle"} 
              size={48} 
              color={result.isScam ? "#EF4444" : "#10B981"} 
            />
            <Text style={[
              styles.riskScore,
              { color: result.isScam ? "#EF4444" : "#10B981" }
            ]}>
              {result.score}% Risk
            </Text>
            <Text style={styles.verdict}>
              {result.isScam ? 'SCAM DETECTED' : 'LIKELY SAFE'}
            </Text>
          </View>

          <View style={styles.resultBody}>
            <Text style={styles.analysisTitle}>Analysis:</Text>
            <Text style={styles.analysisText}>{result.analysis}</Text>

            {result.keywords.length > 0 && (
              <>
                <Text style={styles.keywordsTitle}>Suspicious Keywords:</Text>
                <View style={styles.keywordContainer}>
                  {result.keywords.map((keyword: string, index: number) => (
                    <View key={index} style={styles.keywordBadge}>
                      <Text style={styles.keywordText}>{keyword}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            <TouchableOpacity style={styles.clearButton} onPress={clearScan}>
              <Text style={styles.clearButtonText}>Scan Another Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Quick Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>🛡️ Safety Tips</Text>
        
        <View style={styles.tipItem}>
          <Ionicons name="close-circle" size={20} color="#EF4444" />
          <Text style={styles.tipText}>Never share OTP or passwords</Text>
        </View>
        
        <View style={styles.tipItem}>
          <Ionicons name="close-circle" size={20} color="#EF4444" />
          <Text style={styles.tipText}>Don't click suspicious links</Text>
        </View>
        
        <View style={styles.tipItem}>
          <Ionicons name="close-circle" size={20} color="#EF4444" />
          <Text style={styles.tipText}>Banks never ask for PIN/CVV</Text>
        </View>
        
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          <Text style={styles.tipText}>Verify sender before responding</Text>
        </View>
      </View>

      {/* Image Scanner Option */}
      <TouchableOpacity style={styles.imageOption}>
        <Ionicons name="image-outline" size={24} color="#1E40AF" />
        <View style={{ flex: 1 }}>
          <Text style={styles.imageOptionTitle}>Scan Screenshot</Text>
          <Text style={styles.imageOptionSubtitle}>Upload image to analyze</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scannerCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  scannerHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    minHeight: 120,
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#1E40AF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  scanButtonDisabled: {
    opacity: 0.6,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  resultHeader: {
    padding: 24,
    alignItems: 'center',
  },
  riskScore: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 12,
  },
  verdict: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4,
  },
  resultBody: {
    padding: 20,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  analysisText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  keywordsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  keywordBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  keywordText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  tipsSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  imageOption: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  imageOptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  imageOptionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
});