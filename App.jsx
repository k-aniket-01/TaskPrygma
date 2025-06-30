import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TaskListScreen from './src/components/TaskListScreen';
import AddTaskScreen from './src/components/AddTaskScreen';
import CompletedTasksScreen from './src/components/CompletedTasksScreen';
import EditTaskScreen from './src/components/EditTaskScreen';

const TaskStack = createStackNavigator();
const CompletedStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🧩 Stack for Pending Tasks
function TaskStackNavigator() {
  return (
    <TaskStack.Navigator>
      <TaskStack.Screen name="TasksList" component={TaskListScreen} options={{ title: 'Pending Tasks' }} />
      <TaskStack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
    </TaskStack.Navigator>
  );
}

// 🧩 Stack for Completed Tasks
function CompletedStackNavigator() {
  return (
    <CompletedStack.Navigator>
      <CompletedStack.Screen name="Completed" component={CompletedTasksScreen} options={{ title: 'Completed Tasks' }} />
      <CompletedStack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
    </CompletedStack.Navigator>
  );
}

// 🚀 Main App
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Tasks"
        screenOptions={({ route }) => ({
          headerShown: route.name === 'Add', // ✅ Only show header on Add tab
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Tasks') {
              iconName = 'list';
            } else if (route.name === 'Add') {
              iconName = 'add-circle';
            } else if (route.name === 'Completed-Task') {
              iconName = 'checkmark-done';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Tasks" component={TaskStackNavigator} />
        <Tab.Screen name="Add" component={AddTaskScreen} options={{ title: 'Add Task' }} />
        <Tab.Screen name="Completed-Task" component={CompletedStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
