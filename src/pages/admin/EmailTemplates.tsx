import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import api from '../../services/api';
import './Admin.css';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables?: string[];
  createdAt: string;
}

const AdminEmailTemplates = () => {
  const { data: templates, isLoading } = useQuery({
    queryKey: ['admin', 'email-templates'],
    queryFn: async () => {
      const response = await api.get<{ data: EmailTemplate[] }>('/email-templates');
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
          <h1>Gerenciar Templates de E-mail</h1>
          <button className="btn-primary">+ Criar Template</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Assunto</th>
                <th>Variáveis</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {templates && templates.length > 0 ? (
                templates.map((template) => (
                  <tr key={template.id}>
                    <td>{template.name}</td>
                    <td>{template.subject}</td>
                    <td>{template.variables?.join(', ') || '-'}</td>
                    <td>{new Date(template.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <button className="btn-small">Editar</button>
                      <button className="btn-small danger">Excluir</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="empty-state">
                    Nenhum template encontrado.
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

export default AdminEmailTemplates;
