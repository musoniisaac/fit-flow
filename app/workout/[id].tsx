import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Play, Pause, SkipForward, RotateCcw, ArrowLeft, CircleCheck as CheckCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  withSequence
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const morningFlowExercises = [
  {
    id: 1,
    name: 'Push-ups',
    duration: 45,
    rest: 15,
    reps: '10-15 reps',
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your core tight throughout the movement'
    ],
    tips: 'Modify by doing knee push-ups if needed',
  },
  {
    id: 2,
    name: 'Squats',
    duration: 45,
    rest: 15,
    reps: '15-20 reps',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your chest up and knees behind toes',
      'Return to standing position'
    ],
    tips: 'Focus on proper form over speed'
  },
  {
    id: 3,
    name: 'Plank',
    duration: 30,
    rest: 15,
    reps: 'Hold for 30 seconds',
    instructions: [
      'Start in push-up position',
      'Hold your body in a straight line',
      'Engage your core and glutes',
      'Breathe steadily throughout'
    ],
    tips: 'Drop to knees if you need to maintain form'
  },
  {
    id: 4,
    name: 'Lunges',
    duration: 45,
    rest: 15,
    reps: '10 each leg',
    instructions: [
      'Step forward with one leg',
      'Lower your hips until both knees are at 90°',
      'Push back to starting position',
      'Alternate legs'
    ],
    tips: 'Keep your front knee over your ankle'
  },
  {
    id: 5,
    name: 'Burpees',
    duration: 45,
    rest: 15,
    reps: '8-12 reps',
    instructions: [
      'Start standing, then squat down',
      'Jump feet back into plank position',
      'Do a push-up (optional)',
      'Jump feet forward and jump up with arms overhead'
    ],
    tips: 'Modify by stepping instead of jumping'
  },
  {
    id: 6,
    name: 'Mountain Climbers',
    duration: 30,
    rest: 0,
    reps: '30 seconds',
    instructions: [
      'Start in plank position',
      'Bring one knee toward your chest',
      'Quickly switch legs',
      'Keep your core engaged'
    ],
    tips: 'Maintain steady rhythm and breathing'
  }
];

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeLeft, setTimeLeft] = useState(morningFlowExercises[0].duration);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  const progressValue = useSharedValue(0);
  const pulseValue = useSharedValue(1);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isResting) {
        // Exercise completed, start rest
        setCompletedExercises(prev => new Set([...prev, currentExercise]));
        if (morningFlowExercises[currentExercise].rest > 0) {
          setIsResting(true);
          setTimeLeft(morningFlowExercises[currentExercise].rest);
        } else {
          // No rest, move to next exercise
          nextExercise();
        }
      } else {
        // Rest completed, move to next exercise
        nextExercise();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isResting, currentExercise]);

  useEffect(() => {
    // Update progress animation
    const progress = (currentExercise / morningFlowExercises.length) * 100;
    progressValue.value = withTiming(progress, { duration: 500 });
  }, [currentExercise]);

  useEffect(() => {
    // Pulse animation when active
    if (isActive) {
      pulseValue.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        false
      );
    } else {
      pulseValue.value = withTiming(1, { duration: 300 });
    }
  }, [isActive]);

  const nextExercise = () => {
    if (currentExercise < morningFlowExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setTimeLeft(morningFlowExercises[currentExercise + 1].duration);
      setIsResting(false);
    } else {
      // Workout completed
      setWorkoutCompleted(true);
      setIsActive(false);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(morningFlowExercises[currentExercise].duration);
    setIsResting(false);
  };

  const skipExercise = () => {
    nextExercise();
  };

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
  }));

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentExerciseData = morningFlowExercises[currentExercise];

  if (workoutCompleted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0F0F23', '#1A1A2E']}
          style={styles.completedContainer}
        >
          <View style={styles.completedContent}>
            <CheckCircle size={80} color="#00D4FF" />
            <Text style={styles.completedTitle}>Workout Complete!</Text>
            <Text style={styles.completedSubtitle}>
              Great job finishing your Morning Flow routine
            </Text>
            <View style={styles.completedStats}>
              <Text style={styles.statText}>15 minutes • 6 exercises</Text>
              <Text style={styles.statText}>~120 calories burned</Text>
            </View>
            <Pressable style={styles.doneButton} onPress={() => router.back()}>
              <LinearGradient
                colors={['#00D4FF', '#0099CC']}
                style={styles.doneButtonGradient}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </LinearGradient>
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
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.workoutTitle}>Morning Flow</Text>
        <Text style={styles.exerciseCounter}>
          {currentExercise + 1} of {morningFlowExercises.length}
        </Text>
      </LinearGradient>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, progressAnimatedStyle]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Timer */}
        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerCircle, pulseAnimatedStyle]}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.timerLabel}>
              {isResting ? 'Rest' : 'Exercise'}
            </Text>
          </Animated.View>
        </View>

        {/* Exercise Info */}
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{currentExerciseData.name}</Text>
          <Text style={styles.exerciseReps}>{currentExerciseData.reps}</Text>
          
          {!isResting && (
            <>
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>Instructions:</Text>
                {currentExerciseData.instructions.map((instruction, index) => (
                  <Text key={index} style={styles.instructionText}>
                    {index + 1}. {instruction}
                  </Text>
                ))}
              </View>

              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>💡 Tip:</Text>
                <Text style={styles.tipsText}>{currentExerciseData.tips}</Text>
              </View>
            </>
          )}

          {isResting && (
            <View style={styles.restContainer}>
              <Text style={styles.restTitle}>Take a breather</Text>
              <Text style={styles.restText}>
                Get ready for the next exercise: {
                  currentExercise < morningFlowExercises.length - 1 
                    ? morningFlowExercises[currentExercise + 1].name
                    : 'Workout Complete!'
                }
              </Text>
            </View>
          )}
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Pressable style={styles.controlButton} onPress={resetTimer}>
            <RotateCcw size={24} color="#94A3B8" />
          </Pressable>
          
          <Pressable style={styles.playButton} onPress={toggleTimer}>
            <LinearGradient
              colors={['#00D4FF', '#0099CC']}
              style={styles.playButtonGradient}
            >
              {isActive ? (
                <Pause size={32} color="#FFFFFF" />
              ) : (
                <Play size={32} color="#FFFFFF" />
              )}
            </LinearGradient>
          </Pressable>
          
          <Pressable style={styles.controlButton} onPress={skipExercise}>
            <SkipForward size={24} color="#94A3B8" />
          </Pressable>
        </View>

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
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  exerciseCounter: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4FF',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderWidth: 3,
    borderColor: '#00D4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  timerLabel: {
    fontSize: 16,
    color: '#00D4FF',
    fontWeight: '500',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  exerciseInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  exerciseReps: {
    fontSize: 16,
    color: '#00D4FF',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 8,
  },
  tipsContainer: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00D4FF',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  restContainer: {
    alignItems: 'center',
  },
  restTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  restText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  playButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  completedContent: {
    alignItems: 'center',
  },
  completedTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: 1,
  },
  completedSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  completedStats: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statText: {
    fontSize: 14,
    color: '#00D4FF',
    fontWeight: '500',
    marginBottom: 4,
  },
  doneButton: {
    width: 200,
  },
  doneButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 40,
  },
});