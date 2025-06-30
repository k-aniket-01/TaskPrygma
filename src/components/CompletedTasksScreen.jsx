// 📁 src/components/CompletedTasksScreen.jsx
import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getTasks } from '../services/api';

const CompletedTasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  const fetchTasks = async () => {
    try {
      const allTasks = await getTasks();
      const completed = allTasks.filter(task => task.completed === true);
      setTasks(completed);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.heading}>✅ Completed Tasks</Text> */}

      {tasks.length === 0 ? (
        <Text style={styles.empty}>No completed tasks.</Text>
      ) : (
        tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskCard}
            onPress={() => navigation.navigate('EditTask', { task })}
          >
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskText}>📝 {task.description}</Text>
            <Text style={styles.taskText}>📅 {task.dueDate}</Text>
            <Text style={styles.status}>Status: ✅ Completed</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f5f9',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0f172a',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748b',
    marginTop: 30,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#0f172a',
  },
  taskText: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 4,
  },
  status: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#10b981',
  },
});

export default CompletedTasksScreen;
