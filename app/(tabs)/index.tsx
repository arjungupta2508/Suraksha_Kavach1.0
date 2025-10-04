// app/(tabs)/index.tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../src/context/LanguageContext';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroContent}>
          <View style={styles.iconCircle}>
            <Ionicons name="shield-checkmark" size={40} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>{t.home.title}</Text>
          <Text style={styles.heroSubtitle}>{t.home.subtitle}</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1,247</Text>
          <Text style={styles.statLabel}>{t.home.scamsBlocked}</Text>
          <Ionicons name="shield" size={20} color="#1E40AF" style={styles.statIcon} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹2.3L</Text>
          <Text style={styles.statLabel}>{t.home.moneySaved}</Text>
          <Ionicons name="cash" size={20} color="#10B981" style={styles.statIcon} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50K+</Text>
          <Text style={styles.statLabel}>{t.home.usersProtected}</Text>
          <Ionicons name="people" size={20} color="#F59E0B" style={styles.statIcon} />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.home.quickActions}</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/scan')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="scan" size={28} color="#1E40AF" />
            </View>
            <Text style={styles.actionText}>{t.home.scanSMS}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/scan')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="image" size={28} color="#10B981" />
            </View>
            <Text style={styles.actionText}>{t.home.scanImage}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/emergency')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="warning" size={28} color="#EF4444" />
            </View>
            <Text style={styles.actionText}>{t.home.emergency}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Emergency Banner */}
      <TouchableOpacity 
        style={styles.emergencyBanner}
        onPress={() => router.push('/emergency')}
      >
        <View style={styles.emergencyLeft}>
          <View style={styles.emergencyIcon}>
            <Ionicons name="alert-circle" size={24} color="#EF4444" />
          </View>
          <View>
            <Text style={styles.emergencyTitle}>{t.home.needHelpNow}</Text>
            <Text style={styles.emergencySubtitle}>{t.home.accessEmergency}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#EF4444" />
      </TouchableOpacity>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.home.recentActivity}</Text>
        
        <View style={styles.activityCard}>
          <View style={styles.activityLeft}>
            <View style={[styles.activityDot, { backgroundColor: '#EF4444' }]} />
            <View>
              <Text style={styles.activityTitle}>{t.home.bankOTPBlocked}</Text>
              <Text style={styles.activityTime}>2 {t.home.hoursAgo}</Text>
            </View>
          </View>
          <Text style={styles.activityRisk}>95%</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityLeft}>
            <View style={[styles.activityDot, { backgroundColor: '#F59E0B' }]} />
            <View>
              <Text style={styles.activityTitle}>{t.home.lotteryMessage}</Text>
              <Text style={styles.activityTime}>5 {t.home.hoursAgo}</Text>
            </View>
          </View>
          <Text style={styles.activityRisk}>68%</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityLeft}>
            <View style={[styles.activityDot, { backgroundColor: '#10B981' }]} />
            <View>
              <Text style={styles.activityTitle}>{t.home.deliverySafe}</Text>
              <Text style={styles.activityTime}>{t.home.yesterday}</Text>
            </View>
          </View>
          <Text style={styles.activityRisk}>12%</Text>
        </View>
      </View>

      {/* Tip of the Day */}
      <View style={styles.tipCard}>
        <Ionicons name="bulb" size={24} color="#F59E0B" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.home.tipOfTheDay}</Text>
          <Text style={styles.tipText}>{t.home.tipText}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  heroCard: {
    backgroundColor: '#1E40AF',
    margin: 16,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  statIcon: {
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  emergencyBanner: {
    backgroundColor: '#FEE2E2',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FCA5A5',
  },
  emergencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 2,
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#B91C1C',
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityRisk: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  tipCard: {
    backgroundColor: '#FFFBEB',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginBottom: 32,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 18,
  },
});