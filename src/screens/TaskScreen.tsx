import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../theme';
import ScreenContainer from '../components/common/ScreenContainer';
import Header from '../components/common/Header';
import TaskList from '../components/tasks/TaskList';

export default function TaskScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Implement refresh logic here
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleAddTask = () => {
    navigation.navigate('TaskForm' as never);
  };

  return (
    <ScreenContainer>
      <Header 
        title="Tarefas" 
        rightAction={{
          icon: 'plus',
          onPress: handleAddTask
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <TaskList />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});