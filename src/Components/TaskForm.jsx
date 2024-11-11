import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, editTask, taskToEdit, setTaskToEdit }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("Normal");

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDescription(taskToEdit.description);
      setTaskDueDate(taskToEdit.dueDate || "");
      setTaskPriority(taskToEdit.priority || "Normal");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription) {
      alert("Both fields are required!");
      return;
    }

    const task = { 
      name: taskName, 
      description: taskDescription, 
      dueDate: taskDueDate, 
      priority: taskPriority 
    };

    if (taskToEdit) {
      editTask(task, taskToEdit.id);
      setTaskToEdit(null);
    } else {
      addTask(task);
    }

    setTaskName("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskPriority("Normal");
  };

  return (
    <form className="flex flex-col gap-4 justify-center items-center self-center mb-4 bg-lightPurple p-4 mt-auto rounded-lg w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task name"
        className="border p-2 w-full mb-2 rounded-lg"
      />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task description"
        className="border p-2 w-full mb-2 rounded-lg"
      />
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
        className="border p-2 w-full mb-2 rounded-lg"
      />
      <select
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
        className="border p-2 w-full mb-2 rounded-lg"
      >
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>
      <button
        type="submit"
        className="bg-darkRose text-white p-2 w-full rounded-lg hover:bg-purplle transition"
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
