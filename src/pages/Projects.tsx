import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Project, ProjectStatus, Role } from '../types';
import './Projects.css';

const Projects = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', statusFilter],
    queryFn: async () => {
      const params = statusFilter ? { status: statusFilter } : {};
      const response = await api.get<{ data: Project[] }>('/projects', { params });
      return response.data.data;
    },
  });

  const canCreateProject = user?.role === Role.DIRECTOR || user?.role === Role.ADMIN;

  return (
    <Layout>
      <div className="projects-page">
        <div className="page-header">
          <h1>Projetos</h1>
          {canCreateProject && (
            <Link to="/app/projects/new" className="btn-primary">
              + Criar Projeto
            </Link>
          )}
        </div>

        <div className="projects-filters">
          <button
            className={statusFilter === '' ? 'active' : ''}
            onClick={() => setStatusFilter('')}
          >
            Todos
          </button>
          <button
            className={statusFilter === ProjectStatus.DRAFT ? 'active' : ''}
            onClick={() => setStatusFilter(ProjectStatus.DRAFT)}
          >
            Rascunho
          </button>
          <button
            className={statusFilter === ProjectStatus.IN_PRODUCTION ? 'active' : ''}
            onClick={() => setStatusFilter(ProjectStatus.IN_PRODUCTION)}
          >
            Em Produção
          </button>
          <button
            className={statusFilter === ProjectStatus.COMPLETED ? 'active' : ''}
            onClick={() => setStatusFilter(ProjectStatus.COMPLETED)}
          >
            Concluído
          </button>
        </div>

        {isLoading ? (
          <div className="loading">Carregando...</div>
        ) : projects && projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <Link key={project.id} to={`/app/projects/${project.id}`} className="project-card">
                <h3>{project.name}</h3>
                <p className="project-description">
                  {project.description || 'Sem descrição'}
                </p>
                <div className="project-meta">
                  <span className="project-director">
                    Diretor: {project.director?.name || 'N/A'}
                  </span>
                  <span className={`project-status status-${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
                <div className="project-stats">
                  <span>📁 {project.scenesCount || 0} cenas</span>
                  <span>✅ {project.tasksCount || 0} tarefas</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Nenhum projeto encontrado.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
