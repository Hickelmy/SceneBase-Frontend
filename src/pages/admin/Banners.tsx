import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import api from '../../services/api';
import './Admin.css';

interface Banner {
  id: string;
  title: string;
  content: string;
  type: string;
  routes: string[];
  roles: string[];
  active: boolean;
  startDate: string;
  endDate: string;
}

const AdminBanners = () => {
  const { data: banners, isLoading } = useQuery({
    queryKey: ['admin', 'banners'],
    queryFn: async () => {
      const response = await api.get<{ data: Banner[] }>('/banners');
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="loading">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="admin-page">
        <div className="admin-header">
          <h1>Gerenciar Banners</h1>
          <button className="btn-primary">+ Criar Banner</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Rotas</th>
                <th>Roles</th>
                <th>Período</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {banners && banners.length > 0 ? (
                banners.map((banner) => (
                  <tr key={banner.id}>
                    <td>{banner.title}</td>
                    <td>
                      <span className="type-badge">{banner.type}</span>
                    </td>
                    <td>{banner.routes.join(', ') || '-'}</td>
                    <td>{banner.roles.join(', ') || '-'}</td>
                    <td>
                      {new Date(banner.startDate).toLocaleDateString('pt-BR')} -{' '}
                      {new Date(banner.endDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td>
                      <span className={`status-badge ${banner.active ? 'active' : 'inactive'}`}>
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <button className="btn-small">Editar</button>
                      <button className="btn-small danger">Excluir</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="empty-state">
                    Nenhum banner encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminBanners;
