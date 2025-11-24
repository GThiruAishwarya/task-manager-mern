import { useContext } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { AuthContext } from './context/AuthContext';


export default function App() {
const { user } = useContext(AuthContext);


if (!user) return <Login />;
return <Dashboard />;
}
