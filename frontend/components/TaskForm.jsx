import { useState } from 'react';
import API from '../api/axios';


export default function TaskForm({ refresh }) {
const [task, setTask] = useState('');


const addTask = async (e) => {
e.preventDefault();
await API.post('/api/tasks', { title: task });
setTask('');
refresh();
};


return (
<form onSubmit={addTask} className="flex gap-2 p-2">
<input value={task} onChange={(e) => setTask(e.target.value)} placeholder="New Task" />
<button type="submit">Add</button>
</form>
);
}
