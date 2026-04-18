import React, { useState } from 'react';
import { useAuth } from '../context/Contexts';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.user.role === 'admin') {
          login(data.user, data.token);
          navigate('/admin');
        } else {
          alert('No tienes permisos de administrador.');
        }
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper admin-bg">
      <div className="login-box glass-panel admin-panel-box">
        <div style={{ textAlign: 'center', marginBottom: '16px', color: '#1DB954' }}>
          <ShieldCheck size={48} />
        </div>
        <h2 className="login-title">Acceso de Administración</h2>
        <p className="login-subtitle">Solo personal autorizado.</p>
        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email administrativo" 
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
          <button type="submit" className="btn-primary admin-btn">Validar Credenciales</button>
        </form>
        <div className="login-footer">
          <Link to="/login" className="back-link">← Volver al área pública</Link>
        </div>
      </div>
    </div>
  );
}
