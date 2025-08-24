import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/tasksSlice.js';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.tasks);

  useEffect(() => { dispatch(fetchTasks()); }, [dispatch]);

  const data = [
    { name: 'Pending', value: items.filter(t => t.status === 'pending').length },
    { name: 'In-Progress', value: items.filter(t => t.status === 'in-progress').length },
    { name: 'Completed', value: items.filter(t => t.status === 'completed').length },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="h-64 w-full border rounded p-4 bg-white dark:bg-zinc-900">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
