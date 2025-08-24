import Task from '../models/Task.js';

export const listTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort('-createdAt');
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updated = await Task.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Task not found' });
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const deleted = await Task.findOneAndDelete({ _id: id, user: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Task not found' });
  res.json({ ok: true });
};
