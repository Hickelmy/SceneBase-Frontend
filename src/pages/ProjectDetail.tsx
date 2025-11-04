import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import api from '../services/api';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await api.get(`/projects/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  const { data: scenes } = useQuery({
    queryKey: ['scenes', id],
    queryFn: async () => {
      const response = await api.get(`/projects/${id}/scenes`);
      return response.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="loading">Carregando...</div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="error">Projeto não encontrado</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="project-detail">
        <div className="project-header">
          <div>
            <h1>{project.name}</h1>
            <p className="project-meta-info">
              Diretor: {project.director?.name} • Status: {project.status} • Tipo: {project.type}
            </p>
          </div>
          <span className={`project-status-badge status-${project.status.toLowerCase()}`}>
            {project.status}
          </span>
        </div>

        {project.description && (
          <div className="project-description">
            <h2>Descrição</h2>
            <p>{project.description}</p>
          </div>
        )}

        <div className="project-tabs">
          <section className="tab-section">
            <h2>Cenas ({scenes?.length || 0})</h2>
            {scenes && scenes.length > 0 ? (
              <div className="scenes-list">
                {scenes.map((scene: any) => (
                  <div key={scene.id} className="scene-item">
                    <div>
                      <h3>{scene.name}</h3>
                      {scene.description && <p>{scene.description}</p>}
                    </div>
                    <span className="scene-stats">
                      {scene._count?.tasks || 0} tarefas
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">Nenhuma cena criada ainda.</p>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
