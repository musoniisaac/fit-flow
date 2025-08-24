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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    padding: 8,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  weekHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
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
    color: '#1F2937',
    fontWeight: '500',
  },
  todayCell: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  todayText: {
    color: '#3B82F6',
    fontWeight: '700',
  },
  selectedCell: {
    backgroundColor: '#3B82F6',
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
    backgroundColor: '#F97316',
  },
  selectedDateContainer: {
    margin: 20,
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
  selectedDateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  routineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  routineTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 100,
  },
});