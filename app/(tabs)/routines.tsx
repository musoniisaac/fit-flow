import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Plus, Clock, Users, Zap } from 'lucide-react-native';

const routineCategories = [
  {
    id: 1,
    name: 'Cardio',
    color: '#F97316',
    icon: Zap,
    routines: [
      { id: 1, name: 'Morning Run', duration: '30 min', exercises: 1, difficulty: 'Easy' },
      { id: 2, name: 'HIIT Workout', duration: '20 min', exercises: 8, difficulty: 'Hard' },
      { id: 3, name: 'Cycling', duration: '45 min', exercises: 1, difficulty: 'Medium' },
    ]
  },
  {
    id: 2,
    name: 'Strength',
    color: '#3B82F6',
    icon: Users,
    routines: [
      { id: 4, name: 'Upper Body', duration: '45 min', exercises: 6, difficulty: 'Medium' },
      { id: 5, name: 'Lower Body', duration: '50 min', exercises: 7, difficulty: 'Hard' },
      { id: 6, name: 'Core Strength', duration: '25 min', exercises: 5, difficulty: 'Medium' },
    ]
  },
  {
    id: 3,
    name: 'Flexibility',
    color: '#10B981',
    icon: Clock,
    routines: [
      { id: 7, name: 'Morning Yoga', duration: '30 min', exercises: 12, difficulty: 'Easy' },
      { id: 8, name: 'Evening Stretch', duration: '15 min', exercises: 8, difficulty: 'Easy' },
      { id: 9, name: 'Deep Stretch', duration: '40 min', exercises: 15, difficulty: 'Medium' },
    ]
  }
];

export default function RoutinesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(routineCategories[0].id);

  const selectedCategoryData = routineCategories.find(cat => cat.id === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10B981';
      case 'Medium': return '#F59E0B';
      case 'Hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Workout Routines</Text>
      </View>

      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {routineCategories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Pressable
              key={category.id}
              style={[
                styles.categoryTab,
                isSelected && { backgroundColor: category.color }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <IconComponent 
                size={20} 
                color={isSelected ? '#FFFFFF' : category.color} 
              />
              <Text style={[
                styles.categoryText,
                isSelected && styles.selectedCategoryText
              ]}>
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Routines List */}
      <ScrollView style={styles.routinesList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>
          {selectedCategoryData.name} Routines
        </Text>
        
        {selectedCategoryData.routines.map((routine) => (
          <Pressable key={routine.id} style={styles.routineCard}>
            <View style={styles.routineHeader}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(routine.difficulty) + '20' }
              ]}>
                <Text style={[
                  styles.difficultyText,
                  { color: getDifficultyColor(routine.difficulty) }
                ]}>
                  {routine.difficulty}
                </Text>
              </View>
            </View>
            
            <View style={styles.routineDetails}>
              <View style={styles.detailItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.detailText}>{routine.duration}</Text>
              </View>
              <View style={styles.detailItem}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.detailText}>{routine.exercises} exercises</Text>
              </View>
            </View>
            
            <View style={styles.routineActions}>
              <Pressable style={[styles.actionButton, styles.startButton]}>
                <Text style={styles.startButtonText}>Start Workout</Text>
              </Pressable>
              <Pressable style={[styles.actionButton, styles.previewButton]}>
                <Text style={styles.previewButtonText}>Preview</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}

        {/* Create New Routine Card */}
        <Pressable style={styles.createRoutineCard}>
          <View style={styles.createRoutineContent}>
            <View style={styles.createIconContainer}>
              <Plus size={32} color="#3B82F6" />
            </View>
            <Text style={styles.createRoutineTitle}>Create New Routine</Text>
            <Text style={styles.createRoutineSubtitle}>
              Build your own custom workout routine
            </Text>
          </View>
        </Pressable>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  routinesList: {
    flex: 1,
    padding: 20,
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  routineDetails: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  routineActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#3B82F6',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  previewButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  previewButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  createRoutineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  createRoutineContent: {
    alignItems: 'center',
  },
  createIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  createRoutineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  createRoutineSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});