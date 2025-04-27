// src/components/Board.jsx
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../Context/AuthContext';
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

    // real-time subscription
    useEffect(() => {
        if (!user) return;
        const q = query(
            collection(db, 'tasks'),
            where('userId', '==', user.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const arr = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setTasks(arr);
        });
        return unsubscribe;  // clean up on unmount/user change
    }, [user]);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        await updateDoc(doc(db, 'tasks', draggableId), {
            status: destination.droppableId
        });
        // no need to manually setTasks—onSnapshot will fire again :contentReference[oaicite:0]{index=0}
    };

    return (
        <div className="p-8 bg-gradient-to-b from-indigo-500 to-purple-600 min-h-screen">
            <header className="flex justify-between items-center mb-6 text-white">
                <h1 className="text-4xl font-bold">Task Board</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg shadow-md"
                >
                    + New Task
                </button>
            </header>

            {showModal && user && (
                <AddTaskModal
                    onClose={() => setShowModal(false)}
                    userId={user.uid}
                // no need for onTaskAdded callback any more
                />
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-8">
                    {STATUSES.map(({ id, title }) => (
                        <Droppable key={id} droppableId={id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-white p-6 rounded-lg shadow-md w-1/3"
                                >
                                    <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
                                    <div className="space-y-4">
                                        {tasks
                                            .filter(t => t.status === id)
                                            .map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(prov) => (
                                                        <div
                                                            ref={prov.innerRef}
                                                            {...prov.draggableProps}
                                                            {...prov.dragHandleProps}
                                                            className="p-4 bg-gray-50 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
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
        </div>
    );
}
