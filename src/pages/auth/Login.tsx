import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import loginImage from '../../assets/login_image.png';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="auth-page" 
      data-theme={theme}
      style={{ backgroundImage: `linear-gradient(135deg, rgba(240, 249, 255, 0.3) 0%, rgba(224, 242, 254, 0.4) 50%, rgba(248, 250, 252, 0.3) 100%), url(${loginImage})` }}
    >
      {/* Header */}
      <header className="auth-header">
        <div className="auth-header-container">
          <Link to="/" className="auth-logo-container">
            <div className="auth-logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                <text x="20" y="26" fontSize="16" fontWeight="bold" textAnchor="middle" fill="currentColor" fontFamily="Arial, sans-serif">S</text>
              </svg>
            </div>
            <h1 className="auth-logo-text">SceneBase</h1>
          </Link>
          <nav className="auth-header-nav">
            <button className="auth-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '☀️' : '🌙'}
            </button>
            <Link to="/auth/login" className="auth-nav-link active">Entrar</Link>
            <Link to="/auth/register" className="auth-nav-button">Saiba Mais</Link>
            <button className="auth-info-icon" aria-label="Information">ℹ️</button>
          </nav>
        </div>
      </header>

      {/* Background with 3D elements and particles */}
      <div className="auth-background">
        <div className="auth-characters">
          <div className="auth-character auth-character-1">👔</div>
          <div className="auth-character auth-character-2">👩</div>
          <div className="auth-character auth-character-3">👨</div>
          <div className="auth-character auth-character-4">👶</div>
        </div>
        <div className="auth-particles"></div>
        <div className="auth-lines"></div>
        <div className="auth-shapes">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
          <div className="auth-shape auth-shape-3"></div>
        </div>
        <div className="auth-cards">
          <div className="auth-card-bg">169 pers</div>
          <div className="auth-card-bg">107</div>
        </div>
      </div>

      {/* Modal */}
      <div className="auth-container">
        <div className="auth-modal">
          <h1 className="auth-title">Entrar na sua conta</h1>

          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="auth-input"
              />
            </div>

            <div className="auth-form-group">
              <input
                type="password"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="auth-input"
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
              <span className="auth-btn-icon">▶</span>
            </button>

            <Link to="/auth/forgot-password" className="auth-forgot-link">
              Esqueci minha senha
            </Link>

            <p className="auth-switch-link">
              Não tem uma conta? <Link to="/auth/register">Crie uma</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
