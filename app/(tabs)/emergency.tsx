// app/(tabs)/emergency.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Share,
  Platform,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../src/context/LanguageContext';

export default function EmergencyScreen() {
  const { t } = useLanguage();
  const [reportedScam, setReportedScam] = useState<string | null>(null);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // ============ EMERGENCY ACTIONS ============

  // 1. Call Cybercrime Helpline
  const callHelpline = () => {
    Alert.alert(
      t.emergency.callHelplineTitle,
      t.emergency.callHelplineMessage,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.emergency.callNow,
          style: 'default',
          onPress: () => {
            Linking.openURL('tel:1930');
          },
        },
      ]
    );
  };

  // 2. Report to Cybercrime Portal
  const reportToCybercrime = () => {
    Alert.alert(
      t.emergency.reportCybercrimeTitle,
      t.emergency.reportCybercrimeMessage,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.emergency.openPortal,
          style: 'default',
          onPress: async () => {
            const url = 'https://cybercrime.gov.in/';
            try {
              const canOpen = await Linking.canOpenURL(url);
              if (canOpen) {
                await Linking.openURL(url);
                setReportedScam(new Date().toLocaleString());
              } else {
                Alert.alert(t.error, t.emergency.cannotOpenBrowser);
              }
            } catch (error) {
              Alert.alert(t.error, t.emergency.cannotOpenBrowser);
            }
          },
        },
      ]
    );
  };

  // 3. Report Fraud Call/SMS
  const reportFraudSMS = () => {
    Alert.alert(
      t.emergency.reportFraudTitle,
      t.emergency.reportFraudMessage,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.emergency.smsTo1909,
          onPress: () => {
            Linking.openURL('sms:1909');
          },
        },
        {
          text: t.emergency.openTRAIApp,
          onPress: () => {
            const playStoreUrl = 'https://play.google.com/store/apps/details?id=trai.gov.in.dnd';
            Linking.openURL(playStoreUrl);
          },
        },
      ]
    );
  };

  // 4. Block Scammer Number - FIXED for cross-platform compatibility
  const blockNumber = () => {
    setBlockModalVisible(true);
  };

  const handleBlockNumber = () => {
    if (phoneNumber && phoneNumber.length >= 10) {
      setBlockModalVisible(false);
      
      if (Platform.OS === 'android') {
        Alert.alert(
          t.emergency.numberBlocked,
          `${phoneNumber} ${t.emergency.numberBlockedMessage}`,
          [
            {
              text: t.emergency.openSettings,
              onPress: () => Linking.openSettings(),
            },
            { text: 'OK' },
          ]
        );
      } else {
        Alert.alert(
          t.emergency.blockNumberTitle,
          `${t.emergency.toBlock} ${phoneNumber}:\n${t.emergency.blockInstructions}`,
          [
            {
              text: t.emergency.openSettings,
              onPress: () => Linking.openSettings(),
            },
            { text: 'OK' },
          ]
        );
      }
      
      setPhoneNumber('');
    } else {
      Alert.alert(t.emergency.invalidNumber, t.emergency.enterValidNumber);
    }
  };

  // 5. Share Scam Alert with Family/Friends
  const shareScamAlert = async () => {
    try {
      const result = await Share.share({
        message: t.emergency.shareAlertMessage,
        title: t.emergency.shareAlertTitle,
      });

      if (result.action === Share.sharedAction) {
        Alert.alert(t.emergency.shared, t.emergency.sharedSuccess);
      }
    } catch (error) {
      Alert.alert(t.error, t.emergency.couldNotShare);
    }
  };

  // 6. Check Transaction Status (for UPI fraud)
  const checkTransactionStatus = () => {
    Alert.alert(
      t.emergency.checkTransactionTitle,
      t.emergency.checkTransactionMessage,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.emergency.upiComplaints,
          onPress: () => {
            Linking.openURL('https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism');
          },
        },
        {
          text: t.emergency.reportToBank,
          onPress: () => {
            Alert.alert(
              t.emergency.contactBankTitle,
              t.emergency.contactBankMessage,
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  // 7. Emergency Contact Bank
  const emergencyBankContact = () => {
    Alert.alert(
      t.emergency.emergencyBankTitle,
      t.emergency.emergencyBankMessage,
      [
        { text: t.cancel, style: 'cancel' },
        { text: 'SBI (1800 1234)', onPress: () => Linking.openURL('tel:18001234') },
        { text: 'HDFC (1800 266 4332)', onPress: () => Linking.openURL('tel:18002664332') },
        { text: 'ICICI (1860 120 7777)', onPress: () => Linking.openURL('tel:18601207777') },
        { text: 'Axis (1860 419 5555)', onPress: () => Linking.openURL('tel:18604195555') },
      ]
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="alert-circle" size={40} color="#EF4444" />
          </View>
          <Text style={styles.headerTitle}>{t.emergency.title}</Text>
          <Text style={styles.headerSubtitle}>{t.emergency.subtitle}</Text>
        </View>

        {/* Last Reported */}
        {reportedScam && (
          <View style={styles.lastReportCard}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.lastReportText}>{t.emergency.lastReported}: {reportedScam}</Text>
          </View>
        )}

        {/* Critical Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.emergency.criticalActions}</Text>

          <TouchableOpacity style={styles.criticalCard} onPress={callHelpline}>
            <View style={styles.cardLeft}>
              <View style={[styles.cardIcon, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="call" size={28} color="#EF4444" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{t.emergency.callHelpline1930}</Text>
                <Text style={styles.cardSubtitle}>{t.emergency.helpline247}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.criticalCard} onPress={reportToCybercrime}>
            <View style={styles.cardLeft}>
              <View style={[styles.cardIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="shield-checkmark" size={28} color="#3B82F6" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{t.emergency.reportToCybercrimePortal}</Text>
                <Text style={styles.cardSubtitle}>{t.emergency.officialGovtReporting}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.criticalCard} onPress={checkTransactionStatus}>
            <View style={styles.cardLeft}>
              <View style={[styles.cardIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="card" size={28} color="#F59E0B" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{t.emergency.checkTransactionStatus}</Text>
                <Text style={styles.cardSubtitle}>{t.emergency.forFraudulentPayments}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Other Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.emergency.quickActions}</Text>

          <TouchableOpacity style={styles.actionCard} onPress={reportFraudSMS}>
            <View style={styles.cardLeft}>
              <Ionicons name="mail" size={24} color="#6B7280" />
              <Text style={styles.actionText}>{t.emergency.reportFraudSMSCall}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={blockNumber}>
            <View style={styles.cardLeft}>
              <Ionicons name="ban" size={24} color="#6B7280" />
              <Text style={styles.actionText}>{t.emergency.blockScammerNumber}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={shareScamAlert}>
            <View style={styles.cardLeft}>
              <Ionicons name="share-social" size={24} color="#6B7280" />
              <Text style={styles.actionText}>{t.emergency.shareScamAlert}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={emergencyBankContact}>
            <View style={styles.cardLeft}>
              <Ionicons name="business" size={24} color="#6B7280" />
              <Text style={styles.actionText}>{t.emergency.emergencyBankContacts}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Safety Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>{t.emergency.safetyTips}</Text>
          <Text style={styles.tipItem}>{t.emergency.tip1}</Text>
          <Text style={styles.tipItem}>{t.emergency.tip2}</Text>
          <Text style={styles.tipItem}>{t.emergency.tip3}</Text>
          <Text style={styles.tipItem}>{t.emergency.tip4}</Text>
          <Text style={styles.tipItem}>{t.emergency.tip5}</Text>
        </View>

        {/* Important Numbers */}
        <View style={styles.numbersCard}>
          <Text style={styles.numbersTitle}>{t.emergency.importantNumbers}</Text>
          <View style={styles.numberRow}>
            <Text style={styles.numberLabel}>{t.emergency.cybercrimeHelpline}:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:1930')}>
              <Text style={styles.numberValue}>1930</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberRow}>
            <Text style={styles.numberLabel}>{t.emergency.fraudSMSReporting}:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('sms:1909')}>
              <Text style={styles.numberValue}>1909</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberRow}>
            <Text style={styles.numberLabel}>{t.emergency.womenHelpline}:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:1091')}>
              <Text style={styles.numberValue}>1091</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberRow}>
            <Text style={styles.numberLabel}>{t.emergency.seniorCitizenHelpline}:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:14567')}>
              <Text style={styles.numberValue}>14567</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Block Number Modal - FIXED for Android */}
      <Modal
        visible={blockModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setBlockModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.emergency.blockNumberTitle}</Text>
            <Text style={styles.modalSubtitle}>{t.emergency.blockNumberMessage}</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={15}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setBlockModalVisible(false);
                  setPhoneNumber('');
                }}
              >
                <Text style={styles.cancelButtonText}>{t.cancel}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.blockButton]}
                onPress={handleBlockNumber}
              >
                <Text style={styles.blockButtonText}>{t.emergency.block}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  lastReportCard: {
    backgroundColor: '#D1FAE5',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lastReportText: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  criticalCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 12,
  },
  tipsCard: {
    backgroundColor: '#FFFBEB',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 13,
    color: '#78350F',
    marginBottom: 6,
    lineHeight: 20,
  },
  numbersCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  numbersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  numberLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  numberValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  blockButton: {
    backgroundColor: '#EF4444',
  },
  blockButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});