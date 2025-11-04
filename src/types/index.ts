export enum Role {
  USER = 'USER',
  ARTIST = 'ARTIST',
  DIRECTOR = 'DIRECTOR',
  ADMIN = 'ADMIN',
}

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  AUTO = 'AUTO',
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  IN_PRODUCTION = 'IN_PRODUCTION',
  COMPLETED = 'COMPLETED',
}

export enum ProjectType {
  SHORT_FILM = 'SHORT_FILM',
  SERIES = 'SERIES',
  CLIP = 'CLIP',
  FEATURE_FILM = 'FEATURE_FILM',
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
  REJECTED = 'REJECTED',
}

export enum TaskType {
  CONCEPT = 'CONCEPT',
  MODELING = 'MODELING',
  RIG = 'RIG',
  ANIMATION = 'ANIMATION',
  AUDIO = 'AUDIO',
  SFX = 'SFX',
  COMPOSITING = 'COMPOSITING',
  RENDERING = 'RENDERING',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  theme: Theme;
  points: number;
  createdAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  type: ProjectType;
  isPublic: boolean;
  directorId: string;
  director?: {
    id: string;
    name: string;
    email?: string;
  };
  scenesCount?: number;
  tasksCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Scene {
  id: string;
  name: string;
  description?: string;
  order: number;
  projectId: string;
  _count?: {
    tasks: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  points: number;
  sceneId: string;
  assignedToId?: string;
  delivery?: any;
  scene?: {
    id: string;
    name: string;
    project?: {
      id: string;
      name: string;
    };
  };
  assignedTo?: {
    id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
