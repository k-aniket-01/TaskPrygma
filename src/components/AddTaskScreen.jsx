// 📁 src/components/AddTaskScreen.jsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { addTask } from '../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !dueDate) {
      Alert.alert('Please fill all fields');
      return;
    }

    const formattedDate = moment(dueDate).format('YYYY-MM-DD');
    const task = { title, description, dueDate: formattedDate, completed: false };

    try {
      await addTask(task);
      Alert.alert('✅ Task added successfully');
      setTitle('');
      setDescription('');
      setDueDate(new Date());
    } catch (err) {
      Alert.alert('❌ Error adding task');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>➕ Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#94a3b8"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#94a3b8"
        multiline
      />

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>
          {moment(dueDate).format('YYYY-MM-DD')}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Add Task" onPress={handleSubmit} color="#2563eb" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
    color: '#0f172a',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#0f172a',
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default AddTaskScreen;
