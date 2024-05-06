
import {  useState } from 'react';
import { Link } from 'react-router-dom';

export function Login(){

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [error, setError] = useState('');

      const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };

      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
      
        // Validar que se ingresen datos en los campos de email y contraseña
        if (!formData.email || !formData.password) {
          setError('Por favor, completa todos los campos.');
          return;
        }
      
        try {
          const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            throw new Error('Credenciales incorrectas');
          }
      
          const token = (await response.json())["accessToken"];
          window.localStorage.setItem("jwt", token);
        
          window.location.replace('/');
        } catch (error) {
          setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
      };
      

    return(  
        <div className='h-screen flex justify-center items-center bg-red-950'>
            <div className='flex flex-col items-center gap-5 bg-white p-5 rounded-lg'>
                <h2 className='text-red-900'>LOGIN</h2>
                {error && <p className='bg-red-600 text-white rounded-xl p-1'>{error}</p>}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center'>
                    <label htmlFor="email">Email</label>
                    <input className="border px-2 rounded-xl" type="email" id="email" name="email" required value={formData.email} onChange={handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input className="border px-2 rounded-xl" type="password" id="password" name="password" required value={formData.password} onChange={handleChange}/>
                    <Link to="/SignUp" className='text-blue-900 italic'>Register</Link>

                    <button className="bg-red-600 text-white px-2 py-1 rounded-xl" type="submit">Iniciar sesion</button>
                    </form>
            </div>
        </div>
      )
}