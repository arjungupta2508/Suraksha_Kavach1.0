// app/(tabs)/alerts.tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useLanguage } from '../../src/context/LanguageContext';

export default function AlertsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highRiskOnly, setHighRiskOnly] = useState(false);

  const alerts = [
    {
      id: 1,
      type: 'critical',
      titleKey: 'bankOTPScam',
      messageKey: 'bankOTPMessage',
      time: `2 ${t.alerts.hoursAgo}`,
      risk: 95,
      icon: 'alert-circle',
    },
    {
      id: 2,
      type: 'warning',
      titleKey: 'suspiciousLink',
      messageKey: 'suspiciousLinkMessage',
      time: `4 ${t.alerts.hoursAgo}`,
      risk: 78,
      icon: 'warning',
    },
    {
      id: 3,
      type: 'info',
      titleKey: 'newScamAlert',
      messageKey: 'newScamMessage',
      time: `6 ${t.alerts.hoursAgo}`,
      risk: 0,
      icon: 'information-circle',
    },
    {
      id: 4,
      type: 'critical',
      titleKey: 'lotteryScam',
      messageKey: 'lotteryScamMessage',
      time: t.alerts.yesterday,
      risk: 89,
      icon: 'alert-circle',
    },
    {
      id: 5,
      type: 'warning',
      titleKey: 'jobOfferVerification',
      messageKey: 'jobOfferMessage',
      time: t.alerts.yesterday,
      risk: 72,
      icon: 'warning',
    },
    {
      id: 6,
      type: 'info',
      titleKey: 'weeklyTip',
      messageKey: 'weeklyTipMessage',
      time: `2 ${t.alerts.daysAgo}`,
      risk: 0,
      icon: 'bulb',
    },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return { bg: '#FEE2E2', color: '#EF4444', border: '#FCA5A5' };
      case 'warning':
        return { bg: '#FEF3C7', color: '#F59E0B', border: '#FCD34D' };
      default:
        return { bg: '#DBEAFE', color: '#1E40AF', border: '#93C5FD' };
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.alerts.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Alert Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="alert-circle" size={24} color="#EF4444" />
            </View>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>{t.alerts.critical}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="warning" size={24} color="#F59E0B" />
            </View>
            <Text style={styles.summaryNumber}>8</Text>
            <Text style={styles.summaryLabel}>{t.alerts.warnings}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="information-circle" size={24} color="#1E40AF" />
            </View>
            <Text style={styles.summaryNumber}>12</Text>
            <Text style={styles.summaryLabel}>{t.alerts.info}</Text>
          </View>
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>{t.alerts.notificationSettings}</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={20} color="#1E40AF" />
            <Text style={styles.settingText}>{t.alerts.pushNotifications}</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={notificationsEnabled ? '#1E40AF' : '#F3F4F6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="volume-high" size={20} color="#1E40AF" />
            <Text style={styles.settingText}>{t.alerts.soundAlerts}</Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={soundEnabled ? '#1E40AF' : '#F3F4F6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="filter" size={20} color="#1E40AF" />
            <Text style={styles.settingText}>{t.alerts.highRiskOnly}</Text>
          </View>
          <Switch
            value={highRiskOnly}
            onValueChange={setHighRiskOnly}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={highRiskOnly ? '#1E40AF' : '#F3F4F6'}
          />
        </View>
      </View>

      {/* Recent Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.alerts.recentAlerts}</Text>
        
        {alerts.map((alert) => {
          const colors = getAlertColor(alert.type);
          return (
            <TouchableOpacity key={alert.id} style={styles.alertCard}>
              <View style={[styles.alertIconContainer, { backgroundColor: colors.bg }]}>
                <Ionicons name={alert.icon as any} size={24} color={colors.color} />
              </View>
              
              <View style={styles.alertContent}>
                <View style={styles.alertHeader}>
                  <Text style={styles.alertTitle}>
                    {t.alerts[alert.titleKey as keyof typeof t.alerts]}
                  </Text>
                  {alert.risk > 0 && (
                    <View style={[styles.riskBadge, { backgroundColor: colors.bg }]}>
                      <Text style={[styles.riskText, { color: colors.color }]}>
                        {alert.risk}%
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.alertMessage}>
                  {t.alerts[alert.messageKey as keyof typeof t.alerts]}
                </Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsCard}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text style={styles.actionButtonText}>{t.alerts.clearAllAlerts}</Text>
        </TouchableOpacity>
        
        <View style={styles.actionDivider} />
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="checkmark-done" size={20} color="#10B981" />
          <Text style={styles.actionButtonText}>{t.alerts.markAllRead}</Text>
        </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  settingsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  alertIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  riskText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  alertMessage: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 18,
  },
  alertTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  actionsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  actionDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});