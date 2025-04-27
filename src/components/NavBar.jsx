import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext'; // make sure this path is correct
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase'; // your firebase config

export default function NavBar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // redirect to homepage after logout
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Left: Logo + Title */}
                <Link to="/" className="flex items-center space-x-2">
                    <FaGithub className="h-6 w-6 text-gray-800" />
                    <span className="text-xl font-bold text-gray-800">Task Manager</span>
                </Link>

                {/* Right: Auth Buttons */}
                <div>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/auth"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                        >
                            Login
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    );
}
