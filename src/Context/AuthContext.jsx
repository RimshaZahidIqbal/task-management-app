// src/Context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';  // Import the toast function from react-toastify
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import '../config/firebase';

const auth = getAuth();

const AuthContext = createContext({
    user: null,
    loading: true,
    error: null,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // subscribe to firebase auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
            setError(null);
        });
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            setUser(cred.user);
            toast.success('Login Successful!');  // Show success toast on login success
            return cred.user;
        } catch (err) {
            setError(err);
            toast.error(`Login failed: ${err.message}`);  // Show error toast on login failure
            throw err;
        }
    };

    const register = async (email, password) => {
        setError(null);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            setUser(cred.user);
            toast.success('Registration Successful!');  // Show success toast on registration success
            return cred.user;
        } catch (err) {
            setError(err);
            toast.error(`Registration failed: ${err.message}`);  // Show error toast on registration failure
            throw err;
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await signOut(auth);
            setUser(null);
            toast.info('Logged out successfully');  // Show info toast on logout
        } catch (err) {
            setError(err);
            toast.error(`Logout failed: ${err.message}`);  // Show error toast on logout failure
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
