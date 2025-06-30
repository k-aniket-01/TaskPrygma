// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/tasks';

export const getTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(BASE_URL, task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error.message);
    throw error;
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error.message);
    throw error;
  }
};
