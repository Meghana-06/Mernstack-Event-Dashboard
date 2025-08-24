import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from '../features/auth/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.type.endsWith('fulfilled')) navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Email" type="email"
               value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password"
               value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">{loading ? '...' : 'Login'}</button>
      </form>
      <p className="mt-4 text-sm">No account? <Link className="underline" to="/register">Register</Link></p>
    </div>
  );
}
