// 📁 src/components/EditTaskScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateTask, deleteTask} from '../services/api';
import moment from 'moment';

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));
  const [completed, setCompleted] = useState(task.completed);
  const [showPicker, setShowPicker] = useState(false);

  const handleDelete = async () => {
  Alert.alert(
    '⚠️ Confirm Delete',
    'Are you sure you want to delete this task?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(task.id);
            Alert.alert('🗑️ Task deleted successfully');
            navigation.goBack();
          } catch (err) {
            console.error('Delete failed', err);
            Alert.alert('❌ Failed to delete task');
          }
        },
      },
    ]
  );
};


  const handleUpdate = async () => {
    const formattedDate = moment(dueDate).format('YYYY-MM-DD');
    const updated = { ...task, title, description, dueDate: formattedDate, completed };

    try {
      await updateTask(task.id, updated);
      Alert.alert('✅ Task updated successfully');
      navigation.goBack();
    } catch (err) {
      console.error('Update failed', err);
      Alert.alert('❌ Failed to update task');
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
      <Text style={styles.heading}>🛠 Edit Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
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

      <View style={styles.switchRow}>
        <Text style={styles.label}>
          Status: {completed ? '✅ Completed' : '❌ Pending'}
        </Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Update Task" onPress={handleUpdate} color="#2563eb" />
      </View>

      <View style={[styles.buttonContainer, { marginTop: 12 }]}>
  <Button title="Delete Task" onPress={handleDelete} color="#dc2626" />
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default EditTaskScreen;
