// src/components/TaskCard.jsx
import { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function TaskCard({ task }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);

    const saveTitle = async () => {
        await updateDoc(doc(db, 'tasks', task.id), { title });
        setEditing(false);
    };

    const remove = () => deleteDoc(doc(db, 'tasks', task.id));

    return (
        <div className="bg-white p-3 rounded shadow">
            {editing ? (
                <div className="flex gap-2">
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="border flex-1 px-2"
                    />
                    <button onClick={saveTitle} className="text-green-600">Save</button>
                </div>
            ) : (
                <h3 className="font-semibold">{task.title}</h3>
            )}
            <p className="text-sm text-gray-600">{task.assignedTo}</p>
            <div className="mt-2 flex gap-2">
                <button
                    onClick={() => setEditing(true)}
                    className="text-blue-600 text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={remove}
                    className="text-red-600 text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
