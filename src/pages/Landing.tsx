import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Landing.css';

const Landing = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  };

  // Mock data para projetos em destaque
  const featuredProjects = [
    {
      id: '1',
      title: 'Secretos Pesquisas',
      director: 'João Silva',
      description: 'Uma animação sobre descobertas científicas',
      thumbnail: '🎬',
    },
    {
      id: '2',
      title: 'Comunidade Furtivos',
      director: 'Maria Santos',
      description: 'Explorando mundos fantásticos',
      thumbnail: '🌟',
    },
    {
      id: '3',
      title: 'Diapastismo',
      director: 'Carlos Oliveira',
      description: 'Aventuras em um mundo paralelo',
      thumbnail: '🚀',
    },
    {
      id: '4',
      title: 'Projeto Futuro',
      director: 'Ana Costa',
      description: 'Tecnologia e humanidade',
      thumbnail: '⚡',
    },
  ];

  return (
    <div className="landing" data-theme={theme}>
      <header className="landing-header">
        <div className="container">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                <text x="20" y="26" fontSize="16" fontWeight="bold" textAnchor="middle" fill="currentColor" fontFamily="Arial, sans-serif">S</text>
              </svg>
            </div>
            <h1 className="logo-text">SceneBase</h1>
          </div>
          <nav className="header-nav">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '☀️' : '🌙'}
            </button>
            <Link to="/auth/login" className="nav-link">Entrar</Link>
            <span className="nav-separator">•</span>
            <Link to="/auth/register" className="btn-primary small">Criar conta</Link>
            <button className="info-icon" aria-label="Information">ℹ️</button>
          </nav>
        </div>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-background">
            <div className="hero-grid"></div>
            <div className="hero-particles"></div>
          </div>
          <div className="hero-content">
            <div className="container">
              <div className="hero-characters">
                <div className="character character-1">👨</div>
                <div className="character character-2">🤖</div>
                <div className="character character-3">👽</div>
              </div>
              <h1 className="hero-title">
                SceneBase: Sua comunidade global para criar animações
              </h1>
              <div className="hero-cta">
                <Link to="/auth/register" className="btn-secondary large">
                  Explore Projetos Públicos
                </Link>
                <Link to="/auth/register" className="btn-teal large">
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <div className="container">
            <h2 className="section-title">Como Funciona</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🎬</div>
                <h3>Diretores Criam</h3>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <h3>Artistas Colaborram</h3>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <h3>Todos Ganam Pontos</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="advantages">
          <div className="container">
            <h2 className="section-title left">Vantagens</h2>
            <div className="advantages-grid">
              <div className="advantage-card">
                <div className="advantage-image">💼</div>
                <h3>Construa seu Portfólio</h3>
              </div>
              <div className="advantage-card">
                <div className="advantage-image">💬</div>
                <h3>Comunidade Criativa</h3>
              </div>
              <div className="advantage-card">
                <div className="advantage-image">⭐</div>
                <h3>Gamificação & Recompensas</h3>
                <span className="badge">Em Produção</span>
              </div>
            </div>
          </div>
        </section>

        <section className="featured-projects">
          <div className="container">
            <h2 className="section-title left">Projetos em Destaque</h2>
            <div className="projects-scroll">
              {featuredProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-thumbnail">{project.thumbnail}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-director">{project.director}</p>
                  <p className="project-description">{project.description}</p>
                  <Link to="/auth/register" className="project-button">
                    Ver Projeto
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-social">
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
            <div className="footer-links">
              <Link to="/about">Sobre</Link>
              <Link to="/terms">Termos</Link>
              <Link to="/privacy">Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
