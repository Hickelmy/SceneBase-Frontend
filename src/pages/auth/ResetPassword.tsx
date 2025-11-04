import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import './Auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Token de redefinição inválido');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    if (!token) {
      setError('Token inválido');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/reset-password', { token, password, confirmPassword });
      setMessage('Senha redefinida com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao redefinir senha. Verifique o token.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Token inválido</h1>
          <p className="auth-subtitle">O link de redefinição é inválido ou expirou.</p>
          <p className="auth-footer">
            <Link to="/auth/forgot-password">Solicitar novo link</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Redefinir Senha</h1>
        <p className="auth-subtitle">Digite sua nova senha</p>

        {error && <div className="error-message">{error}</div>}
        {message && <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          {message}
        </div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Nova Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
            <small>Mínimo de 8 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Redefinindo...' : 'Redefinir senha'}
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/auth/login">Voltar para o login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
