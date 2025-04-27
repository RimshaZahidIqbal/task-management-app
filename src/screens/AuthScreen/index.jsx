// src/components/AuthScreen.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/icons';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const initForm = {
    email: '',
    password: '',
};

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState(initForm);

    const { login, register, error } = useAuth();
    const navigate = useNavigate();
    const authText = isLogin ? "Don't have an account?" : 'Already have an account?';

    const handleChange = (event) => {
        setForm((oldForm) => ({
            ...oldForm,
            [event.target.name]: event.target.value,
        }));
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(form.email, form.password);
                toast.success('Logged in successfully');
            } else {
                await register(form.email, form.password);
                toast.success('Registered successfully');
            }
            setForm(initForm);
            navigate('/board');
        } catch (err) {
            // error is already set in context
            toast.error(err.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
            {/* Uncomment if you want the logo */}
            <img src={Logo} alt="Logo" className="w-44 mb-6" />

            <p className="text-gray-700 text-center mb-8">
                Increase your productivity with us.
                <br />
                Work anywhere around the world.
            </p>

            <form
                className="flex flex-col gap-4 w-full max-w-sm"
                onSubmit={handleAuth}
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    className="p-3 rounded-lg bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    name="password"
                    className="p-3 rounded-lg bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {error && (
                    <p className="text-red-600 text-sm mt-1">
                        {error.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
                    disabled={!form.email.trim() || !form.password.trim()}
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>

                <p
                    className="text-center text-gray-600 hover:text-gray-800 cursor-pointer mt-2"
                    onClick={() => setIsLogin((val) => !val)}
                >
                    {authText}
                </p>
            </form>
        </div>
    );
};

export default AuthScreen;
