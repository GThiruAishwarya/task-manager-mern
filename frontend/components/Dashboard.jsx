import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';


export default function Dashboard() {
const [refresh, setRefresh] = useState(0);


return (
<div className="p-4">
<h2 className="text-xl font-bold">Dashboard</h2>
<TaskForm refresh={() => setRefresh(refresh + 1)} />
<TaskList refreshKey={refresh} />
</div>
);
}
