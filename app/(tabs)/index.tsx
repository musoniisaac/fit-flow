import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock, Flame, Zap, Target } from 'lucide-react-native';

const motivationalQuotes = [
  "Transform your body, transform your life.",
  "Every workout is progress, no matter how small.",
  "Your only limit is your mind.",
  "Consistency beats perfection every time.",
  "The future you will thank the present you.",
  "Strength doesn't come from comfort zones.",
  "Your body achieves what your mind believes.",
  "Progress, not perfection."
];

const todayRoutines = [
  {
    id: 1,
    name: "Morning Flow",
    duration: "15 min",
    exercises: 6,
    completed: false,
    time: "7:00 AM",
    type: "bodyweight"
  },
  {
    id: 2,
    name: "Core Power",
    duration: "20 min",
    exercises: 8,
    completed: true,
    time: "12:00 PM",
    type: "bodyweight"
  },
  {
    id: 3,
    name: "Evening Stretch",
    duration: "10 min",
    exercises: 5,
    completed: false,
    time: "8:00 PM",
    type: "flexibility"
  }
];

export default function HomeScreen() {
  const [dailyQuote, setDailyQuote] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const quoteIndex = today.getDate() % motivationalQuotes.length;
    setDailyQuote(motivationalQuotes[quoteIndex]);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const completedRoutines = todayRoutines.filter(r => r.completed).length;
  const totalRoutines = todayRoutines.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#0F0F23', '#1A1A2E']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.date}>
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </Text>
        </View>
      </LinearGradient>

      {/* Daily Quote */}
      <View style={styles.quoteContainer}>
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>"{dailyQuote}"</Text>
          <View style={styles.quoteLine} />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Flame size={20} color="#00D4FF" />
          </View>
          <Text style={styles.statNumber}>{completedRoutines}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Target size={20} color="#00D4FF" />
          </View>
          <Text style={styles.statNumber}>{totalRoutines - completedRoutines}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Zap size={20} color="#00D4FF" />
          </View>
          <Text style={styles.statNumber}>
            {Math.round((completedRoutines / totalRoutines) * 100)}%
          </Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      {/* Today's Routines */}
      <View style={styles.routinesContainer}>
        <Text style={styles.sectionTitle}>Today's Sessions</Text>
        {todayRoutines.map((routine) => (
          <Pressable
            key={routine.id}
            style={[
              styles.routineCard,
              routine.completed && styles.completedRoutineCard
            ]}
          >
            <View style={styles.routineContent}>
              <View style={styles.routineInfo}>
                <Text style={[
                  styles.routineName,
                  routine.completed && styles.completedText
                ]}>
                  {routine.name}
                </Text>
                <Text style={styles.routineDetails}>
                  {routine.duration} • {routine.exercises} exercises
                </Text>
                <Text style={styles.routineType}>
                  {routine.type === 'bodyweight' ? 'No Equipment' : 'Flexibility'}
                </Text>
              </View>
              <View style={styles.routineRight}>
                <Text style={styles.routineTime}>{routine.time}</Text>
                <View style={[
                  styles.playButton,
                  routine.completed && styles.completedButton
                ]}>
                  <Play size={16} color={routine.completed ? "#00D4FF" : "#FFFFFF"} />
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 1,
  },
  date: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  quoteContainer: {
    marginTop: -20,
    marginHorizontal: 24,
    marginBottom: 32,
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quoteText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#FFFFFF',
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  quoteLine: {
    width: 40,
    height: 2,
    backgroundColor: '#00D4FF',
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 32,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  routinesContainer: {
    marginHorizontal: 24,
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  routineCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  completedRoutineCard: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  routineContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  completedText: {
    color: '#00D4FF',
  },
  routineDetails: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '400',
    marginBottom: 4,
  },
  routineType: {
    fontSize: 12,
    color: '#00D4FF',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  routineRight: {
    alignItems: 'flex-end',
  },
  routineTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 12,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00D4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedButton: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#00D4FF',
  },
  bottomSpacer: {
    height: 100,
  },
});