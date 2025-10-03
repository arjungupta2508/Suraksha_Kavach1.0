import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TrendsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scam Trends</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Overview Card */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>This Week's Summary</Text>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={styles.overviewNumber}>847</Text>
            <Text style={styles.overviewLabel}>Scams Detected</Text>
            <View style={styles.trend}>
              <Ionicons name="trending-up" size={14} color="#EF4444" />
              <Text style={styles.trendText}>+23%</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.overviewStat}>
            <Text style={styles.overviewNumber}>₹1.8L</Text>
            <Text style={styles.overviewLabel}>Money Protected</Text>
            <View style={styles.trend}>
              <Ionicons name="trending-up" size={14} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>+15%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Top Scam Types */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Scam Types</Text>
        
        <View style={styles.scamCard}>
          <View style={styles.scamHeader}>
            <View style={styles.scamLeft}>
              <View style={[styles.scamIcon, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="card" size={24} color="#EF4444" />
              </View>
              <View>
                <Text style={styles.scamTitle}>Fake Bank OTP</Text>
                <Text style={styles.scamSubtitle}>342 cases this week</Text>
              </View>
            </View>
            <Text style={styles.scamPercentage}>38%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '38%', backgroundColor: '#EF4444' }]} />
          </View>
        </View>

        <View style={styles.scamCard}>
          <View style={styles.scamHeader}>
            <View style={styles.scamLeft}>
              <View style={[styles.scamIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="gift" size={24} color="#1E40AF" />
              </View>
              <View>
                <Text style={styles.scamTitle}>Lottery/Prize Scams</Text>
                <Text style={styles.scamSubtitle}>215 cases this week</Text>
              </View>
            </View>
            <Text style={styles.scamPercentage}>24%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '24%', backgroundColor: '#1E40AF' }]} />
          </View>
        </View>

        <View style={styles.scamCard}>
          <View style={styles.scamHeader}>
            <View style={styles.scamLeft}>
              <View style={[styles.scamIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="cube" size={24} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.scamTitle}>Fake Delivery</Text>
                <Text style={styles.scamSubtitle}>178 cases this week</Text>
              </View>
            </View>
            <Text style={styles.scamPercentage}>20%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '20%', backgroundColor: '#F59E0B' }]} />
          </View>
        </View>

        <View style={styles.scamCard}>
          <View style={styles.scamHeader}>
            <View style={styles.scamLeft}>
              <View style={[styles.scamIcon, { backgroundColor: '#FCE7F3' }]}>
                <Ionicons name="briefcase" size={24} color="#EC4899" />
              </View>
              <View>
                <Text style={styles.scamTitle}>Job Offer Fraud</Text>
                <Text style={styles.scamSubtitle}>112 cases this week</Text>
              </View>
            </View>
            <Text style={styles.scamPercentage}>12%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '12%', backgroundColor: '#EC4899' }]} />
          </View>
        </View>
      </View>

      {/* Regional Trends */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regional Hotspots</Text>
        
        <View style={styles.regionCard}>
          <View style={styles.regionHeader}>
            <Ionicons name="location" size={20} color="#EF4444" />
            <Text style={styles.regionName}>Delhi NCR</Text>
          </View>
          <Text style={styles.regionCount}>1,234 scams reported</Text>
          <Text style={styles.regionTrend}>Most common: Fake bank OTP</Text>
        </View>

        <View style={styles.regionCard}>
          <View style={styles.regionHeader}>
            <Ionicons name="location" size={20} color="#F59E0B" />
            <Text style={styles.regionName}>Mumbai</Text>
          </View>
          <Text style={styles.regionCount}>987 scams reported</Text>
          <Text style={styles.regionTrend}>Most common: Investment fraud</Text>
        </View>

        <View style={styles.regionCard}>
          <View style={styles.regionHeader}>
            <Ionicons name="location" size={20} color="#10B981" />
            <Text style={styles.regionName}>Bangalore</Text>
          </View>
          <Text style={styles.regionCount}>756 scams reported</Text>
          <Text style={styles.regionTrend}>Most common: Job offer scams</Text>
        </View>
      </View>

      {/* Alert Card */}
      <View style={styles.alertCard}>
        <Ionicons name="warning" size={24} color="#DC2626" />
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>⚠️ New Scam Alert</Text>
          <Text style={styles.alertText}>
            Surge in fake UPI payment confirmation messages. Always verify in your banking app.
          </Text>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Learn More</Text>
            <Ionicons name="arrow-forward" size={14} color="#DC2626" />
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  overviewCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewStat: {
    flex: 1,
    alignItems: 'center',
  },
  overviewNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  scamCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  scamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scamLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  scamIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scamTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  scamSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  scamPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  regionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  regionCount: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  regionTrend: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  alertCard: {
    backgroundColor: '#FEF2F2',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 13,
    color: '#7F1D1D',
    lineHeight: 18,
    marginBottom: 8,
  },
  alertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alertButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
});