import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Due Date");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    setTasks(parsedTasks);
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), completed: false }; // Ensure the task gets an id
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };
  

  const editTask = (task, id) => {
    const updatedTasks = tasks.map((t) => (t.id === id ? task : t));
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks); // Save the updated tasks to localStorage
  };
  

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === "Due Date") {
      return new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity);
    }
    if (sortBy === "Priority") {
      const priorityOrder = { High: 1, Normal: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className={`mx-auto py-10 px-24 ${sortedTasks.length === 0 ? "h-screen" : [1, 2, 3].includes(sortedTasks.length) ? "h-full" : "h-full"} bg-darkPurple`}>
      <h1 className="text-3xl font-bold text-center mb-6 bg-lightPurple p-4 rounded-lg text-darkRose w-full">
        To-Do List
      </h1>
      <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      <div className="flex justify-between mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded-lg">
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded-lg">
          <option value="Due Date">Due Date</option>
          <option value="Priority">Priority</option>
        </select>
      </div>
      <div className={`bg-paleRose-75 p-5 rounded-lg ${tasks.length !== 0 ? "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" : "flex flex-col justify-center"}`}>
        {sortedTasks.length === 0 ? (
          <p className="text-white p-4 text-center">No tasks available</p>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} setTaskToEdit={setTaskToEdit} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
