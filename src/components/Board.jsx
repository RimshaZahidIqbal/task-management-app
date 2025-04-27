// src/components/Board.jsx
import { useEffect, useState } from 'react';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../Context/AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddTaskModal from './AddTaskModal';
import TaskCard from './TaskCard';

const STATUSES = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
];

export default function Board() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Fetch tasks for this user
    useEffect(() => {
        if (!user) return;
        const q = query(
            collection(db, 'tasks'),
            where('userId', '==', user.uid)
        );
        return onSnapshot(q, snap => {
            const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setTasks(arr);
        });
    }, [user]);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        // update status in Firestore
        const taskRef = doc(db, 'tasks', draggableId);
        await updateDoc(taskRef, { status: destination.droppableId });
    };

    return (
        <div className="p-6 flex flex-col h-screen">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Task Board</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                    + New Task
                </button>
            </header>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 flex-1 overflow-auto">
                    {STATUSES.map(({ id, title }) => (
                        <Droppable key={id} droppableId={id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-gray-100 p-4 rounded flex-1 flex flex-col"
                                >
                                    <h2 className="text-lg font-medium mb-2">{title}</h2>
                                    <div className="flex-1 space-y-2 overflow-auto">
                                        {tasks
                                            .filter(t => t.status === id)
                                            .map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(prov) => (
                                                        <div
                                                            ref={prov.innerRef}
                                                            {...prov.draggableProps}
                                                            {...prov.dragHandleProps}
                                                        >
                                                            <TaskCard task={task} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            {showModal && (
                <AddTaskModal
                    onClose={() => setShowModal(false)}
                    userId={user.uid}
                />
            )}
        </div>
    );
}
