import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTaskStore } from '../../store/useTaskStore';
import { Card } from '../common/Card';
import { colors, typography, spacing } from '../../theme';

const DAYS_OF_WEEK = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const CATEGORY_COLORS = {
  work: colors.blue[100],
  training: colors.green[100],
  study: colors.purple[100],
  other: colors.gray[100]
};

export default function TaskCalendar() {
  const navigation = useNavigation();
  const tasks = useTaskStore((state) => state.tasks);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.date === dateString);
  };

  const getCategoryColor = (tasks: any[]) => {
    if (tasks.length === 0) return '';
    if (tasks.length === 1) return CATEGORY_COLORS[tasks[0].category];
    return colors.violet[100];
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayCell} />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const tasksForDay = getTasksForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const categoryColor = getCategoryColor(tasksForDay);

      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          onPress={() => tasksForDay.length > 0 && navigation.navigate('Tasks' as never)}
          style={[
            styles.dayCell,
            isToday && styles.todayCell,
            categoryColor && { backgroundColor: categoryColor },
          ]}
        >
          <Text style={[
            styles.dayText,
            isToday && styles.todayText,
          ]}>
            {day}
          </Text>
          
          {tasksForDay.length > 0 && (
            <View style={styles.taskIndicators}>
              {tasksForDay.length > 2 ? (
                <View style={[styles.taskDot, { backgroundColor: colors.violet[400] }]} />
              ) : (
                tasksForDay.map((task, index) => (
                  <View
                    key={`task-${task.id}-${index}`}
                    style={[
                      styles.taskDot,
                      {
                        backgroundColor:
                          task.category === 'work' ? colors.blue[400] :
                          task.category === 'training' ? colors.green[400] :
                          task.category === 'study' ? colors.purple[400] :
                          colors.gray[400]
                      }
                    ]}
                  />
                ))
              )}
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Icon name="calendar" size={16} color={colors.violet[600]} />
          <Text style={styles.title}>Calendário</Text>
        </View>
        <View style={styles.monthSelector}>
          <TouchableOpacity
            onPress={handlePrevMonth}
            style={styles.monthButton}
          >
            <Icon name="chevron-left" size={20} color={colors.gray[600]} />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {currentDate.toLocaleDateString('pt-BR', { 
              month: 'long',
              year: 'numeric'
            })}
          </Text>
          <TouchableOpacity
            onPress={handleNextMonth}
            style={styles.monthButton}
          >
            <Icon name="chevron-right" size={20} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekDays}>
        {DAYS_OF_WEEK.map((day) => (
          <View key={day} style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.calendar}>
        {renderCalendar()}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold as any,
    color: colors.gray[900],
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthButton: {
    padding: spacing.sm,
    borderRadius: spacing.lg,
  },
  monthText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[700],
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  weekDayText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium as any,
    color: colors.gray[500],
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 1,
    position: 'relative',
  },
  todayCell: {
    borderWidth: 1,
    borderColor: colors.violet[300],
    borderRadius: spacing.sm,
  },
  dayText: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    fontSize: typography.sizes.xs,
    color: colors.gray[600],
  },
  todayText: {
    fontWeight: typography.weights.bold as any,
    color: colors.violet[600],
  },
  taskIndicators: {
    position: 'absolute',
    bottom: spacing.xs,
    right: spacing.xs,
    flexDirection: 'row',
    gap: 2,
  },
  taskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});