import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: points } = useQuery({
    queryKey: ['points', user?.id],
    queryFn: async () => {
      const response = await api.get<{ data: { total: number } }>('/users/me/points');
      return response.data.data;
    },
    enabled: !!user,
  });

  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      const response = await api.patch('/users/me', data);
      return response.data.data;
    },
    onSuccess: () => {
      refreshUser();
      queryClient.invalidateQueries({ queryKey: ['points'] });
      setMessage('Perfil atualizado com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Erro ao atualizar perfil');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      const response = await api.post('/users/me/change-password', data);
      return response.data;
    },
    onSuccess: () => {
      setMessage('Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage(''), 3000);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Erro ao alterar senha');
    },
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    updateProfileMutation.mutate({ name });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <Layout>
      <div className="profile-page">
        <h1>Meu Perfil</h1>

        {(message || error) && (
          <div className={`alert ${error ? 'error' : 'success'}`}>
            {error || message}
          </div>
        )}

        <div className="profile-sections">
          <section className="profile-section">
            <h2>Informações Pessoais</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>E-mail</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-item">
                <label>Role</label>
                <p>{user?.role}</p>
              </div>
              <div className="info-item">
                <label>Pontos Totais</label>
                <p className="points-value">{points?.total || 0}</p>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </form>
          </section>

          <section className="profile-section">
            <h2>Alterar Senha</h2>
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label htmlFor="currentPassword">Senha Atual</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nova Senha</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <small>Mínimo de 8 caracteres</small>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <button type="submit" className="btn-primary" disabled={changePasswordMutation.isPending}>
                {changePasswordMutation.isPending ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
