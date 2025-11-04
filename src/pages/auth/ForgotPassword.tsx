import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      setMessage('Se o e-mail existir, enviaremos instruções para redefinir sua senha.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao enviar e-mail. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Esqueceu sua senha?</h1>
        <p className="auth-subtitle">Digite seu e-mail para receber instruções</p>

        {error && <div className="error-message">{error}</div>}
        {message && <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          {message}
        </div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar instruções'}
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/auth/login">Voltar para o login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
