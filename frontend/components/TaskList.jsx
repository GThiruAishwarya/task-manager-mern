import { useEffect, useState } from 'react';
import API from '../api/axios';


export default function TaskList({ refreshKey }) {
const [tasks, setTasks] = useState([]);


useEffect(() => {
API.get('/api/tasks').then((res) => setTasks(res.data));
}, [refreshKey]);


return (
<ul className="p-4">
{tasks.map((t) => (
<li key={t._id} className="border p-2 my-2">{t.title}</li>
))}
</ul>
);
}
