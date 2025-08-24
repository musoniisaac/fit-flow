import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const weeklyProgress = [
  { day: 'Mon', completed: 2, total: 2 },
  { day: 'Tue', completed: 1, total: 2 },
  { day: 'Wed', completed: 3, total: 3 },
  { day: 'Thu', completed: 1, total: 1 },
  { day: 'Fri', completed: 2, total: 2 },
  { day: 'Sat', completed: 0, total: 1 },
  { day: 'Sun', completed: 1, total: 1 },
];

const achievements = [
  { id: 1, title: '7 Day Streak', description: 'Complete workouts for 7 consecutive days', achieved: true, icon: '🔥' },
  { id: 2, title: 'Early Bird', description: 'Complete 5 morning workouts', achieved: true, icon: '🌅' },
  { id: 3, title: 'Cardio King', description: 'Complete 10 cardio sessions', achieved: false, icon: '💨' },
  { id: 4, title: 'Strength Master', description: 'Complete 15 strength workouts', achieved: false, icon: '💪' },
];

const monthlyStats = [
  { label: 'Workouts Completed', value: 24, target: 30, unit: '' },
  { label: 'Total Time', value: 18, target: 25, unit: ' hrs' },
  { label: 'Calories Burned', value: 3420, target: 4000, unit: '' },
  { label: 'Active Days', value: 18, target: 25, unit: '' },
];

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const maxCompleted = Math.max(...weeklyProgress.map(day => day.total));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#1E40AF']}
        style={styles.header}
      >
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Keep pushing your limits!</Text>
      </LinearGradient>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {['week', 'month', 'year'].map((period) => (
          <Pressable
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriodButton
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === period && styles.selectedPeriodButtonText
            ]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Weekly Progress Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Activity</Text>
        <View style={styles.chart}>
          {weeklyProgress.map((day, index) => {
            const percentage = day.total > 0 ? (day.completed / day.total) * 100 : 0;
            const height = Math.max((percentage / 100) * 120, 8);
            
            return (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.barContainer}>
                  <View style={[styles.barBackground, { height: 120 }]} />
                  <LinearGradient
                    colors={percentage === 100 ? ['#10B981', '#059669'] : ['#F59E0B', '#D97706']}
                    style={[styles.bar, { height }]}
                  />
                </View>
                <Text style={styles.dayLabel}>{day.day}</Text>
                <Text style={styles.dayValue}>{day.completed}/{day.total}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Monthly Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>This Month</Text>
        <View style={styles.statsGrid}>
          {monthlyStats.map((stat, index) => {
            const percentage = (stat.value / stat.target) * 100;
            
            return (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>
                  {stat.value.toLocaleString()}{stat.unit}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={['#3B82F6', '#1E40AF']}
                    style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]}
                  />
                </View>
                <Text style={styles.targetText}>
                  Goal: {stat.target.toLocaleString()}{stat.unit}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsList}>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={[
              styles.achievementCard,
              achievement.achieved && styles.achievedCard
            ]}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                {achievement.achieved && (
                  <View style={styles.achievedBadge}>
                    <Award size={16} color="#FFFFFF" />
                  </View>
                )}
              </View>
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementTitle,
                  achievement.achieved && styles.achievedTitle
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStatsContainer}>
        <View style={styles.quickStatCard}>
          <TrendingUp size={24} color="#10B981" />
          <Text style={styles.quickStatValue}>+23%</Text>
          <Text style={styles.quickStatLabel}>vs last month</Text>
        </View>
        <View style={styles.quickStatCard}>
          <Calendar size={24} color="#3B82F6" />
          <Text style={styles.quickStatValue}>18</Text>
          <Text style={styles.quickStatLabel}>active days</Text>
        </View>
        <View style={styles.quickStatCard}>
          <Target size={24} color="#F97316" />
          <Text style={styles.quickStatValue}>80%</Text>
          <Text style={styles.quickStatLabel}>goal reached</Text>
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  periodSelector: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedPeriodButton: {
    backgroundColor: '#3B82F6',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedPeriodButtonText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    position: 'relative',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barBackground: {
    width: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    position: 'absolute',
    bottom: 0,
  },
  bar: {
    width: 24,
    borderRadius: 12,
    minHeight: 8,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 2,
  },
  dayValue: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  statsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  targetText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  achievementsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    opacity: 0.6,
  },
  achievedCard: {
    opacity: 1,
    borderWidth: 1,
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  achievedTitle: {
    color: '#1F2937',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  quickStatsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});