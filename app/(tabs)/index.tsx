import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock, Flame } from 'lucide-react-native';

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can do it. It's your mind you need to convince.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't wish for it, work for it.",
  "Champions don't become champions in the ring. They become champions in their training.",
  "Push yourself because no one else is going to do it for you."
];

const todayRoutines = [
  {
    id: 1,
    name: "Morning Cardio",
    duration: "30 min",
    exercises: 4,
    completed: false,
    time: "7:00 AM"
  },
  {
    id: 2,
    name: "Upper Body Strength",
    duration: "45 min",
    exercises: 6,
    completed: true,
    time: "6:00 PM"
  },
  {
    id: 3,
    name: "Evening Stretch",
    duration: "15 min",
    exercises: 5,
    completed: false,
    time: "9:00 PM"
  }
];

export default function HomeScreen() {
  const [dailyQuote, setDailyQuote] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set a daily quote based on the current date
    const today = new Date();
    const quoteIndex = today.getDate() % motivationalQuotes.length;
    setDailyQuote(motivationalQuotes[quoteIndex]);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const completedRoutines = todayRoutines.filter(r => r.completed).length;
  const totalRoutines = todayRoutines.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with gradient */}
      <LinearGradient
        colors={['#3B82F6', '#1E40AF']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.date}>
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
      </LinearGradient>

      {/* Daily Quote */}
      <View style={styles.quoteContainer}>
        <LinearGradient
          colors={['#F97316', '#EA580C']}
          style={styles.quoteGradient}
        >
          <Text style={styles.quoteLabel}>Daily Motivation</Text>
          <Text style={styles.quote}>"{dailyQuote}"</Text>
        </LinearGradient>
      </View>

      {/* Today's Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Flame size={24} color="#F97316" />
          <Text style={styles.statNumber}>{completedRoutines}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>{totalRoutines - completedRoutines}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
        <View style={styles.statCard}>
          <Play size={24} color="#10B981" />
          <Text style={styles.statNumber}>
            {Math.round((completedRoutines / totalRoutines) * 100)}%
          </Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      {/* Today's Routines */}
      <View style={styles.routinesContainer}>
        <Text style={styles.sectionTitle}>Today's Routines</Text>
        {todayRoutines.map((routine) => (
          <Pressable
            key={routine.id}
            style={[
              styles.routineCard,
              routine.completed && styles.completedRoutineCard
            ]}
          >
            <View style={styles.routineHeader}>
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
              </View>
              <Text style={styles.routineTime}>{routine.time}</Text>
            </View>
            <View style={[
              styles.routineStatus,
              routine.completed ? styles.completedStatus : styles.pendingStatus
            ]}>
              <Text style={[
                styles.statusText,
                routine.completed ? styles.completedStatusText : styles.pendingStatusText
              ]}>
                {routine.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
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
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  quoteContainer: {
    marginTop: -20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  quoteGradient: {
    borderRadius: 16,
    padding: 24,
  },
  quoteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FED7AA',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quote: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 26,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
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
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  routinesContainer: {
    marginHorizontal: 20,
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  routineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  completedRoutineCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#22C55E',
    borderWidth: 1,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  completedText: {
    color: '#16A34A',
  },
  routineDetails: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  routineTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  routineStatus: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  completedStatus: {
    backgroundColor: '#DCFCE7',
  },
  pendingStatus: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  completedStatusText: {
    color: '#16A34A',
  },
  pendingStatusText: {
    color: '#D97706',
  },
});