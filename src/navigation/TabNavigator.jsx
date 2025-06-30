// src/navigation/TabNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskStack from '../screens/Tasks/TaskStack';
import AddTaskScreen from '../screens/Add/AddTaskScreen';
import CompletedStack from '../screens/Completed/CompletedStack';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Tasks') iconName = 'list';
          else if (route.name === 'Add Task') iconName = 'add-circle';
          else if (route.name === 'Completed') iconName = 'checkmark-done';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1e40af',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Tasks" component={TaskStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Add Task" component={AddTaskScreen} />
      <Tab.Screen name="Completed" component={CompletedStack} options={{ headerShown : false }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
