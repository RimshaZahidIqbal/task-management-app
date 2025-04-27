import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading…</p>;
    if (!user) return <Navigate to="/" replace />;
    return children;
}