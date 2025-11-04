import { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isAdmin = user?.role === Role.ADMIN;
  const isDirector = user?.role === Role.DIRECTOR || isAdmin;

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-left">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <Link to="/app/dashboard" className="logo">
            SceneBase
          </Link>
        </div>
        <div className="header-right">
          <div className="user-menu">
            <span className="user-name">{user?.name}</span>
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="dropdown-menu">
              <Link to="/app/profile">Perfil</Link>
              {isAdmin && <Link to="/app/admin/users">Administração</Link>}
              <button onClick={handleLogout}>Sair</button>
            </div>
          </div>
        </div>
      </header>

      <div className="layout-container">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <Link to="/app/dashboard" onClick={() => setSidebarOpen(false)}>
              🏠 Dashboard
            </Link>
            <Link to="/app/projects" onClick={() => setSidebarOpen(false)}>
              📁 Projetos
            </Link>
            <Link to="/app/tasks" onClick={() => setSidebarOpen(false)}>
              ✅ Tarefas
            </Link>
            {isAdmin && (
              <>
                <div className="nav-divider">Administração</div>
                <Link to="/app/admin/users" onClick={() => setSidebarOpen(false)}>
                  👥 Usuários
                </Link>
                <Link to="/app/admin/banners" onClick={() => setSidebarOpen(false)}>
                  🎨 Banners
                </Link>
                <Link to="/app/admin/email-templates" onClick={() => setSidebarOpen(false)}>
                  📧 Templates de E-mail
                </Link>
                <Link to="/app/admin/email-campaigns" onClick={() => setSidebarOpen(false)}>
                  📮 Campanhas
                </Link>
              </>
            )}
          </nav>
        </aside>

        <main className="layout-main">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
