import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Simple scam detection function
function detectScam(message: string) {
  const lowerMsg = message.toLowerCase();
  let score = 0;
  const flags: string[] = [];

  // Scam keywords
  const keywords = ['urgent', 'verify', 'blocked', 'winner', 'prize', 'otp', 'click here', 'expire', 'suspend', 'congratulations'];
  keywords.forEach(keyword => {
    if (lowerMsg.includes(keyword)) {
      score += 15;
      flags.push(`"${keyword}"`);
    }
  });

  // Check for URLs
  if (/http|www\.|bit\.ly/i.test(message)) {
    score += 25;
    flags.push('Suspicious link');
  }

  // Check for phone numbers
  if (/\d{10}/.test(message)) {
    score += 10;
    flags.push('Phone number');
  }

  // Check for money
  if (/₹|rs\.|rupees/i.test(message)) {
    score += 15;
    flags.push('Money amount');
  }

  score = Math.min(score, 100);
  const status = score >= 50 ? 'scam' : score >= 30 ? 'suspicious' : 'safe';

  return { score, status, flags };
}

export default function ScanScreen() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!message.trim()) {
      Alert.alert('Empty Message', 'Please enter a message to scan');
      return;
    }

    setIsScanning(true);
    setTimeout(() => {
      const scanResult = detectScam(message);
      setResult(scanResult);
      setIsScanning(false);
    }, 1000);
  };

  const clearAll = () => {
    setMessage('');
    setResult(null);
  };

  const samples = [
    {
      title: '🚨 Bank Scam',
      text: 'URGENT: Your account will be blocked in 24 hours. Click here to verify: http://fake-bank.com or call 9876543210'
    },
    {
      title: '🎁 Lottery Scam',
      text: 'Congratulations! You won Rs. 50,000 in KBC lottery. Share OTP to claim prize now!'
    },
    {
      title: '✅ Safe Message',
      text: 'Hi, this is a reminder about our meeting tomorrow at 3 PM. See you there!'
    }
  ];

  const getStatusColor = () => {
    if (!result) return '#F3F4F6';
    return result.status === 'scam' ? '#FEE2E2' : result.status === 'suspicious' ? '#FEF3C7' : '#D1FAE5';
  };

  const getStatusTextColor = () => {
    if (!result) return '#000';
    return result.status === 'scam' ? '#991B1B' : result.status === 'suspicious' ? '#92400E' : '#065F46';
  };

  const getStatusIcon = () => {
    if (!result) return null;
    return result.status === 'scam' ? '🚨' : result.status === 'suspicious' ? '⚠️' : '✅';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scan for Scams</Text>
        <Text style={styles.headerSubtitle}>Paste any suspicious message below</Text>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Paste suspicious message here..."
          placeholderTextColor="#9CA3AF"
          multiline
          value={message}
          onChangeText={setMessage}
          textAlignVertical="top"
        />
        {message.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Ionicons name="close-circle" size={24} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.scanButton, (!message.trim() || isScanning) && styles.scanButtonDisabled]}
          onPress={handleScan}
          disabled={!message.trim() || isScanning}
        >
          <Ionicons name="scan" size={20} color="#fff" />
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan Message'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Result */}
      {result && (
        <View style={[styles.resultCard, { backgroundColor: getStatusColor() }]}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultIcon}>{getStatusIcon()}</Text>
            <Text style={[styles.resultStatus, { color: getStatusTextColor() }]}>
              {result.status.toUpperCase()}
            </Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreLabel, { color: getStatusTextColor() }]}>Risk Score</Text>
            <Text style={[styles.scoreValue, { color: getStatusTextColor() }]}>{result.score}%</Text>
          </View>

          {result.flags.length > 0 && (
            <View style={styles.flagsContainer}>
              <Text style={[styles.flagsTitle, { color: getStatusTextColor() }]}>
                ⚡ Detected Patterns:
              </Text>
              {result.flags.map((flag: string, idx: number) => (
                <Text key={idx} style={[styles.flag, { color: getStatusTextColor() }]}>
                  • Contains {flag}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.recommendationBox}>
            <Text style={[styles.recommendationTitle, { color: getStatusTextColor() }]}>
              What to do:
            </Text>
            <Text style={[styles.recommendation, { color: getStatusTextColor() }]}>
              {result.status === 'scam' 
                ? '🚨 DELETE immediately! Do not click any links or share information.'
                : result.status === 'suspicious'
                ? '⚠️ BE CAUTIOUS! Verify sender before taking action.'
                : '✅ Message appears safe. Always stay vigilant.'}
            </Text>
          </View>
        </View>
      )}

      {/* Sample Messages */}
      <View style={styles.samplesSection}>
        <Text style={styles.samplesTitle}>📝 Try Sample Messages:</Text>
        {samples.map((sample, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.sampleCard}
            onPress={() => {
              setMessage(sample.text);
              setResult(null);
            }}
          >
            <Text style={styles.sampleTitle}>{sample.title}</Text>
            <Text style={styles.sampleText} numberOfLines={2}>
              {sample.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  inputContainer: {
    margin: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 150,
  },
  clearButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  buttonRow: {
    paddingHorizontal: 16,
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
    backgroundColor: '#9CA3AF',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  resultIcon: {
    fontSize: 32,
  },
  resultStatus: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  flagsContainer: {
    marginBottom: 16,
  },
  flagsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flag: {
    fontSize: 14,
    marginBottom: 4,
  },
  recommendationBox: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 16,
    borderRadius: 12,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recommendation: {
    fontSize: 14,
    lineHeight: 20,
  },
  samplesSection: {
    padding: 16,
  },
  samplesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  sampleCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  sampleText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});