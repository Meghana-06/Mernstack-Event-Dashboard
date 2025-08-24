import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { register } from '../features/auth/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { loading, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(register(form));
    if (res.type.endsWith('fulfilled')) navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Name"
               value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Email" type="email"
               value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password"
               value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">{loading ? '...' : 'Create account'}</button>
      </form>
      <p className="mt-4 text-sm">Have an account? <Link className="underline" to="/login">Login</Link></p>
    </div>
  );
}
