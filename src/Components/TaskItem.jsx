import React from "react";

const TaskItem = ({ task, toggleComplete, deleteTask, setTaskToEdit }) => {
    return (
        <div
            className={`p-4 my-2 border ${task.completed ? "bg-lightPurple" : "bg-palePurple"} flex flex-col  justify-between rounded-lg`}
        >
            <div>
                <h3 className="font-bold text-3xl text-center mb-5 text-white">{task.name}</h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-paleRose-50 mb-5 flex flex-wrap">
                    <p className="text-lg text-justify">{task.description}</p>
                </div>

            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center justify-between space-x-2 ">
                    <button
                        className="bg-darkRose text-white p-2 rounded-md"
                        onClick={() => setTaskToEdit(task)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white p-2 rounded-md"
                        onClick={() => deleteTask(task.id)}
                    >
                        Delete
                    </button>
                </div>

                <button
                    className={`py-2 px-3 ${task.completed ? "bg-green-500" : "bg-gray-500"} rounded-md`}
                    onClick={() => toggleComplete(task.id)}
                >
                    {task.completed ? "✅" : "❌"}
                </button>

            </div>
        </div>
    );
};

export default TaskItem;
