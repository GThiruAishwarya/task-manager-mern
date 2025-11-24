import { useState } from 'react';
import API from '../api/axios';


export default function Register() {
const [form, setForm] = useState({ username: '', email: '', password: '' });
const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = async (e) => {
e.preventDefault();
await API.post('/api/auth/register', form);
alert('Register Success!');
};


return (
<form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 max-w-sm mx-auto">
<input name="username" placeholder="Username" onChange={handleChange} />
<input name="email" placeholder="Email" onChange={handleChange} />
<input name="password" placeholder="Password" type="password" onChange={handleChange} />
<button type="submit">Register</button>
</form>
);
}
