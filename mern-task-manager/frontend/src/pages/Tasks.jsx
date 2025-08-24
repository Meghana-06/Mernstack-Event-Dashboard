import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../features/tasks/tasksSlice.js';

export default function Tasks() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.tasks);
  const [form, setForm] = useState({ title: '', description: '', status: 'pending', dueDate: '' });

  useEffect(() => { dispatch(fetchTasks()); }, [dispatch]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (payload.dueDate) payload.dueDate = new Date(payload.dueDate).toISOString();
    const res = await dispatch(addTask(payload));
    if (res.type.endsWith('fulfilled')) setForm({ title: '', description: '', status: 'pending', dueDate: '' });
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Add Task</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Title"
                 value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="w-full p-2 border rounded" placeholder="Description"
                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select className="w-full p-2 border rounded" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input className="w-full p-2 border rounded" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <button className="px-4 py-2 bg-black text-white rounded">Add</button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
        {loading && <p>Loading...</p>}
        <ul className="space-y-2">
          {items.map((t) => (
            <li key={t._id} className="border rounded p-3 flex flex-col gap-2 bg-white dark:bg-zinc-900">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-sm opacity-80">{t.description}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded border">{t.status}</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded" onClick={() => dispatch(updateTask({ id: t._id, data: { status: t.status === 'completed' ? 'pending' : 'completed' } }))}>
                  Toggle Complete
                </button>
                <button className="px-3 py-1 border rounded" onClick={() => dispatch(deleteTask(t._id))}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
