// src/components/AddTaskModal.jsx
import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddTaskModal = ({ onClose, userId, onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addTask = async () => {
        if (!title || !description) return;

        try {
            const taskRef = await addDoc(collection(db, 'tasks'), {
                title,
                description,
                assignedTo: userId,
                status: 'todo',  // Default status as 'To Do'
            });

            // Call the onTaskAdded callback to refetch tasks or update state in parent
            onTaskAdded(taskRef.id);

            onClose();  // Close the modal after adding the task
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                        Cancel
                    </button>
                    <button onClick={addTask} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
