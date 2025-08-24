import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const sampleRoutines = {
  '2025-01-15': [{ name: 'Morning Run', time: '7:00 AM' }, { name: 'Core Workout', time: '7:00 PM' }],
  '2025-01-16': [{ name: 'Upper Body', time: '6:00 PM' }],
  '2025-01-17': [{ name: 'Yoga Session', time: '8:00 AM' }, { name: 'Cardio', time: '6:30 PM' }],
  '2025-01-18': [{ name: 'Leg Day', time: '7:00 AM' }],
  '2025-01-20': [{ name: 'Full Body', time: '6:00 PM' }, { name: 'Stretching', time: '9:00 PM' }],
};

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hasRoutines = sampleRoutines[dateKey];
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const isSelected = selectedDate === dateKey;

      days.push(
        <Pressable
          key={day}
          style={[
            styles.dayCell,
            isToday && styles.todayCell,
            isSelected && styles.selectedCell,
            hasRoutines && styles.routineDay
          ]}
          onPress={() => setSelectedDate(isSelected ? null : dateKey)}
        >
          <Text style={[
            styles.dayText,
            isToday && styles.todayText,
            isSelected && styles.selectedText,
            hasRoutines && styles.routineDayText
          ]}>
            {day}
          </Text>
          {hasRoutines && <View style={styles.routineDot} />}
        </Pressable>
      );
    }

    return days;
  };

  const selectedRoutines = selectedDate ? sampleRoutines[selectedDate] : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Workout Calendar</Text>
      </View>

      {/* Calendar Navigation */}
      <View style={styles.calendarHeader}>
        <Pressable style={styles.navButton} onPress={() => navigateMonth(-1)}>
          <ChevronLeft size={24} color="#3B82F6" />
        </Pressable>
        <Text style={styles.monthYear}>
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
        <Pressable style={styles.navButton} onPress={() => navigateMonth(1)}>
          <ChevronRight size={24} color="#3B82F6" />
        </Pressable>
      </View>

      {/* Days of week header */}
      <View style={styles.weekHeader}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendar}>
        {renderCalendar()}
      </View>

      {/* Selected Date Routines */}
      {selectedRoutines && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateTitle}>
            Routines for {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          {selectedRoutines.map((routine, index) => (
            <View key={index} style={styles.routineItem}>
              <View style={styles.routineInfo}>
                <Text style={styles.routineName}>{routine.name}</Text>
                <Text style={styles.routineTime}>{routine.time}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Add Routine Button */}
      <Pressable style={styles.addButton}>
        <Plus size={24} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add Routine</Text>
      </Pressable>

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
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#0F0F23',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  weekHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dayCell: {
    width: (width - 40) / 7,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emptyDay: {
    width: (width - 40) / 7,
    height: 48,
  },
  dayText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  todayCell: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    borderRadius: 8,
  },
  todayText: {
    color: '#00D4FF',
    fontWeight: '700',
  },
  selectedCell: {
    backgroundColor: '#00D4FF',
    borderRadius: 8,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  routineDay: {
    // Additional styling for days with routines
  },
  routineDayText: {
    fontWeight: '600',
  },
  routineDot: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00D4FF',
  },
  selectedDateContainer: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedDateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  routineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  routineTime: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D4FF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 100,
  },
});