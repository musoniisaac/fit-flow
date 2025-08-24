import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Zap, Play, Target } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  runOnJS
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const splitLeftX = useSharedValue(0);
  const splitRightX = useSharedValue(0);

  useEffect(() => {
    // Initial logo animation
    logoScale.value = withTiming(1, { duration: 800 });
    logoOpacity.value = withTiming(1, { duration: 800 });
    
    // Text animation
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    
    // Pulse animation
    pulseScale.value = withSequence(
      withDelay(800, withTiming(1.1, { duration: 600 })),
      withTiming(1, { duration: 600 })
    );

    // Show split screen after initial animation
    const timer = setTimeout(() => {
      setShowSplitScreen(true);
      
      // Split screen animation
      splitLeftX.value = withTiming(-width / 2, { duration: 800 });
      splitRightX.value = withTiming(width / 2, { duration: 800 });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const leftSplitStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: splitLeftX.value }],
  }));

  const rightSplitStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: splitRightX.value }],
  }));

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  if (showSplitScreen) {
    return (
      <View style={styles.splitContainer}>
        {/* Left Split */}
        <Animated.View style={[styles.splitLeft, leftSplitStyle]}>
          <LinearGradient
            colors={['#0F0F23', '#1A1A2E']}
            style={styles.splitContent}
          >
            <View style={styles.splitSection}>
              <View style={styles.featureIcon}>
                <Zap size={32} color="#00D4FF" />
              </View>
              <Text style={styles.featureTitle}>Equipment Free</Text>
              <Text style={styles.featureDescription}>
                Complete workouts using only your body weight
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Right Split */}
        <Animated.View style={[styles.splitRight, rightSplitStyle]}>
          <LinearGradient
            colors={['#1A1A2E', '#16213E']}
            style={styles.splitContent}
          >
            <View style={styles.splitSection}>
              <View style={styles.featureIcon}>
                <Target size={32} color="#00D4FF" />
              </View>
              <Text style={styles.featureTitle}>Track Progress</Text>
              <Text style={styles.featureDescription}>
                Monitor your fitness journey with detailed analytics
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Center Content */}
        <View style={styles.centerContent}>
          <View style={styles.centerLogo}>
            <View style={styles.logoBackground}>
              <Zap size={48} color="#00D4FF" strokeWidth={2.5} />
            </View>
          </View>
          
          <Text style={styles.centerTitle}>FitFlow</Text>
          <Text style={styles.centerSubtitle}>Your Future Fitness Journey</Text>
          
          <Pressable style={styles.getStartedButton} onPress={handleGetStarted}>
            <LinearGradient
              colors={['#00D4FF', '#0099CC']}
              style={styles.buttonGradient}
            >
              <Play size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#16213E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle, pulseAnimatedStyle]}>
          <View style={styles.logoBackground}>
            <Zap size={48} color="#00D4FF" strokeWidth={2.5} />
          </View>
        </Animated.View>
        
        <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
          <Text style={styles.appName}>FitFlow</Text>
          <Text style={styles.tagline}>Your Future Fitness Journey</Text>
        </Animated.View>
      </View>
      
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBar}>
          <LinearGradient
            colors={['#00D4FF', '#0099CC']}
            style={styles.loadingProgress}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '400',
    letterSpacing: 1,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.6,
  },
  loadingBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '100%',
    borderRadius: 2,
  },
  // Split Screen Styles
  splitContainer: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  splitLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width / 2,
    height: height,
  },
  splitRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: width / 2,
    height: height,
  },
  splitContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  splitSection: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  featureDescription: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 10, 15, 0.95)',
    paddingHorizontal: 40,
  },
  centerLogo: {
    marginBottom: 24,
  },
  centerTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 2,
    textAlign: 'center',
  },
  centerSubtitle: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: '400',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 40,
  },
  getStartedButton: {
    marginTop: 20,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});