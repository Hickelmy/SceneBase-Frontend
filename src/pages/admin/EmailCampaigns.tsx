import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import api from '../../services/api';
import './Admin.css';

interface EmailCampaign {
  id: string;
  name: string;
  template: {
    id: string;
    name: string;
    subject: string;
  };
  filters: Record<string, any>;
  sent: boolean;
  sentAt?: string;
  scheduledAt?: string;
  createdAt: string;
}

const AdminEmailCampaigns = () => {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['admin', 'email-campaigns'],
    queryFn: async () => {
      const response = await api.get<{ data: EmailCampaign[] }>('/email-campaigns');
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
          <h1>Gerenciar Campanhas de E-mail</h1>
          <button className="btn-primary">+ Criar Campanha</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Template</th>
                <th>Filtros</th>
                <th>Status</th>
                <th>Agendado para</th>
                <th>Enviado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {campaigns && campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td>{campaign.name}</td>
                    <td>{campaign.template.name}</td>
                    <td>
                      {Object.keys(campaign.filters).length > 0
                        ? Object.entries(campaign.filters)
                            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                            .join('; ')
                        : '-'}
                    </td>
                    <td>
                      <span className={`status-badge ${campaign.sent ? 'sent' : 'pending'}`}>
                        {campaign.sent ? 'Enviado' : 'Pendente'}
                      </span>
                    </td>
                    <td>
                      {campaign.scheduledAt
                        ? new Date(campaign.scheduledAt).toLocaleDateString('pt-BR')
                        : '-'}
                    </td>
                    <td>
                      {campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td>
                      {!campaign.sent && (
                        <button className="btn-small">Enviar</button>
                      )}
                      <button className="btn-small">Editar</button>
                      <button className="btn-small danger">Excluir</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="empty-state">
                    Nenhuma campanha encontrada.
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

export default AdminEmailCampaigns;
