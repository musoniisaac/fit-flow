import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Play, Clock, Zap, Target, Users, Chrome as Home } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const workoutCategories = [
  {
    id: 1,
    name: 'Bodyweight',
    icon: Zap,
    color: '#00D4FF',
    description: 'No equipment needed',
    workouts: [
      {
        id: 1,
        name: 'Morning Flow',
        duration: '15 min',
        exercises: 6,
        difficulty: 'Beginner',
        calories: 120,
        exercises_list: ['Push-ups', 'Squats', 'Plank', 'Lunges', 'Burpees', 'Mountain Climbers']
      },
      {
        id: 2,
        name: 'Core Blast',
        duration: '20 min',
        exercises: 8,
        difficulty: 'Intermediate',
        calories: 180,
        exercises_list: ['Crunches', 'Russian Twists', 'Leg Raises', 'Bicycle Crunches', 'Dead Bug', 'Hollow Hold', 'Side Plank', 'V-Ups']
      },
      {
        id: 3,
        name: 'Full Body HIIT',
        duration: '25 min',
        exercises: 10,
        difficulty: 'Advanced',
        calories: 250,
        exercises_list: ['Burpees', 'Jump Squats', 'Push-up to T', 'High Knees', 'Plank Jacks', 'Tuck Jumps', 'Pike Push-ups', 'Single Leg Glute Bridge', 'Bear Crawl', 'Jump Lunges']
      },
      {
        id: 4,
        name: 'Upper Body Power',
        duration: '18 min',
        exercises: 7,
        difficulty: 'Intermediate',
        calories: 160,
        exercises_list: ['Push-ups', 'Pike Push-ups', 'Tricep Dips', 'Arm Circles', 'Wall Handstand', 'Superman', 'Plank Up-Down']
      }
    ]
  },
  {
    id: 2,
    name: 'Home Cardio',
    icon: Target,
    color: '#FF6B6B',
    description: 'Heart pumping sessions',
    workouts: [
      {
        id: 5,
        name: 'Cardio Kickstart',
        duration: '12 min',
        exercises: 5,
        difficulty: 'Beginner',
        calories: 100,
        exercises_list: ['Jumping Jacks', 'High Knees', 'Butt Kicks', 'Side Steps', 'Arm Swings']
      },
      {
        id: 6,
        name: 'Fat Burn Express',
        duration: '30 min',
        exercises: 12,
        difficulty: 'Advanced',
        calories: 300,
        exercises_list: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'High Knees', 'Plank Jacks', 'Tuck Jumps', 'Skaters', 'Jump Lunges', 'Fast Feet', 'Cross Jacks', 'Squat Thrusts', 'Sprint in Place']
      }
    ]
  },
  {
    id: 3,
    name: 'Flexibility',
    icon: Users,
    color: '#4ECDC4',
    description: 'Stretch and recover',
    workouts: [
      {
        id: 7,
        name: 'Morning Stretch',
        duration: '10 min',
        exercises: 8,
        difficulty: 'Beginner',
        calories: 40,
        exercises_list: ['Cat-Cow', 'Child\'s Pose', 'Downward Dog', 'Forward Fold', 'Spinal Twist', 'Hip Circles', 'Neck Rolls', 'Shoulder Shrugs']
      },
      {
        id: 8,
        name: 'Deep Flexibility',
        duration: '25 min',
        exercises: 12,
        difficulty: 'Intermediate',
        calories: 80,
        exercises_list: ['Pigeon Pose', 'Butterfly Stretch', 'Seated Forward Fold', 'Cobra Pose', 'Thread the Needle', 'Hip Flexor Stretch', 'Hamstring Stretch', 'Quad Stretch', 'Calf Stretch', 'Shoulder Stretch', 'Tricep Stretch', 'Spinal Twist']
      }
    ]
  }
];

export default function WorkoutsScreen() {
  const [selectedCategory, setSelectedCategory] = useState(workoutCategories[0].id);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const selectedCategoryData = workoutCategories.find(cat => cat.id === selectedCategory);

  const handleWorkoutPress = (workoutId) => {
    router.push(`/workout/${workoutId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4ECDC4';
      case 'Intermediate': return '#FFE66D';
      case 'Advanced': return '#FF6B6B';
      default: return '#94A3B8';
    }
  };

  if (selectedWorkout) {
    const workout = selectedCategoryData.workouts.find(w => w.id === selectedWorkout);
    
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0F0F23', '#1A1A2E']}
          style={styles.workoutHeader}
        >
          <Pressable 
            style={styles.backButton}
            onPress={() => setSelectedWorkout(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
          <Text style={styles.workoutTitle}>{workout.name}</Text>
          <View style={styles.workoutMeta}>
            <Text style={styles.workoutDuration}>{workout.duration}</Text>
            <Text style={styles.workoutCalories}>{workout.calories} cal</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.exercisesList} showsVerticalScrollIndicator={false}>
          <Text style={styles.exercisesTitle}>Exercises ({workout.exercises})</Text>
          {workout.exercises_list.map((exercise, index) => (
            <View key={index} style={styles.exerciseItem}>
              <View style={styles.exerciseNumber}>
                <Text style={styles.exerciseNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.exerciseName}>{exercise}</Text>
            </View>
          ))}
          
          <Pressable style={styles.startWorkoutButton}>
            <LinearGradient
              colors={['#00D4FF', '#0099CC']}
              style={styles.startWorkoutGradient}
            >
              <Play size={24} color="#FFFFFF" />
              <Text style={styles.startWorkoutText}>Start Workout</Text>
            </LinearGradient>
          </Pressable>
          
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#0F0F23', '#1A1A2E']}
        style={styles.header}
      >
        <Text style={styles.title}>Workouts</Text>
        <Text style={styles.subtitle}>No equipment, maximum results</Text>
      </LinearGradient>

      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {workoutCategories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Pressable
              key={category.id}
              style={[
                styles.categoryTab,
                isSelected && { backgroundColor: 'rgba(0, 212, 255, 0.2)', borderColor: '#00D4FF' }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <IconComponent 
                size={20} 
                color={isSelected ? '#00D4FF' : '#94A3B8'} 
              />
              <Text style={[
                styles.categoryText,
                isSelected && styles.selectedCategoryText
              ]}>
                {category.name}
              </Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Workouts List */}
      <ScrollView style={styles.workoutsList} showsVerticalScrollIndicator={false}>
        {selectedCategoryData.workouts.map((workout) => (
          <Pressable 
            key={workout.id} 
            style={styles.workoutCard}
            onPress={() => handleWorkoutPress(workout.id)}
          >
            <View style={styles.workoutCardHeader}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(workout.difficulty) + '20' }
              ]}>
                <Text style={[
                  styles.difficultyText,
                  { color: getDifficultyColor(workout.difficulty) }
                ]}>
                  {workout.difficulty}
                </Text>
              </View>
            </View>
            
            <View style={styles.workoutStats}>
              <View style={styles.statItem}>
                <Clock size={16} color="#94A3B8" />
                <Text style={styles.statText}>{workout.duration}</Text>
              </View>
              <View style={styles.statItem}>
                <Zap size={16} color="#94A3B8" />
                <Text style={styles.statText}>{workout.exercises} exercises</Text>
              </View>
              <View style={styles.statItem}>
                <Target size={16} color="#94A3B8" />
                <Text style={styles.statText}>{workout.calories} cal</Text>
              </View>
            </View>
            
            <View style={styles.workoutAction}>
              <View style={styles.playButtonSmall}>
                <Play size={16} color="#00D4FF" />
              </View>
            </View>
          </Pressable>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  categoryContainer: {
    paddingVertical: 20,
  },
  categoryContent: {
    paddingHorizontal: 24,
    gap: 16,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    minWidth: 120,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  selectedCategoryText: {
    color: '#00D4FF',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  workoutsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  workoutCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  workoutCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    letterSpacing: 0.5,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  workoutStats: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '400',
  },
  workoutAction: {
    alignItems: 'flex-end',
  },
  playButtonSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00D4FF',
  },
  // Workout Detail Styles
  workoutHeader: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#00D4FF',
    fontWeight: '500',
  },
  workoutTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 20,
  },
  workoutDuration: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '500',
  },
  workoutCalories: {
    fontSize: 16,
    color: '#00D4FF',
    fontWeight: '500',
  },
  exercisesList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  exercisesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00D4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  exerciseName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
  },
  startWorkoutButton: {
    marginTop: 32,
    marginBottom: 20,
  },
  startWorkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
  },
  startWorkoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 100,
  },
});