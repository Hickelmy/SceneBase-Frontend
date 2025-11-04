# SceneBase Frontend

Frontend React + TypeScript + Vite para a plataforma SceneBase.

## Tecnologias

- React 18
- TypeScript
- Vite
- React Router
- React Query (@tanstack/react-query)
- Axios

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3001`.

## Build para produção

```bash
npm run build
```

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── contexts/         # Contextos React (AuthContext)
│   ├── pages/            # Páginas da aplicação
│   ├── services/         # Serviços API
│   ├── types/            # Tipos TypeScript
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Entry point
├── public/               # Arquivos estáticos
└── index.html           # HTML principal
```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```
VITE_API_URL=http://localhost:3000/api
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter
