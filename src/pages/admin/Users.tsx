import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { User } from '../../types';
import './Admin.css';

const AdminUsers = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const response = await api.get<{ data: User[] }>('/users');
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
        <h1>Gerenciar Usuários</h1>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Role</th>
                <th>Pontos</th>
                <th>Data de Criação</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="role-badge">{user.role}</span>
                    </td>
                    <td>{user.points || 0}</td>
                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="empty-state">
                    Nenhum usuário encontrado.
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

export default AdminUsers;
