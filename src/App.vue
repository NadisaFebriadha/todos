
<template>
  <div id="app">
    <h1>My Todo List</h1>
    <div>
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task" />
      <button @click="addTask">Add</button>
    </div>
    
    <div class="bg">
      <ul>
        <li v-for="(task, index) in tasks" :key="index" class="task-item">
          <!-- <input type="checkbox" v-model="task.completed" @change="toggleTaskCompletion(index)" /> -->
          <span v-if="!task.editing" :class="{ completed: task.completed }">{{ task.text }}</span>
          <input v-else v-model="task.editText" @keyup.enter="saveEditTask(index)" />
          <div class="button-container">
            <button v-if="!task.editing" @click="enableEditTask(index)">Edit</button>
            <button style="background-color: red;" @click="removeTask(index)">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTodoListStore } from './stores/todolist';

export default {
  setup() {
    const newTask = ref('');
    const todoListStore = useTodoListStore();

    const addTask = () => {
      todoListStore.addTask(newTask.value);
      newTask.value = '';
    };

    const removeTask = (index) => {
      todoListStore.removeTask(index);
    };

    const toggleTaskCompletion = (index) => {
      todoListStore.toggleTaskCompletion(index);
    };

    const enableEditTask = (index) => {
      todoListStore.tasks[index].editing = true;
      todoListStore.tasks[index].editText = todoListStore.tasks[index].text;
    };

    const saveEditTask = (index) => {
      todoListStore.editTask(index, todoListStore.tasks[index].editText);
      todoListStore.tasks[index].editing = false;
    };

    return {
      newTask,
      tasks: todoListStore.tasks,
      addTask,
      removeTask,
      toggleTaskCompletion,
      enableEditTask,
      saveEditTask,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}


.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1rem;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 6px;
  width: 96%;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  width: 52%;
  padding: 10px;
}

.completed {
  text-decoration: line-through;
}


input {
  padding: 0.6em 1.2em;
  font-size: medium;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: #FFF;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 40%;
}

button {
  margin-left: 1.5rem;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: dodgerblue;
  cursor: pointer;
  transition: border-color 0.25s;
  color: rgb(255 255 255);
}

.button-container {
  display: flex;
  gap: 1px;
}
</style>

<!-- <style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  justify-content: center;
}

.bg {
  display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}
input {
  padding: 0.6em 1.2em;
  font-size: medium;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: #FFF;
  border-radius: 0.5rem;
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 40%;
}

button {
  margin-left: 24px;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: dodgerblue;
  cursor: pointer;
  transition: border-color 0.25s;
}

ul {
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.completed {
  text-decoration: line-through;
}

input[type="checkbox"] {
  margin-left: 10px;
}
</style> -->
