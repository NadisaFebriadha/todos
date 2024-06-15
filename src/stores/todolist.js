import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoListStore = defineStore('todoList', () => {
    const tasks = ref([]);

    const addTask = (text) => {
        if (text.trim() !== '') {
            tasks.value.push({ text, completed: false });
        }
    };

    const removeTask = (index) => {
        tasks.value.splice(index, 1);
    };

    const toggleTaskCompletion = (index) => {
        tasks.value[index].completed = !tasks.value[index].completed;
    };

    const editTask = (index, newText) => {
        if (newText.trim() !== '') {
            tasks.value[index].text = newText;
        }
    };

    return {
        tasks,
        addTask,
        removeTask,
        toggleTaskCompletion,
        editTask
    };
});