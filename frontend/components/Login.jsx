import { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';


export default function Login() {
const [form, setForm] = useState({ email: '', password: '' });
const { login } = useContext(AuthContext);


const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = async (e) => {
e.preventDefault();
const res = await API.post('/api/auth/login', form);
login(res.data);
};


return (
<form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 max-w-sm mx-auto">
<input name="email" placeholder="Email" onChange={handleChange} />
<input name="password" placeholder="Password" type="password" onChange={handleChange} />
<button type="submit">Login</button>
</form>
);
}
