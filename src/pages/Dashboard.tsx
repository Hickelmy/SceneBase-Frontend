import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Project, Task } from '../types';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get<{ data: Project[] }>('/projects');
      return response.data.data;
    },
  });

  const { data: tasks } = useQuery({
    queryKey: ['tasks', 'my-tasks'],
    queryFn: async () => {
      const response = await api.get<{ data: Task[] }>('/tasks');
      return response.data.data;
    },
  });

  const { data: points } = useQuery({
    queryKey: ['points', user?.id],
    queryFn: async () => {
      const response = await api.get<{ data: { total: number } }>('/users/me/points');
      return response.data.data;
    },
    enabled: !!user,
  });

  const openTasks = tasks?.filter((t) => t.status === 'OPEN' && t.assignedToId === user?.id) || [];
  const inProgressTasks = tasks?.filter((t) => t.status === 'IN_PROGRESS' && t.assignedToId === user?.id) || [];
  const reviewTasks = tasks?.filter((t) => t.status === 'REVIEW' && t.assignedToId === user?.id) || [];

  return (
    <Layout>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Bem-vindo, {user?.name}!</p>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>Pontos</h3>
              <p className="stat-value">{points?.total || 0}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-content">
              <h3>Projetos</h3>
              <p className="stat-value">{projects?.length || 0}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Tarefas Abertas</h3>
              <p className="stat-value">{openTasks.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <h3>Em Progresso</h3>
              <p className="stat-value">{inProgressTasks.length}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Minhas Tarefas</h2>
              <Link to="/app/tasks" className="section-link">
                Ver todas
              </Link>
            </div>

            <div className="tasks-list">
              {reviewTasks.length > 0 && (
                <div className="task-group">
                  <h3>Em Revisão</h3>
                  {reviewTasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="task-item">
                      <Link to={`/app/projects/${task.scene?.project?.id}`}>
                        {task.name} - {task.scene?.project?.name}
                      </Link>
                      <span className="task-status review">Em Revisão</span>
                    </div>
                  ))}
                </div>
              )}

              {inProgressTasks.length > 0 && (
                <div className="task-group">
                  <h3>Em Progresso</h3>
                  {inProgressTasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="task-item">
                      <Link to={`/app/projects/${task.scene?.project?.id}`}>
                        {task.name} - {task.scene?.project?.name}
                      </Link>
                      <span className="task-status in-progress">Em Progresso</span>
                    </div>
                  ))}
                </div>
              )}

              {openTasks.length > 0 && (
                <div className="task-group">
                  <h3>Abertas</h3>
                  {openTasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="task-item">
                      <Link to={`/app/projects/${task.scene?.project?.id}`}>
                        {task.name} - {task.scene?.project?.name}
                      </Link>
                      <span className="task-status open">Aberta</span>
                    </div>
                  ))}
                </div>
              )}

              {openTasks.length === 0 && inProgressTasks.length === 0 && reviewTasks.length === 0 && (
                <p className="empty-state">Você não tem tarefas no momento.</p>
              )}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Projetos Recentes</h2>
              <Link to="/app/projects" className="section-link">
                Ver todos
              </Link>
            </div>

            <div className="projects-list">
              {projects && projects.length > 0 ? (
                projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="project-item">
                    <Link to={`/app/projects/${project.id}`}>
                      <h3>{project.name}</h3>
                      <p>{project.description || 'Sem descrição'}</p>
                      <span className="project-status">{project.status}</span>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="empty-state">Nenhum projeto encontrado.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
