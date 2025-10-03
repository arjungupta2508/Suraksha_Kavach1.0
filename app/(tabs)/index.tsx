import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroContent}>
          <View style={styles.iconCircle}>
            <Ionicons name="shield-checkmark" size={40} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>Protection Active</Text>
          <Text style={styles.heroSubtitle}>All systems operational</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1,247</Text>
          <Text style={styles.statLabel}>Scams Blocked</Text>
          <Ionicons name="shield" size={20} color="#1E40AF" style={styles.statIcon} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹2.3L</Text>
          <Text style={styles.statLabel}>Money Saved</Text>
          <Ionicons name="cash" size={20} color="#10B981" style={styles.statIcon} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50K+</Text>
          <Text style={styles.statLabel}>Users Protected</Text>
          <Ionicons name="people" size={20} color="#F59E0B" style={styles.statIcon} />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/scan')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="scan" size={28} color="#1E40AF" />
            </View>
            <Text style={styles.actionText}>Scan SMS</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/scan')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="image" size={28} color="#10B981" />
            </View>
            <Text style={styles.actionText}>Scan Image</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/trends')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="trending-up" size={28} color="#F59E0B" />
            </View>
            <Text style={styles.actionText}>View Trends</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/alerts')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="notifications" size={28} color="#EF4444" />
            </View>
            <Text style={styles.actionText}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <View style={styles.activityCard}>
          <View style={styles.activityLeft}>
            <View style={[styles.activityDot, { backgroundColor: '#EF4444' }]} />
            <View>
              <Text style={styles.activityTitle}>Bank OTP Scam Blocked</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <Text style={styles.activityRisk}>95%</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityLeft}>
            <View style={[styles.activityDot, { backgroundColor: '#F59E0B' }]} />
            <View>
              <Text style={styles.activityTitle}>Lottery Winner Message</Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
          </View>
          <Text style={styles.activityRisk}>68%</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityLeft}>
            <View style={[styles.activityDot, { backgroundColor: '#10B981' }]} />
            <View>
              <Text style={styles.activityTitle}>Delivery OTP - Safe</Text>
              <Text style={styles.activityTime}>Yesterday</Text>
            </View>
          </View>
          <Text style={styles.activityRisk}>12%</Text>
        </View>
      </View>

      {/* Tip of the Day */}
      <View style={styles.tipCard}>
        <Ionicons name="bulb" size={24} color="#F59E0B" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>💡 Tip of the Day</Text>
          <Text style={styles.tipText}>
            Never share your OTP with anyone, not even bank officials. Real banks never ask for OTP.
          </Text>
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