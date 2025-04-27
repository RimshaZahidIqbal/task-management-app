import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../Context/AuthContext';
import AddTaskModal from './AddTaskModal';
import TaskCard from './TaskCard';
import NavBar from './NavBar';

const STATUSES = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
];

export default function Board() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const arr = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setTasks(arr);
        });
        return unsubscribe;
    }, [user]);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        await updateDoc(doc(db, 'tasks', draggableId), {
            status: destination.droppableId
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 p-8">

            {/* Header */}
            <NavBar />
            <header className="flex justify-between items-center mb-10 text-white">
                <h1 className="text-5xl font-extrabold tracking-wide">Task Manager</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition"
                >
                    + New Task
                </button>
            </header>

            {/* Modal */}
            {showModal && user && (
                <AddTaskModal onClose={() => setShowModal(false)} userId={user.uid} />
            )}

            {/* Board */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6 justify-center">
                    {STATUSES.map(({ id, title }) => (
                        <Droppable key={id} droppableId={id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex flex-col bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl w-80 min-h-[500px]"
                                >
                                    <h2 className="text-center text-2xl font-semibold mb-4 text-indigo-800">{title}</h2>
                                    <div className="flex flex-col gap-4">
                                        {tasks
                                            .filter(t => t.status === id)
                                            .map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(prov) => (
                                                        <div
                                                            ref={prov.innerRef}
                                                            {...prov.draggableProps}
                                                            {...prov.dragHandleProps}
                                                            className="p-4 bg-gray-100 rounded-lg shadow-md hover:scale-[1.02] transition-transform"
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
