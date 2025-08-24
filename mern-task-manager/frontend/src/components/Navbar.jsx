import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice.js';

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="p-4 shadow flex items-center justify-between bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
      <Link to="/" className="font-bold text-xl">Task Manager</Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm opacity-80">Hi, {user.name}</span>
            <Link to="/tasks" className="underline">Tasks</Link>
            <button onClick={handleLogout} className="px-3 py-1 rounded bg-zinc-800 text-white dark:bg-zinc-100 dark:text-black">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
