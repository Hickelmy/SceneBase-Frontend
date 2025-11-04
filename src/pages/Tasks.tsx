import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Task, TaskStatus } from '../types';
import './Tasks.css';

const Tasks = () => {
  const { user } = useAuth();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get<{ data: Task[] }>('/tasks');
      return response.data.data;
    },
  });

  const myTasks = tasks?.filter((t) => t.assignedToId === user?.id) || [];
  const openTasks = myTasks.filter((t) => t.status === TaskStatus.OPEN);
  const inProgressTasks = myTasks.filter((t) => t.status === TaskStatus.IN_PROGRESS);
  const reviewTasks = myTasks.filter((t) => t.status === TaskStatus.REVIEW);
  const doneTasks = myTasks.filter((t) => t.status === TaskStatus.DONE);

  if (isLoading) {
    return (
      <Layout>
        <div className="loading">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="tasks-page">
        <h1>Minhas Tarefas</h1>

        <div className="tasks-sections">
          {openTasks.length > 0 && (
            <section className="task-section">
              <h2>Abertas ({openTasks.length})</h2>
              <div className="tasks-list">
                {openTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}

          {inProgressTasks.length > 0 && (
            <section className="task-section">
              <h2>Em Progresso ({inProgressTasks.length})</h2>
              <div className="tasks-list">
                {inProgressTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}

          {reviewTasks.length > 0 && (
            <section className="task-section">
              <h2>Em Revisão ({reviewTasks.length})</h2>
              <div className="tasks-list">
                {reviewTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}

          {doneTasks.length > 0 && (
            <section className="task-section">
              <h2>Concluídas ({doneTasks.length})</h2>
              <div className="tasks-list">
                {doneTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}

          {myTasks.length === 0 && (
            <div className="empty-state">
              <p>Você não tem tarefas atribuídas.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.OPEN:
        return 'status-open';
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TaskStatus.REVIEW:
        return 'status-review';
      case TaskStatus.DONE:
        return 'status-done';
      case TaskStatus.REJECTED:
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.name}</h3>
        <span className={`task-status ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-meta">
        <span>Projeto: {task.scene?.project?.name || 'N/A'}</span>
        <span>Cena: {task.scene?.name || 'N/A'}</span>
        <span>Pontos: {task.points}</span>
      </div>
    </div>
  );
};

export default Tasks;
