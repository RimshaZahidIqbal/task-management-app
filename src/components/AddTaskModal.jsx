// src/components/AddTaskModal.jsx
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function AddTaskModal({ onClose, userId }) {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [assignedTo, setUser] = useState('');

    const create = async () => {
        await addDoc(collection(db, 'tasks'), {
            title,
            description,
            assignedTo,
            status: 'todo',
            userId,
            createdAt: serverTimestamp(),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-96">
                <h2 className="text-xl mb-4">New Task</h2>
                <input
                    placeholder="Title"
                    className="w-full mb-2 p-2 border rounded"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    placeholder="Assigned To"
                    className="w-full mb-2 p-2 border rounded"
                    value={assignedTo}
                    onChange={e => setUser(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    className="w-full mb-4 p-2 border rounded"
                    value={description}
                    onChange={e => setDesc(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2">Cancel</button>
                    <button
                        onClick={create}
                        className="px-4 py-2 bg-indigo-600 text-white rounded"
                        disabled={!title.trim() || !assignedTo.trim()}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

