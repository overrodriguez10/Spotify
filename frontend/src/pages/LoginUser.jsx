import React, { useState } from 'react';
import { useAuth } from '../context/Contexts';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        navigate('/'); // Redirect to home
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box glass-panel">
        <h2 className="login-title">Explora la Música</h2>
        <p className="login-subtitle">Inicia sesión como usuario para continuar.</p>
        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary">Ingresar</button>
        </form>
        <div className="login-footer">
          <span>¿Eres personal? <Link to="/adminlogin" className="admin-link">Entrar como Admin</Link></span>
        </div>
      </div>
    </div>
  );
}
