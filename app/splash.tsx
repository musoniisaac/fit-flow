import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Zap } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Animate logo entrance
    logoScale.value = withTiming(1, { duration: 800 });
    logoOpacity.value = withTiming(1, { duration: 800 });
    
    // Animate text
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    
    // Pulse animation
    pulseScale.value = withSequence(
      withDelay(800, withTiming(1.1, { duration: 600 })),
      withTiming(1, { duration: 600 })
    );

    // Navigate to main app
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);

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
});